export const dynamic = "force-dynamic";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function sitemap() {
  const baseUrl = "https://etomidateshop.com";

  let productUrls = [];
  try {
    await dbConnect();
    const products = await Product.find({}).lean();
    productUrls = products.map((p) => ({
      url: `${baseUrl}/shop/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // DB unavailable during build — skip product URLs
  }

  // Static pages with optimized priorities and frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Category pages for better SEO
    {
      url: `${baseUrl}/shop/etomidate-powder-pure`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop/etomidate-vape-kpod-classic`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop/etomidate-liquid-solution-standard`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop/etomidate-flavour-grape`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...staticPages, ...productUrls];
}
