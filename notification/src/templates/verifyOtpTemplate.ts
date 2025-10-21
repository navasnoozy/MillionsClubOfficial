// src/templates/verifyOtpTemplate.ts
export const verifyOtpTemplate = (opts: {
  name?: string;
  otp: number;
  expiryMinutes?: number;
}) => {
  const name = opts.name ?? "User";
  const otp = opts.otp;
  const expiry = opts.expiryMinutes ?? 10;

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Email Verification OTP</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin:0; padding:0; background:#f8fafc; color:#111; }
          .container { max-width:480px; margin:30px auto; background:#ffffff; border-radius:12px; box-shadow:0 4px 20px rgba(15,23,42,0.1); overflow:hidden; }
          .header { background:linear-gradient(90deg,#0ea5e9,#6366f1); padding:24px; color:white; text-align:center; font-size:20px; font-weight:600; }
          .content { padding:24px; text-align:center; }
          h1 { font-size:18px; color:#111827; margin-bottom:8px; }
          p { font-size:15px; color:#374151; margin:8px 0; }
          .otp-box { display:inline-block; margin:20px 0; padding:14px 24px; border-radius:10px; background:#f1f5f9; font-size:28px; letter-spacing:8px; font-weight:700; color:#0f172a; border:2px solid #e2e8f0; }
          .footer { background:#f9fafb; padding:16px; text-align:center; font-size:13px; color:#94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Millions Club</div>
          <div class="content">
            <h1>Email Verification Code</h1>
            <p>Hi ${escapeHtml(name)},</p>
            <p>Use the following verification code to complete your sign-up:</p>
            <div class="otp-box">${otp}</div>
            <p>This code will expire in <strong>${expiry} minutes</strong>.</p>
            <p>If you didn’t request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Millions Club. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}