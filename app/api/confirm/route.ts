import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oschoices.com";

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/?error=missing_token`);
  }

  const supabaseAdmin = getSupabaseAdmin();
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data: subscriber, error: fetchError } = await supabaseAdmin
    .from("subscribers")
    .select("id, email, confirmed")
    .eq("confirm_token", token)
    .single();

  if (fetchError || !subscriber) {
    return NextResponse.redirect(`${siteUrl}/?error=invalid_token`);
  }

  if (!subscriber.confirmed) {
    const { error: updateError } = await supabaseAdmin
      .from("subscribers")
      .update({ confirmed: true })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.redirect(`${siteUrl}/?error=confirm_failed`);
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: subscriber.email,
      subject: "Welcome to OSChoices 🎉",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
          <h2 style="font-family:sans-serif;font-size:24px;font-weight:700;color:#0F172A;margin-bottom:8px;">
            You're in!
          </h2>
          <p style="color:#64748B;margin-bottom:24px;">
            Thanks for subscribing to OSChoices. You'll hear from us when new tools
            launch — and only then. In the meantime, check out what we're building.
          </p>
          <a href="${siteUrl}/apps"
             style="display:inline-block;background:#2563EB;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
            Browse apps →
          </a>
          <p style="color:#94A3B8;font-size:12px;margin-top:24px;">
            OSChoices · Smart tools for smarter choices.
          </p>
        </div>
      `,
    });
  }

  return NextResponse.redirect(`${siteUrl}/newsletter/confirmed`);
}
