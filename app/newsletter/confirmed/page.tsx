import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "You're subscribed!",
  description: "Thanks for confirming your OSChoices subscription.",
  robots: { index: false },
};

export default function NewsletterConfirmedPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-6">🎉</p>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            You&apos;re in!
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Your subscription is confirmed. You&apos;ll hear from us when new
            tools drop — and only then.
          </p>
          <p className="mt-2 text-muted-foreground">
            A welcome email is on its way.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/apps">Explore Tools</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">Read the Blog</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
