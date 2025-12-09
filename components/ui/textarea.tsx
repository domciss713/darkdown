import type { TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";

export function Textarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm text-dd-text placeholder:text-dd-muted focus:outline-none focus:ring-2 focus:ring-dd-accent min-h-[120px]",
        props.className
      )}
    />
  );
}
