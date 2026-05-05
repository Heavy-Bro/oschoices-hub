import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getPostBySlug } from "@/lib/blog";
import { renderNewsletterEmail } from "@/lib/email-templates/newsletter";

export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "ADMIN_SECRET not configured." }, { status: 500 });
  }

  // Accept auth via header (curl/scripts) or httpOnly cookie (browser UI)
  const headerSecret = req.headers.get("x-admin-secret");
  const cookieStore = await cookies();
  const cookieSession = cookieStore.get("admin_session")?.value;

  if (headerSecret !== secret && cookieSession !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { slug?: string; subject?: string; preview_text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { slug, subject, preview_text } = body;
  if (!slug) {
    return NextResponse.json({ error: "slug is required." }, { status: 400 });
  }

  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: `Post "${slug}" not found.` }, { status: 404 });
  }

  // Strip MDX/markdown to a plain-text excerpt (~300 chars)
  const excerpt = post.content
    .replace(/^---[\s\S]*?---/, "")       // remove frontmatter
    .replace(/#{1,6}\s+/g, "")            // remove headings
    .replace(/\*\*(.+?)\*\*/g, "$1")      // bold
    .replace(/\*(.+?)\*/g, "$1")          // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, "")   // inline code / code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
    .replace(/!\[.*?\]\(.*?\)/g, "")      // images
    .replace(/>\s+/g, "")                 // blockquotes
    .replace(/\n{2,}/g, " ")             // collapse newlines
    .replace(/\s+/g, " ")                // collapse whitespace
    .trim()
    .slice(0, 280);

  const supabase = getSupabaseAdmin();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oschoices.com";

  // Fetch all confirmed subscribers
  const { data: subscribers, error: fetchError } = await supabase
    .from("subscribers")
    .select("email, confirm_token")
    .eq("confirmed", true);

  if (fetchError) {
    return NextResponse.json({ error: "Failed to fetch subscribers." }, { status: 500 });
  }

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ sent: 0, failed: 0, errors: [], message: "No confirmed subscribers." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const emailSubject = subject?.trim() || post.title;
  const postUrl = `${siteUrl}/blog/${slug}`;

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];
  const startTime = Date.now();

  // Batch send — 100 per batch with 1-second delay between batches
  const BATCH_SIZE = 100;
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);

    const emails = batch.map((subscriber) => ({
      from,
      to: subscriber.email,
      subject: emailSubject,
      ...(preview_text ? { text: preview_text } : {}),
      html: renderNewsletterEmail({
        slug,
        title: post.title,
        description: post.description,
        date: post.date,
        excerpt,
        postUrl,
        unsubscribeUrl: `${siteUrl}/api/unsubscribe?token=${subscriber.confirm_token}`,
      }),
    }));

    try {
      const { data, error } = await resend.batch.send(emails);
      if (error) {
        failed += batch.length;
        errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${JSON.stringify(error)}`);
      } else {
        sent += data?.data?.length ?? batch.length;
      }
    } catch (err) {
      failed += batch.length;
      errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${String(err)}`);
    }

    // Rate limit delay between batches (skip after the last batch)
    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Log to newsletter_sends
  await supabase.from("newsletter_sends").insert({
    slug,
    recipient_count: sent,
    failure_count: failed,
    triggered_by: "admin",
  });

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Newsletter sent: ${sent} ok, ${failed} failed, ${duration}s`);

  return NextResponse.json({ sent, failed, errors });
}
