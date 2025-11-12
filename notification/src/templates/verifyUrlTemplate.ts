// src/templates/verifyUrlTemplate.ts
interface VerifyUrlHtml {
  name?: string;
  verifyUrl: string;
}

export const verifyUrlTemplate = (opts: VerifyUrlHtml) => {
  const name = opts.name ?? "User";
  const verifyUrl = opts.verifyUrl;

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Email Verification Link</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin:0; padding:0; background:#f8fafc; color:#111; }
          .container { max-width:480px; margin:30px auto; background:#ffffff; border-radius:12px; box-shadow:0 4px 20px rgba(15,23,42,0.1); overflow:hidden; }
          .header { background:linear-gradient(90deg,#0ea5e9,#6366f1); padding:24px; color:white; text-align:center; font-size:20px; font-weight:600; }
          .content { padding:24px; text-align:center; }
          h1 { font-size:18px; color:#111827; margin-bottom:8px; }
          p { font-size:15px; color:#374151; margin:8px 0; }
          .btn { display:inline-block; margin:20px 0; padding:14px 28px; border-radius:10px; background:#3b82f6; color:#ffffff !important; font-size:16px; font-weight:600; text-decoration:none; transition:background 0.3s ease; }
          .btn:hover { background:#2563eb; }
          .footer { background:#f9fafb; padding:16px; text-align:center; font-size:13px; color:#94a3b8; }
          .small { font-size:13px; color:#6b7280; margin-top:12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Millions Club</div>
          <div class="content">
            <h1>Verify Your Email Address</h1>
            <p>Hi ${escapeHtml(name)},</p>
            <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
            <a href="${escapeHtml(verifyUrl)}" class="btn" target="_blank" rel="noopener noreferrer">Verify Email</a>
            <p class="small">If you didn’t request this, you can safely ignore this email.</p>
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
