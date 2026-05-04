import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-[720px] px-4 sm:px-6 py-12 sm:py-16">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
          >
            ← All posts
          </Link>

          <header className="mb-8">
            <p className="text-sm text-muted-foreground mb-3">{formatted}</p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-3 text-lg text-muted-foreground">
                {post.description}
              </p>
            )}
          </header>

          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
