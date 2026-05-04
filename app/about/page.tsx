import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind OSChoices — why we build free indie tools and what we're working on next.",
};

// TODO Step 13: switch to hello@oschoices.com after Resend domain verification
const CONTACT_EMAIL = "vzonpro@gmail.com";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-[720px] px-4 sm:px-6 py-12 sm:py-16 w-full">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
          About OSChoices
        </h1>

        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            OSChoices is a one-person indie project. The goal is simple: build
            small, free tools that remove friction from everyday decisions. No
            VC money, no growth hacking, no dark patterns.
          </p>

          <p>
            Every app here is built because the problem was personally
            annoying — and because the existing solutions were either
            over-engineered, paywalled, or ugly. Life&apos;s too short for
            bad tools.
          </p>

          <p>
            <strong className="text-foreground">The name:</strong> OS stands
            for <em>Open</em> and <em>Simple</em>. Every tool we build has to
            pass both tests. If it&apos;s not open to everyone, it doesn&apos;t
            ship. If it needs a manual, we redesign it.
          </p>

          <p>
            <strong className="text-foreground">What&apos;s next:</strong> We&apos;re
            building across utility, finance, productivity, and creator
            categories. Subscribe below to get notified when new tools drop —
            usually once every few weeks.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-12 p-6 rounded-xl bg-secondary border border-border">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
            Get in touch
          </h2>
          <p className="text-muted-foreground text-sm">
            Questions, ideas, or just want to say hi? Email us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary hover:underline font-medium"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        {/* Newsletter */}
        <div className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Stay updated
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            One email when something new launches. Unsubscribe any time.
          </p>
          <NewsletterForm source="about" />
        </div>
      </main>
      <Footer />
    </>
  );
}
