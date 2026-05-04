import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const source = body.source ?? "hub";
  const confirmToken = crypto.randomUUID();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oschoices.com";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabaseAdmin = getSupabaseAdmin();
  const { error: dbError } = await supabaseAdmin
    .from("subscribers")
    .upsert(
      { email, confirmed: false, confirm_token: confirmToken, source },
      { onConflict: "email", ignoreDuplicates: false }
    );

  if (dbError) {
    console.error("Supabase upsert error:", dbError);
    return NextResponse.json({ error: "Failed to save subscription. Please try again." }, { status: 500 });
  }

  const confirmUrl = `${siteUrl}/api/confirm?token=${confirmToken}`;

  const { error: emailError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
    to: email,
    subject: "Confirm your OSChoices subscription",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
        <h2 style="font-family:sans-serif;font-size:24px;font-weight:700;color:#0F172A;margin-bottom:8px;">
          Almost there!
        </h2>
        <p style="color:#64748B;margin-bottom:24px;">
          Click the button below to confirm your email and join the OSChoices newsletter.
          You'll hear from us when new tools drop — and only then.
        </p>
        <a href="${confirmUrl}"
           style="display:inline-block;background:#2563EB;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
          Confirm subscription
        </a>
        <p style="color:#94A3B8;font-size:12px;margin-top:24px;">
          If you didn't sign up for OSChoices, ignore this email.
        </p>
      </div>
    `,
  });

  if (emailError) {
    console.error("Resend error:", emailError);
    return NextResponse.json({ error: "Failed to send confirmation email. Please try again." }, { status: 500 });
  }

  return NextResponse.json({
    message: "Check your inbox to confirm your subscription.",
  });
}
