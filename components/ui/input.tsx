import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm text-dd-text placeholder:text-dd-muted focus:outline-none focus:ring-2 focus:ring-dd-accent",
        props.className
      )}
    />
  );
}
