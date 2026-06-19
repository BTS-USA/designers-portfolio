import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { designers } from "@/data/content";
import { cn } from "@/lib/utils";

export function Team() {
  const [active, setActive] = useState(0);

  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <Badge>The collective</Badge>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl text-balance">
              Seven humans.
              <br />
              <em className="font-light">One</em> shared canvas.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base text-ink/65 md:text-lg">
            Hover to meet us. We pair across crafts so every project gets the
            right brain at the right moment.
          </p>
        </div>

        {/* Desktop: list + sticky preview */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {designers.map((d, i) => (
                <li
                  key={d.name}
                  onMouseEnter={() => setActive(i)}
                  className="group relative cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4 py-5">
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-xs text-ink/40">
                        0{i + 1}
                      </span>
                      <h3
                        className={cn(
                          "font-display text-4xl leading-tight tracking-tight transition-all duration-300 md:text-5xl",
                          active === i
                            ? "translate-x-2"
                            : "text-ink/60 group-hover:text-ink"
                        )}
                        style={
                          active === i
                            ? { color: d.accent }
                            : undefined
                        }
                      >
                        {d.name}
                      </h3>
                    </div>
                    <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50 lg:inline">
                      {d.experience}
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-px origin-left"
                    style={{ background: d.accent }}
                    initial={false}
                    animate={{ scaleX: active === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-28">
              <DesignerCard designer={designers[active]} />
            </div>
          </div>
        </div>

        {/* Mobile: horizontal cards */}
        <div className="md:hidden">
          <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
            {designers.map((d) => (
              <div
                key={d.name}
                className="w-[78%] shrink-0 snap-start"
              >
                <DesignerCard designer={d} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignerCard({ designer }: { designer: (typeof designers)[number] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={designer.name}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[28px] p-6 md:p-8"
        style={{ backgroundColor: designer.accent }}
      >
        <div className="grain absolute inset-0" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white/15 ring-2 ring-white/40 backdrop-blur md:h-24 md:w-24">
              {designer.image ? (
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <span className="grid h-full w-full place-items-center font-display text-3xl text-white md:text-4xl">
                  {designer.initials}
                </span>
              )}
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
              {designer.experience}
            </span>
          </div>

          <h3 className="mt-8 font-display text-4xl leading-tight text-white md:text-5xl">
            {designer.name}
          </h3>

          <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-white/85 md:text-base">
            {designer.bio}
          </p>

          <div className="mt-8 rounded-2xl bg-black/15 p-4 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              Superpower
            </p>
            <p className="mt-1 text-pretty text-sm text-white md:text-base">
              {designer.superpower}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {designer.loves.map((l) => (
              <span
                key={l}
                className="rounded-full border border-white/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
