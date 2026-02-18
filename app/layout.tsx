import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./../styles/globals.css";
import { LayoutShell } from "@/components/layout-shell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darkdown.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DarkDowN | Minecraft server",
    template: "%s | DarkDowN"
  },
  description:
    "DarkDowN je Minecraft server platforma s ticket podporou, mapou, pravidly a komunitním zázemím.",
  keywords: [
    "minecraft",
    "minecraft server",
    "darkdown",
    "survival",
    "ticket support",
    "cz/sk minecraft"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: "DarkDowN",
    title: "DarkDowN | Minecraft server",
    description:
      "Připoj se na DarkDowN Minecraft server. Tickety, podpora, status serveru a serverová komunita na jednom místě."
  },
  twitter: {
    card: "summary_large_image",
    title: "DarkDowN | Minecraft server",
    description:
      "Připoj se na DarkDowN Minecraft server. Tickety, podpora, status serveru a serverová komunita na jednom místě."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
