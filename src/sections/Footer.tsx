import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-paper/70">
      <div className="container-px mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 border-t border-white/10 py-8 md:flex-row md:items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
          © {new Date().getFullYear()} BTS Designers Mumbai
        </p>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span>Crafted with</span>
          <Heart
            aria-label="love"
            className="size-3.5 fill-brand-500 text-brand-500"
          />
        </p>
      </div>
    </footer>
  );
}
