import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Without a configured domain there is no absolute URL to list, and a
  // sitemap of relative paths is worse than no sitemap at all.
  if (!siteUrl) return [];

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
