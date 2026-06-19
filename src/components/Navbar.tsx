import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-20 backdrop-blur-md md:h-24 [mask-image:linear-gradient(to_bottom,black,black_50%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_50%,transparent)]"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container-px mx-auto flex max-w-[1400px] items-center justify-between">
        <motion.a
          href="#top"
          aria-label="BTS"
          className="group relative inline-flex items-center"
          whileHover={{ scale: 1.04 }}
        >
          <img
            src="/bts-logo.png"
            alt="BTS"
            className="h-7 w-auto md:h-8"
            draggable={false}
          />
        </motion.a>

        <nav className="hidden items-center gap-1 rounded-full border border-ink/10 bg-ink-paper/80 px-2 py-2 backdrop-blur-md md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 -z-0 scale-90 rounded-full bg-ink/5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="mailto:prajakta.sagade@bts.com">
              Let's talk <ArrowUpRight className="!size-3.5" />
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-ink-paper/80 backdrop-blur-md md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink text-ink-paper md:hidden"
          >
            <div className="container-px flex items-center justify-between py-5">
              <span className="inline-flex items-center rounded-md bg-ink-paper px-3 py-1.5">
                <img
                  src="/bts-logo.png"
                  alt="BTS"
                  className="h-6 w-auto"
                  draggable={false}
                />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="container-px flex flex-col gap-4 py-10">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-display text-5xl tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
              <Button asChild variant="brand" size="lg" className="mt-8 self-start">
                <a
                  href="mailto:prajakta.sagade@bts.com"
                  onClick={() => setOpen(false)}
                >
                  Let's talk <ArrowUpRight />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </header>
    </>
  );
}

