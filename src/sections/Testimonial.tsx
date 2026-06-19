import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[36px] bg-ink-paper p-8 md:p-16 lg:p-24">
          <div aria-hidden className="grain absolute inset-0" />

          <motion.div
            aria-hidden
            initial={{ rotate: -20, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute -right-10 -top-10 hidden md:block"
          >
            <span className="font-display text-[300px] leading-none text-brand-100/80">
              &ldquo;
            </span>
          </motion.div>

          <Quote
            className="absolute right-8 top-8 size-10 -rotate-12 text-brand-300 md:hidden"
            strokeWidth={1.4}
          />

          <div className="relative grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
                Kind words
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-80px" }}
                className="font-display text-3xl leading-tight tracking-tight md:text-5xl text-balance"
              >
                "Working with{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">BTS</span>
                  <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-signal-yellow/80 md:bottom-2 md:h-4" />
                </span>{" "}
                feels less like hiring an agency and more like adopting a
                second family. They're embedded in the work, the outcomes,
                and somehow even our slack memes."
              </motion.p>

              <div className="mt-10 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-ink-paper">
                  <span className="font-display text-lg">M</span>
                </div>
                <div>
                  <p className="font-medium">Maya Singh</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    VP Product · Internal Stakeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
