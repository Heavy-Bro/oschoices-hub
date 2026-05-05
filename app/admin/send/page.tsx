import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { getSupabaseAdmin } from "@/lib/supabase";
import SendNewsletterForm from "@/components/admin/SendNewsletterForm";

export const metadata = { title: "Send Newsletter", robots: { index: false } };

export default async function AdminSendPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!process.env.ADMIN_SECRET || session !== process.env.ADMIN_SECRET) {
    redirect("/admin");
  }

  const posts = getAllPosts();

  const { count } = await getSupabaseAdmin()
    .from("subscribers")
    .select("id", { count: "exact", head: true })
    .eq("confirmed", true);

  const subscriberCount = count ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <a href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← oschoices.com
          </a>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">Send Newsletter</h1>
          <p className="text-sm text-slate-500 mt-1">
            Broadcast a blog post to all confirmed subscribers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">
              No blog posts found in content/blog/. Publish one first.
            </p>
          ) : (
            <SendNewsletterForm posts={posts} subscriberCount={subscriberCount} />
          )}
        </div>
      </div>
    </main>
  );
}
