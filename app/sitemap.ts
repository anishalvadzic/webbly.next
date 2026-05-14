import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://webbly.no",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://webbly.no/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://webbly.no/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://webbly.no/blog/hvorfor-norske-bedrifter-taper-kunder-pa-darlig-nettside-2026",
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://webbly.no/blog/hva-koster-en-nettside-i-norge-i-2026",
      lastModified: new Date("2026-05-11"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://webbly.no/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://webbly.no/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://webbly.no/personvern",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
