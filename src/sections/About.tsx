import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { stats } from "@/data/content";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
          <div className="col-span-12 md:col-span-5">
            <Badge>About BTS</Badge>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl text-balance"
            >
              A small team
              <br />
              of <em className="font-light">versatile</em>
              <br />
              creatives.
            </motion.h2>
          </div>

          <div className="col-span-12 md:col-span-7 md:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              viewport={{ once: true, margin: "-80px" }}
              className="text-pretty text-lg leading-relaxed text-ink/75 md:text-2xl md:leading-snug"
            >
              We sit inside a corporation that runs many businesses, in many
              industries, in many time zones. Our job is to keep the design
              language coherent across all of it, while still letting each
              product feel distinctly itself.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mt-6 text-pretty text-base leading-relaxed text-ink/65 md:text-lg"
            >
              We're product designers, brand designers, motion folks,
              researchers, and design engineers. We pair up, we cross-pollinate,
              we ship. And every once in a while, we throw a party.
            </motion.p>

            <div className="mt-12 grid grid-cols-3 gap-y-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="border-l border-ink/15 pl-4"
                >
                  <div className="font-display text-5xl tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
