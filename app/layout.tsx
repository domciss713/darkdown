import type { ReactNode } from "react";
import "./../styles/globals.css";
import { LayoutShell } from "@/components/layout-shell";

export const metadata = {
  title: "DarkDowN",
  description: "Purple themed Minecraft server platform"
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
