import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";
import { apps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Browse all OSChoices tools. Free, focused web apps for everyday decisions.",
};

export default function AppsPage() {
  const liveApps = apps.filter((a) => a.status === "live");
  const comingApps = apps.filter((a) => a.status === "coming_soon");

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-[1200px] px-4 sm:px-6 py-12 sm:py-16 w-full">
        <div className="mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            All Apps
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Every tool we&apos;ve built. Free forever.
          </p>
        </div>

        {apps.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-secondary p-16 text-center">
            <p className="text-3xl mb-4">🛠️</p>
            <p className="font-heading text-xl font-semibold text-foreground">
              First app launching soon — subscribe to be notified.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              We&apos;re building in public. Follow along on the{" "}
              <a href="/blog" className="text-primary hover:underline">
                blog
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {liveApps.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Live now
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveApps.map((app) => (
                    <AppCard key={app.slug} app={app} />
                  ))}
                </div>
              </div>
            )}
            {comingApps.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Coming soon
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comingApps.map((app) => (
                    <AppCard key={app.slug} app={app} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
