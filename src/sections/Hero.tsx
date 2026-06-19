import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16"
    >
      <BackgroundOrbs />

      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 items-end gap-y-10 md:gap-y-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-12 font-display display-tight text-[14vw] sm:text-[12vw] md:text-[10.2vw] lg:text-[170px] text-balance"
          >
            <span className="block">
              We design{" "}
              <span className="relative inline-block">
                <ScribbleUnderline />
                <em className="not-italic font-light italic" style={{ fontStyle: "italic" }}>
                  things
                </em>
              </span>{" "}
              you
            </span>
            <span className="block">
              actually want to{" "}
              <span className="inline-flex items-center gap-3">
                <AnimatedSwatch /> use
              </span>
              .
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-12 grid grid-cols-12 items-end gap-6 md:gap-10"
          >
            <p className="col-span-12 max-w-xl text-pretty text-base leading-relaxed text-ink/70 md:col-span-7 md:text-lg">
              We're <strong className="font-semibold text-ink">BTS</strong>,
              the in-house design team behind products, brands and experiences
              shipped across our company's many ventures. Seven designers, one
              shared canvas, zero ego.
            </p>

            <div className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
              <Magnetic>
                <Button asChild size="lg" variant="brand">
                  <a href="#work">
                    See our work <ArrowDown className="!size-4" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button asChild size="lg" variant="outline">
                  <a href="#team">
                    <Sparkles className="!size-4" /> Meet the team
                  </a>
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Floating colour blobs */}
        <motion.div
          style={{ y: y1, rotate: rot }}
          className="pointer-events-none absolute right-[6%] top-32 hidden md:block"
        >
          <div className="grid grid-cols-2 gap-3">
            <Swatch className="bg-brand-500" />
            <Swatch className="bg-teal-400" />
            <Swatch className="bg-violet-400" />
            <Swatch className="bg-signal-yellow" />
          </div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          aria-hidden
          className="pointer-events-none absolute -left-12 top-44 hidden text-ink/10 md:block"
        >
          <span className="font-display text-[160px] leading-none">★</span>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="mt-20 border-y border-ink/10 bg-ink text-ink-paper md:mt-28">
        <Marquee speed="slow" className="py-5">
          {[
            "Product design",
            "UI design",
            "Design systems",
            "Data viz",
            "Motion",
            "Accessibility",
            "Prototyping",
            "AI-assisted",
          ].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display text-4xl md:text-6xl"
            >
              <span>{t}</span>
              <span className="inline-block h-3 w-3 rounded-full bg-brand-300" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Swatch({ className = "" }: { className?: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.1, rotate: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className={`block h-16 w-16 rounded-2xl shadow-[0_12px_40px_-12px_rgba(36,40,43,0.4)] ${className}`}
    />
  );
}

function AnimatedSwatch() {
  return (
    <motion.span
      animate={{ rotate: [0, -6, 6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative inline-flex h-[0.85em] w-[0.95em] items-center justify-center rounded-[0.18em] bg-brand-500 align-middle"
    >
      <span className="absolute inset-1 rounded-[0.12em] bg-signal-yellow" />
      <span className="absolute inset-2 rounded-[0.08em] bg-teal-400" />
    </motion.span>
  );
}

function ScribbleUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 24"
      className="absolute -bottom-3 left-0 h-3 w-full md:-bottom-4 md:h-4"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 12 C 60 4, 130 22, 200 10 C 250 2, 290 18, 318 8"
        stroke="#CA1C68"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

function BackgroundOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-32 h-[420px] w-[420px] rounded-full bg-brand-200/60 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-teal-200/70 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 20, -20, 0], y: [0, 10, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/3 bottom-0 h-[360px] w-[360px] rounded-full bg-violet-200/70 blur-3xl"
      />
    </div>
  );
}
