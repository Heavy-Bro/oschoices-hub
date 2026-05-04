import { App } from "@/lib/apps";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function AppCard({ app }: { app: App }) {
  const isLive = app.status === "live";

  const cardContent = (
    <Card className="group h-full transition-shadow hover:shadow-md border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-3xl">{app.emoji}</span>
          <Badge
            variant={isLive ? "default" : "secondary"}
            className={isLive ? "bg-primary text-primary-foreground" : ""}
          >
            {app.status === "live"
              ? "Live"
              : app.status === "coming_soon"
              ? "Coming soon"
              : "Archived"}
          </Badge>
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors mt-2">
          {app.name}
          {isLive && (
            <ExternalLink
              size={14}
              className="inline ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {app.tagline}
        </p>
        <p className="mt-2 text-xs text-muted-foreground capitalize">
          {app.category}
        </p>
      </CardContent>
    </Card>
  );

  if (!isLive) return <div className="h-full">{cardContent}</div>;

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full block"
    >
      {cardContent}
    </a>
  );
}
