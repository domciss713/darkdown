import { clsx } from "clsx";
import type { ReactNode } from "react";

type Props = {
  color?: "green" | "red" | "yellow" | "purple";
  children: ReactNode;
};

export function Badge({ color = "purple", children }: Props) {
  const map: Record<string, string> = {
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    red: "bg-red-500/10 text-red-300 border-red-500/30",
    yellow: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
    purple: "bg-dd-primary/10 text-dd-accent border-dd-primary/40"
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        map[color]
      )}
    >
      {children}
    </span>
  );
}
