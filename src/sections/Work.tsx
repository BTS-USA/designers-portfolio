import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Lightbox, isVideoSrc } from "@/components/Lightbox";
import { PatternArt } from "@/components/PatternArt";
import { projects } from "@/data/content";

const COVER_PAN_PRESETS = [
  { x: [-14, 14], y: [0, 0] },
  { x: [14, -14], y: [0, 0] },
  { x: [0, 0], y: [-12, 12] },
  { x: [0, 0], y: [12, -12] },
  { x: [-12, 12], y: [-10, 10] },
  { x: [12, -12], y: [-10, 10] },
  { x: [-12, 12], y: [10, -10] },
  { x: [12, -12], y: [10, -10] },
] as const;

const COVER_SLIDE_DIRECTIONS = [
  { from: { x: "100%", y: 0 }, to: { x: "-100%", y: 0 } },
  { from: { x: "-100%", y: 0 }, to: { x: "100%", y: 0 } },
  { from: { x: 0, y: "100%" }, to: { x: 0, y: "-100%" } },
  { from: { x: 0, y: "-100%" }, to: { x: 0, y: "100%" } },
] as const;

export function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeProject = openIndex !== null ? projects[openIndex] : null;

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <Badge>Selected work</Badge>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl text-balance">
              Recent <em className="font-light">favourites</em>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base text-ink/65 md:text-lg">
            Browse our work by category. Click any card to flip through the
            pieces inside.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              onOpen={
                p.images && p.images.length > 0
                  ? () => setOpenIndex(i)
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <Lightbox
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        images={activeProject?.images ?? []}
        title={activeProject?.title}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[number];
  index: number;
  onOpen?: () => void;
}) {
  const hasImages = !!project.images && project.images.length > 0;
  const coverSrc = hasImages ? project.images![0] : null;
  const coverIsVideo = !!coverSrc && isVideoSrc(coverSrc);
  const isClickable = !!onOpen;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={!isClickable}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.06 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      className={`group relative block w-full overflow-hidden rounded-[28px] text-left ${
        isClickable ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="relative aspect-[16/11] w-full">
        {hasImages ? (
          <>
            {coverIsVideo ? (
              <video
                src={coverSrc!}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
              />
            ) : (
              <CoverSlideshow
                images={project.images!}
                title={project.title}
                index={index}
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
            {coverIsVideo && (
              <span className="pointer-events-none absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md md:right-6 md:top-6 md:h-11 md:w-11">
                <Play className="size-4 translate-x-[1px] fill-white" />
              </span>
            )}
          </>
        ) : (
          <PatternArt project={project} />
        )}

        <div className="absolute inset-0 flex items-end justify-between gap-3 p-6 md:p-8">
          <h3 className="font-display text-2xl leading-[1.05] text-white text-balance md:text-[28px]">
            {project.title}
          </h3>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function CoverSlideshow({
  images,
  title,
  index,
}: {
  images: string[];
  title: string;
  index: number;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const pan = COVER_PAN_PRESETS[index % COVER_PAN_PRESETS.length];
  const slide =
    COVER_SLIDE_DIRECTIONS[index % COVER_SLIDE_DIRECTIONS.length];
  const panDuration = 12 + (index % 5) * 1.6;
  const slideIntervalMs = 4500 + (index % 4) * 600;
  const hasMany = images.length > 1;

  useEffect(() => {
    if (!hasMany) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, slideIntervalMs);
    return () => window.clearInterval(id);
  }, [hasMany, images.length, slideIntervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeIdx}
          className="absolute inset-0 will-change-transform"
          initial={hasMany ? slide.from : false}
          animate={{ x: 0, y: 0 }}
          exit={hasMany ? slide.to : undefined}
          transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={images[activeIdx]}
            alt={`${title} cover ${activeIdx + 1}`}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            loading="lazy"
            draggable={false}
            initial={{ x: pan.x[0], y: pan.y[0], scale: 1.12 }}
            animate={{ x: pan.x[1], y: pan.y[1], scale: 1.12 }}
            transition={{
              duration: panDuration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
