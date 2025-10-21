// src/services/sendGridMail.ts
import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY || !process.env.SEND_GRID_SENDER) {
  throw new Error("Missing SENDGRID_API_KEY or SEND_GRID_SENDER in env");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendGridMail = async (opts: {
  to: string;
  subject: string;
  html?: string;
  text?: string; // Optional plain text version for better reusability
}) => {
  const { to, subject, html, text } = opts;
  const from = process.env.SEND_GRID_SENDER!;

  if (!html && !text) {
    throw new Error("Email content is required. Provide either 'html' or 'text'.");
  }

  const msg: any = { to, from, subject };
  if (html) msg.html = html;
  if (text) msg.text = text;

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (err) {
    console.error("❌ SendGrid Error:", err);
    throw err;
  }
};