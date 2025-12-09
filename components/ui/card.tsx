import type { ReactNode } from "react";
import { clsx } from "clsx";

type Props = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: Props) {
  return (
    <div
      className={clsx(
        "dd-glass p-6 relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
}
