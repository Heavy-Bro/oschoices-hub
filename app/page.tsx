import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppCard from "@/components/AppCard";
import BlogCard from "@/components/BlogCard";
import NewsletterForm from "@/components/NewsletterForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apps } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const featuredApps = apps.filter((a) => a.status === "live").slice(0, 3);
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-24 lg:py-32 text-center">
          <p className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
            OSChoices Portfolio
          </p>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold text-slate-900 mt-4 leading-tight">
            Smart tools for smarter choices.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            A growing portfolio of free, focused indie tools — built to make
            everyday decisions a little easier.
          </p>
          <div className="mt-10 flex gap-4 justify-center items-center flex-wrap">
            <Link
              href="/apps"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Explore Tools
            </Link>
            <Link
              href="/blog"
              className="text-slate-700 hover:text-slate-900 underline underline-offset-4 transition-colors"
            >
              Read the blog →
            </Link>
          </div>
        </section>

        {/* What is OSChoices? */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-900">
            What is OSChoices?
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            OSChoices is a hub-and-spoke portfolio of small, well-made indie
            tools. Each one solves a single problem cleanly — no accounts, no
            paywalls, no bloat. Built in public, kept free.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            New tools launch regularly across utility, finance, productivity,
            and creator categories. Subscribe below and you&apos;ll be the
            first to know.
          </p>
        </section>

        {/* Featured Apps */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Featured Apps
            </h2>
            {featuredApps.length > 0 && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/apps">View all →</Link>
              </Button>
            )}
          </div>

          {featuredApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-secondary p-12 text-center">
              <p className="text-2xl mb-3">🚀</p>
              <p className="font-heading text-lg font-semibold text-foreground">
                First app launching soon
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Subscribe below to be notified when it drops.
              </p>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section
          id="newsletter"
          className="bg-primary text-primary-foreground"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                Stay in the loop
              </h2>
              <p className="mt-3 text-primary-foreground/80 text-sm sm:text-base">
                Get notified when new tools launch. No spam — one email per
                release.
              </p>
              <div className="mt-6 [&_input]:bg-white [&_input]:text-foreground [&_button]:bg-accent [&_button]:text-foreground [&_button:hover]:bg-accent/90">
                <NewsletterForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 sm:py-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                From the Blog
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog">All posts →</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
