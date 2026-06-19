import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: "01",
    title: "Listen",
    body: "Briefs rarely arrive fully baked. We dig into the why before the what, interviewing stakeholders, users, and anyone who'll talk to us.",
    color: "#CA1C68",
  },
  {
    number: "02",
    title: "Sketch",
    body: "Lots of cheap, fast, ugly options. The 'right' answer is usually the seventh one, after we've killed the first six.",
    color: "#1D7279",
  },
  {
    number: "03",
    title: "Shape",
    body: "From rough to right. We polish in pairs, throw it past the team, and keep sharpening until it earns the brand's signature.",
    color: "#4C3480",
  },
  {
    number: "04",
    title: "Ship",
    body: "We work shoulder-to-shoulder with engineering through QA, launch, and the inevitable Day-2 polish list.",
    color: "#1C4C87",
  },
];

export function Process() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="mb-12 grid grid-cols-12 gap-6 md:mb-16">
          <div className="col-span-12 md:col-span-6">
            <Badge>How we work</Badge>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl text-balance">
              No magic. <em className="font-light">Just</em>
              <br />a clear process.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:pt-12">
            <p className="text-pretty text-base text-ink/65 md:text-lg">
              Four simple beats, repeated as often as the brief demands.
              Lightweight enough for a sprint, robust enough for a year-long
              transformation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.article
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative isolate overflow-hidden rounded-3xl border border-ink/10 bg-white/60 p-6 backdrop-blur md:p-8"
            >
              <motion.span
                aria-hidden
                className="absolute -right-6 -top-6 block h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: s.color }}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span
                    className="font-display text-5xl tracking-tight"
                    style={{ color: s.color }}
                  >
                    {s.number}
                  </span>
                  <span
                    className="h-3 w-3 rounded-full transition-transform duration-500 group-hover:scale-150"
                    style={{ background: s.color }}
                  />
                </div>
                <h3 className="mt-8 font-display text-3xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-ink/70 md:text-base">
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
