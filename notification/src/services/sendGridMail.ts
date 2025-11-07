// notification/src/services/sendGridMail.ts
import sgMail from "@sendgrid/mail";

// Validate environment variables at startup
if (!process.env.SENDGRID_API_KEY || !process.env.SEND_GRID_SENDER) {
  throw new Error("Missing SENDGRID_API_KEY or SEND_GRID_SENDER in env");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

interface SendGridMail {
  (options: EmailOptions): Promise<{ success: boolean }>;
}

export const sendGridMail: SendGridMail = async (options) => {
  const { to, subject, html, text } = options;
  const from = process.env.SEND_GRID_SENDER!;

  // Validate inputs
  if (!html && !text) {
    throw new Error("Email content is required. Provide either 'html' or 'text'.");
  }

  if (!to || !subject) {
    throw new Error("Email 'to' and 'subject' are required.");
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    throw new Error(`Invalid email address: ${to}`);
  }

  const msg: any = { to, from, subject };
  if (html) msg.html = html;
  if (text) msg.text = text;

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
    return { success: true };
  } catch (err) {
    console.error("SendGrid Error:", {
      to,
      subject,
      statusCode: (err as any).code || "unknown",
      message: (err as any).message || "Unknown error",
    });
    throw new Error("Failed to send email via SendGrid");
  }
};
