export type NewsletterEmailProps = {
  slug: string
  title: string
  description: string
  date: string
  excerpt: string         // first ~300 chars of post body, plain text
  unsubscribeUrl: string
  postUrl: string
}

export function renderNewsletterEmail(p: NewsletterEmailProps): string {
  const formattedDate = new Date(p.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escHtml(p.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAFAFA;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAFAFA;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;border:1px solid #E2E8F0;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:28px 40px 24px;border-bottom:1px solid #E2E8F0;">
              <a href="https://oschoices.com" style="text-decoration:none;">
                <span style="font-size:26px;font-weight:800;letter-spacing:-0.5px;">
                  <span style="color:#2563EB;">OS</span><span style="color:#0F172A;">Choices</span>
                </span>
              </a>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:40px 40px 0;">
              <p style="margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#2563EB;font-weight:600;">
                New Post
              </p>
              <h1 style="margin:0 0 14px;font-size:28px;font-weight:700;color:#0F172A;line-height:1.25;font-family:Georgia,'Times New Roman',serif;">
                ${escHtml(p.title)}
              </h1>
              <p style="margin:0 0 10px;font-size:16px;color:#475569;line-height:1.5;">
                ${escHtml(p.description)}
              </p>
              <p style="margin:0;font-size:13px;color:#94A3B8;">
                ${formattedDate}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:24px 40px 0;">
              <hr style="border:none;border-top:1px solid #E2E8F0;margin:0;" />
            </td>
          </tr>

          <!-- Excerpt -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;">
                ${escHtml(p.excerpt)}${p.excerpt.length >= 280 ? "…" : ""}
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 40px 40px;">
              <a href="${p.postUrl}"
                 style="display:inline-block;background-color:#2563EB;color:#FFFFFF;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:600;">
                Read full post →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background-color:#F8FAFC;border-top:1px solid #E2E8F0;">
              <p style="margin:0 0 6px;font-size:12px;color:#94A3B8;text-align:center;line-height:1.6;">
                You're receiving this because you subscribed at
                <a href="https://oschoices.com" style="color:#64748B;">oschoices.com</a>.
              </p>
              <p style="margin:0 0 6px;font-size:12px;color:#94A3B8;text-align:center;">
                <a href="${p.unsubscribeUrl}" style="color:#94A3B8;text-decoration:underline;">Unsubscribe</a>
              </p>
              <p style="margin:0;font-size:12px;color:#CBD5E1;text-align:center;">
                Made by OSChoices &copy; ${new Date().getFullYear()}
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>`
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
