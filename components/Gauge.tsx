"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { bandMeta } from "@/lib/scoring";

export default function Gauge({
  score,
  band,
  status,
}: {
  score: number;
  band: "green" | "yellow" | "red";
  status: string;
}) {
  const [display, setDisplay] = useState(0);
  const color = bandMeta[band].color;

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const radius = 78;
  const circumference = Math.PI * radius; // semicircle
  const dash = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="118" viewBox="0 0 200 118" fill="none">
          <path
            className="gauge-track"
            d="M14 104 A 78 78 0 0 1 186 104"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <motion.path
            d="M14 104 A 78 78 0 0 1 186 104"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dash} ${circumference}` }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* tick marks */}
          {[0, 25, 50, 75, 100].map((m) => {
            const angle = Math.PI - (m / 100) * Math.PI;
            const x1 = 100 + Math.cos(angle) * 64;
            const y1 = 104 - Math.sin(angle) * 64;
            const x2 = 100 + Math.cos(angle) * 70;
            const y2 = 104 - Math.sin(angle) * 70;
            return (
              <line key={m} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8D0DA" strokeWidth="2" strokeLinecap="round" />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className="font-serif text-4xl font-semibold leading-none text-navy">
            {display}
            <span className="text-xl text-navy/40">/100</span>
          </span>
        </div>
      </div>
      <p className="mt-1 text-center font-serif text-xl font-medium" style={{ color }}>
        {status}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-navy/45">
        Financial Health Score
      </p>
    </div>
  );
}
