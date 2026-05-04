import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on building indie tools, product decisions, and the OSChoices journey.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-[1200px] px-4 sm:px-6 py-12 sm:py-16 w-full">
        <div className="mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Blog
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Building in public — product updates, decisions, and lessons.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
