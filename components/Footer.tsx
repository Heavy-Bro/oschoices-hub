import Link from "next/link";
import { apps } from "@/lib/apps";

export default function Footer() {
  const year = new Date().getFullYear();
  const liveApps = apps.filter((a) => a.status === "live");

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="font-heading text-lg font-bold text-foreground"
            >
              <span className="text-primary">OS</span>Choices
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Smart tools for smarter choices.
            </p>
          </div>

          {/* Apps */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Apps</p>
            {liveApps.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {liveApps.map((app) => (
                  <li key={app.slug}>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {app.emoji} {app.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                First app launching soon.
              </p>
            )}
          </div>

          {/* Site links */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Site</p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/apps", label: "All Apps" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Made by OSChoices &copy; {year}
        </div>
      </div>
    </footer>
  );
}
