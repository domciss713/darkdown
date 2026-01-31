import type { ReactNode } from "react";
import "./../styles/globals.css";
import { LayoutShell } from "@/components/layout-shell";

export const metadata = {
  title: "DarkDowN",
  description: "DarkDowN server platforma"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
