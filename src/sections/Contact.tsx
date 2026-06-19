import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-24 text-ink-paper md:py-32"
    >
      <BackgroundFx />

      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 items-end gap-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="col-span-12 font-display display-tight text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[160px] text-balance"
          >
            <span className="block">Got a brief?</span>
            <span className="block text-brand-300">Let's make it sing.</span>
          </motion.h2>

          <div className="col-span-12 grid grid-cols-12 gap-6 md:col-span-12">
            <p className="col-span-12 max-w-xl text-pretty text-lg text-ink-paper/70 md:col-span-6">
              We're always up for ambitious work. Internal squads, sister
              brands, even the occasional moonshot. Drop us a line and we'll
              reply within a working day.
            </p>

            <div className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end">
              <Magnetic>
                <a
                  href="mailto:prajakta.sagade@bts.com"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-500 px-7 py-4 text-base font-medium text-white transition-colors hover:bg-brand-600"
                >
                  Let's talk
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-brand-600 transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-base font-medium text-ink-paper transition-colors hover:bg-white hover:text-ink"
                >
                  Browse our work
                </a>
              </Magnetic>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-20 border-t border-white/10">
        <Marquee speed="slow" reverse>
          {[
            "Open for briefs",
            "Open for briefs",
            "Open for briefs",
            "Open for briefs",
          ].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display text-5xl text-ink-paper md:text-7xl"
            >
              <span>{t}</span>
              <span className="inline-block h-3 w-3 rounded-full bg-signal-yellow" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function BackgroundFx() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      <motion.div
        animate={{ x: [0, 60, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-brand-500/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-10 h-[460px] w-[460px] rounded-full bg-violet-400/30 blur-3xl"
      />
    </div>
  );
}
