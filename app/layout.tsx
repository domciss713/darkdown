import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./../styles/globals.css";
import { LayoutShell } from "@/components/layout-shell";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://darkdown.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "DarkDowN | Minecraft server",
    template: "%s | DarkDowN",
  },
  description: "DarkDowN Minecraft server platforma: připojení, tickety, status, staff a hráčský účet.",
  keywords: ["minecraft", "survival", "darkdown", "ticket support", "mc server"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DarkDowN | Minecraft server",
    description: "Moderní Minecraft server web s podporou ticketů a správou účtu.",
    url: appUrl,
    siteName: "DarkDowN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DarkDowN | Minecraft server",
    description: "Připoj se na DarkDowN, otevři ticket a sleduj stav serveru.",
  },
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
