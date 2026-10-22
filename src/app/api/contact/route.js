import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CONTACT_FIELDS = {
  name: "Name",
  email: "Email",
  number: "Phone",
  service: "Service",
  message: "Message",
};
const ALLOWED_SERVICES = new Set(["website", "seo", "smo", "campaign", "other"]);
const MAX_BODY_BYTES = 12_000;
const MAX_LENGTHS = { name: 100, email: 254, number: 30, service: 30, message: 5_000 };

// Best-effort process-local protection. Use a shared store (e.g. Redis/Upstash)
// for deployments with multiple serverless instances.
const requestsByIp = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;

function jsonError(message, status) {
  return NextResponse.json({ message }, { status });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

function isRateLimited(ip, now = Date.now()) {
  const timestamps = (requestsByIp.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) {
    requestsByIp.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestsByIp.set(ip, timestamps);
  if (requestsByIp.size > 2_000) {
    for (const [key, values] of requestsByIp) {
      if (!values.some((time) => now - time < RATE_WINDOW_MS)) requestsByIp.delete(key);
    }
  }
  return false;
}

async function readJsonBodyLimited(request) {
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader !== null) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isFinite(contentLength) || contentLength < 0) {
      return { error: "Invalid Content-Length header.", status: 400 };
    }
    if (contentLength > MAX_BODY_BYTES) {
      return { error: "Request is too large.", status: 413 };
    }
  }

  if (!request.body) return { error: "Invalid JSON request body.", status: 400 };

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return { error: "Request is too large.", status: 413 };
      }
      chunks.push(value);
    }
  } catch {
    return { error: "Unable to read request body.", status: 400 };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { body: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) };
  } catch {
    return { error: "Invalid JSON request body.", status: 400 };
  }
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const normalized = {};
  for (const [field, maxLength] of Object.entries(MAX_LENGTHS)) {
    if (typeof payload[field] !== "string") return null;
    const value = payload[field].trim();
    if (!value || value.length > maxLength) return null;
    normalized[field] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) return null;
  if (!/^[+()\d .-]{7,30}$/.test(normalized.number)) return null;
  if (!ALLOWED_SERVICES.has(normalized.service)) return null;
  return normalized;
}

function generateEmailContent(data) {
  const text = Object.entries(CONTACT_FIELDS)
    .map(([field, label]) => `${label}:\n${data[field]}`)
    .join("\n\n");
  const html = Object.entries(CONTACT_FIELDS)
    .map(([field, label]) => `<h3>${escapeHtml(label)}</h3><p style="white-space:pre-wrap">${escapeHtml(data[field])}</p>`)
    .join("");
  return {
    text,
    html: `<!doctype html><html><body><h2>New website enquiry</h2>${html}</body></html>`,
  };
}

export async function POST(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = (forwardedFor ? forwardedFor.split(",")[0] : request.headers.get("x-real-ip") || "unknown").trim();
  if (isRateLimited(ip)) return jsonError("Too many requests. Please try again later.", 429);

  const parsed = await readJsonBodyLimited(request);
  if (parsed.error) return jsonError(parsed.error, parsed.status);

  const data = validatePayload(parsed.body);
  if (!data) return jsonError("Please provide valid contact details and all required fields.", 400);

  try {
    const content = generateEmailContent(data);
    await transporter.sendMail({
      ...mailOptions,
      ...content,
      replyTo: data.email,
      subject: `Website enquiry: ${data.name}`,
    });
    return NextResponse.json({ success: true, message: "Your message has been sent." });
  } catch (error) {
    console.error("Contact email delivery failed", { name: error?.name, code: error?.code });
    return jsonError("We could not send your message right now. Please try again later.", 502);
  }
}
