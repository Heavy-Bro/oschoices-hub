import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type BlogMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
}

export default function BlogCard({ post }: { post: BlogMeta }) {
  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full transition-shadow hover:shadow-md border-border">
        <CardHeader className="pb-2">
          <p className="text-xs text-muted-foreground">{formatted}</p>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
