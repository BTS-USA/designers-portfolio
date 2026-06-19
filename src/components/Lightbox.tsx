import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
  title?: string;
  initialIndex?: number;
};

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;
export const isVideoSrc = (src: string) => VIDEO_EXT.test(src);

export function Lightbox({
  open,
  onClose,
  images,
  title,
  initialIndex = 0,
}: Props) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, prev, next]);

  if (!images.length) return null;

  const hasMany = images.length > 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Media viewer"}
        >
          <div className="pointer-events-none absolute left-4 top-4 z-10 md:left-8 md:top-8">
            {title && (
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                {title}
              </p>
            )}
            {hasMany && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-8 md:top-8"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {isVideoSrc(images[index]) ? (
                <motion.video
                  key={images[index]}
                  src={images[index]}
                  controls
                  autoPlay
                  playsInline
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="max-h-[90vh] max-w-[92vw] rounded-2xl bg-black object-contain shadow-2xl md:max-w-[calc(100vw-160px)]"
                />
              ) : (
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt={`${title ?? "Image"} ${index + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl md:max-w-[calc(100vw-160px)]"
                  draggable={false}
                />
              )}
            </AnimatePresence>
          </div>

          {hasMany && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:left-6 md:h-14 md:w-14"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-6 md:h-14 md:w-14"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" />
              </button>

              <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 md:bottom-6">
                Use ← → to navigate · Esc to close
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
