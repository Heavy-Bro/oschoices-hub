import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oschoices.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/newsletter/confirmed"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
