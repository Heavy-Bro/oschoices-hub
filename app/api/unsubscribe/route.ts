import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(unsubscribePage("Invalid unsubscribe link."), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const supabase = getSupabaseAdmin();

  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("id")
    .eq("confirm_token", token)
    .single();

  if (!subscriber) {
    return new NextResponse(
      unsubscribePage("This unsubscribe link is invalid or has already been used."),
      { status: 404, headers: { "Content-Type": "text/html" } }
    );
  }

  await supabase.from("subscribers").delete().eq("id", subscriber.id);

  return new NextResponse(
    unsubscribePage("You've been unsubscribed. Sorry to see you go!"),
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

function unsubscribePage(message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribe — OSChoices</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #FAFAFA; color: #0F172A;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; padding: 24px; }
    .card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px;
            padding: 40px 48px; max-width: 440px; text-align: center; }
    h1 { font-size: 1.25rem; font-weight: 700; margin: 0 0 12px; }
    p  { color: #64748B; font-size: 0.95rem; margin: 0 0 24px; line-height: 1.6; }
    a  { color: #2563EB; text-decoration: none; font-size: 0.9rem; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>OSChoices</h1>
    <p>${message}</p>
    <a href="https://oschoices.com">← Back to OSChoices</a>
  </div>
</body>
</html>`;
}
