import { motion } from "framer-motion";
import type { Project } from "@/data/content";

function tint(hex: string, amount: number) {
  const c = hex.replace("#", "");
  const n = parseInt(c, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const t = (v: number) =>
    Math.round(v + (amount > 0 ? (255 - v) * amount : v * amount));
  const nr = t(r);
  const ng = t(g);
  const nb = t(b);
  return `rgb(${nr}, ${ng}, ${nb})`;
}

export function PatternArt({ project }: { project: Project }) {
  const a = project.accent;
  const ink = project.ink;
  const soft = tint(a, 0.55);
  const softer = tint(a, 0.78);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px]" style={{ backgroundColor: a }}>
      <div className="absolute inset-0 grain" />
      {project.pattern === "blocks" && <Blocks a={a} ink={ink} soft={soft} softer={softer} />}
      {project.pattern === "rings" && <Rings a={a} ink={ink} soft={soft} softer={softer} />}
      {project.pattern === "stripes" && <Stripes a={a} ink={ink} soft={soft} softer={softer} />}
      {project.pattern === "grid" && <Grid a={a} ink={ink} soft={soft} softer={softer} />}
      {project.pattern === "mesh" && <Mesh a={a} ink={ink} soft={soft} softer={softer} />}
      {project.pattern === "wave" && <Wave a={a} ink={ink} soft={soft} softer={softer} />}

      <motion.div
        aria-hidden
        className="absolute right-6 bottom-6 select-none font-display text-[120px] leading-none"
        style={{ color: tint(a, -0.4) }}
        initial={{ rotate: -8, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        {project.shape}
      </motion.div>
    </div>
  );
}

type P = { a: string; ink: string; soft: string; softer: string };

function Blocks({ ink, soft, softer }: P) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect x="20" y="40" width="160" height="220" rx="22" fill={softer} />
      <rect x="200" y="20" width="180" height="120" rx="22" fill={soft} />
      <rect x="200" y="160" width="100" height="120" rx="22" fill={ink} />
      <rect x="320" y="160" width="60" height="120" rx="22" fill={softer} />
      <circle cx="100" cy="150" r="42" fill={ink} />
    </svg>
  );
}

function Rings({ ink, soft, softer }: P) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <circle cx="200" cy="150" r="130" fill="none" stroke={ink} strokeWidth="22" />
      <circle cx="200" cy="150" r="86" fill="none" stroke={soft} strokeWidth="22" />
      <circle cx="200" cy="150" r="44" fill={softer} />
      <circle cx="60" cy="60" r="20" fill={ink} />
      <circle cx="350" cy="240" r="14" fill={ink} />
    </svg>
  );
}

function Stripes({ ink, soft, softer }: P) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <g>
        {Array.from({ length: 18 }).map((_, i) => (
          <rect
            key={i}
            x={i * 24 - 60}
            y={-20}
            width={12}
            height={360}
            transform={`rotate(20 200 150)`}
            fill={i % 2 === 0 ? softer : soft}
            opacity={0.85}
          />
        ))}
      </g>
      <circle cx="280" cy="100" r="46" fill={ink} />
      <circle cx="280" cy="100" r="22" fill={softer} />
    </svg>
  );
}

function Grid({ ink, soft, softer }: P) {
  const cells: { x: number; y: number; fill: string }[] = [];
  const palette = [softer, soft, ink, softer, soft, softer];
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 8; x++) {
      cells.push({
        x,
        y,
        fill: palette[(x + y) % palette.length],
      });
    }
  }
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x * 50 + 4}
          y={c.y * 50 + 4}
          width={42}
          height={42}
          rx={10}
          fill={c.fill}
          opacity={0.92}
        />
      ))}
    </svg>
  );
}

function Mesh({ ink, soft, softer }: P) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="m1" cx="20%" cy="30%" r="60%">
          <stop offset="0%" stopColor={softer} stopOpacity="1" />
          <stop offset="100%" stopColor={soft} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="m2" cx="80%" cy="80%" r="60%">
          <stop offset="0%" stopColor={ink} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ink} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#m1)" />
      <rect width="400" height="300" fill="url(#m2)" />
      <path
        d="M0,200 C100,150 200,260 400,180 L400,300 L0,300 Z"
        fill={ink}
        opacity="0.85"
      />
    </svg>
  );
}

function Wave({ ink, soft, softer }: P) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <path d="M0,200 C80,140 160,260 240,200 C320,140 360,220 400,180 L400,300 L0,300 Z" fill={softer} />
      <path d="M0,230 C80,170 160,290 240,230 C320,170 360,250 400,210 L400,300 L0,300 Z" fill={soft} />
      <path d="M0,260 C80,200 160,320 240,260 C320,200 360,280 400,240 L400,300 L0,300 Z" fill={ink} />
      <circle cx="80" cy="80" r="36" fill={softer} />
    </svg>
  );
}
