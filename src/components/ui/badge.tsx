import * as React from "react";
import { cn } from "@/lib/utils";

export const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ink-paper/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 backdrop-blur",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";
