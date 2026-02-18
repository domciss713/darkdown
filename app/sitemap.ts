import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darkdown.xyz";
  const now = new Date();

  const routes = [
    "",
    "/play",
    "/rules",
    "/news",
    "/store",
    "/status",
    "/staff",
    "/leaderboard",
    "/map",
    "/tickets",
    "/login",
    "/register"
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7
  }));
}
