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
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
            Smart tools for{" "}
            <span className="text-primary">smarter choices.</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Free, focused indie tools for everyday decisions. No accounts. No
            subscriptions. Just the tool you need.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/apps">Explore Tools</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read the Blog</Link>
            </Button>
          </div>
        </section>

        {/* What is OSChoices */}
        <section className="bg-secondary border-y border-border">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                What is OSChoices?
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                OSChoices is a growing collection of small, well-made web apps.
                Each one solves a single problem cleanly. We build in public,
                keep things free, and never add complexity that doesn&apos;t
                earn its place.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                OS stands for <strong>Open</strong> and <strong>Simple</strong>{" "}
                — the two things every tool here must be.
              </p>
            </div>
          </div>
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
