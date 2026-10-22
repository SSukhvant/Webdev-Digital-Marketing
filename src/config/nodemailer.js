import nodemailer from "nodemailer";

const email = process.env.EMAIL?.trim();
const pass = process.env.EMAIL_PASS;
const host = process.env.SMTP_HOST || "mail.metabrs.com";
const port = Number(process.env.SMTP_PORT || 465);
const recipient = process.env.CONTACT_RECIPIENT;

if (!email || !pass || !recipient) {
  console.warn("Contact email is not configured: set EMAIL, EMAIL_PASS and CONTACT_RECIPIENT.");
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user: email, pass },
});

export const mailOptions = {
  from: email,
  to: recipient,
};
