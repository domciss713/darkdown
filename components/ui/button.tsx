import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export function Button({ variant = "primary", className, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dd-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dd-bg disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary:
      "bg-dd-primary hover:bg-dd-primaryHover text-dd-text shadow-dd",
    ghost: "bg-transparent hover:bg-white/5 text-dd-text"
  };
  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    />
  );
}
