import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  speed = "normal",
  className,
  pauseOnHover = false,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  className?: string;
  pauseOnHover?: boolean;
}) {
  const animation =
    speed === "slow"
      ? "animate-marquee-slow"
      : speed === "fast"
      ? "animate-marquee"
      : "animate-marquee";

  return (
    <div className={cn("group relative overflow-x-clip", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-8 py-2 leading-[1.15] will-change-transform",
          reverse ? "animate-marquee-reverse" : animation,
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
