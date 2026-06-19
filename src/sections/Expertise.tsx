import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { services, expertise } from "@/data/content";
import { Marquee } from "@/components/Marquee";

export function Expertise() {
  return (
    <section id="expertise" className="relative bg-ink py-24 text-ink-paper md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <Badge className="border-white/20 bg-white/5 text-ink-paper/70">
              How we help
            </Badge>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl text-balance">
              Choose what
              <br />
              fits your <em className="font-light">brief</em>.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base text-ink-paper/60 md:text-lg">
            We plug into product squads, brand teams or marketing, wherever
            design needs a serious upgrade.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} />
          ))}
        </div>

        <div className="mt-16 md:mt-24">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-paper/50">
            Capabilities
          </p>
          <Marquee speed="slow">
            {expertise.map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-display text-3xl text-ink-paper/80 md:text-5xl"
              >
                <span className="transition-colors hover:text-ink-paper">
                  {c}
                </span>
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-300" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="group relative grid grid-cols-12 items-start gap-6 py-8 transition-colors md:py-10"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 inset-y-0 -z-0"
        animate={{ opacity: hover ? 1 : 0 }}
        style={{
          background: `linear-gradient(90deg, ${service.accent}22, transparent 60%)`,
        }}
      />

      <div className="col-span-12 flex items-center gap-4 md:col-span-1">
        <span
          className="font-mono text-xs text-ink-paper/40"
          style={{ color: hover ? service.accent : undefined }}
        >
          0{index + 1}
        </span>
      </div>

      <div className="col-span-12 md:col-span-5">
        <motion.h3
          className="font-display text-3xl leading-tight tracking-tight md:text-5xl"
          animate={{ x: hover ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {service.title}
        </motion.h3>
      </div>

      <div className="col-span-12 md:col-span-4">
        <p className="text-pretty text-base text-ink-paper/70 md:text-lg">
          {service.description}
        </p>
      </div>

      <div className="col-span-12 md:col-span-2">
        <ul className="flex flex-wrap gap-2">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-paper/70"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
