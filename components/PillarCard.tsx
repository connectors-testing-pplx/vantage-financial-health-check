"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { bandMeta, PillarResult } from "@/lib/scoring";

export default function PillarCard({
  pillar,
  index,
}: {
  pillar: PillarResult;
  index: number;
}) {
  const meta = bandMeta[pillar.band];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(eased * pillar.score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pillar.score]);

  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const dash = (pillar.score / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
      className="group relative flex flex-col rounded-2xl border border-navy/8 bg-white p-6 shadow-card transition-all hover:shadow-cardHover"
    >
      {/* Top: ring + status badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative h-24 w-24">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle cx="48" cy="48" r="40" fill="none" stroke="#E9EDF2" strokeWidth="7" />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke={meta.color}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ - dash }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.12 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-xl font-semibold text-navy">{shown}%</span>
          </div>
        </div>

        <span
          className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ color: meta.color, background: meta.bg }}
        >
          {pillar.status}
        </span>
      </div>

      <h3 className="font-serif text-lg font-semibold text-navy">{pillar.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy/65">{pillar.explanation}</p>

      <div className="mt-4 rounded-xl border-l-2 bg-cream/70 px-3 py-2.5 text-sm leading-relaxed text-navy/75" style={{ borderColor: meta.color }}>
        <span className="font-medium text-navy">Recommended:</span>{" "}
        {pillar.recommendation}
      </div>
    </motion.div>
  );
}
