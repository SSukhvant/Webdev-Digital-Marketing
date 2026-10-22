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
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return jsonError("Request is too large.", 413);

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = (forwardedFor ? forwardedFor.split(",")[0] : request.headers.get("x-real-ip") || "unknown").trim();
  if (isRateLimited(ip)) return jsonError("Too many requests. Please try again later.", 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON request body.", 400);
  }

  const data = validatePayload(body);
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
