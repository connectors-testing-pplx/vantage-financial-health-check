"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AssessmentResult, bandMeta } from "@/lib/scoring";
import Gauge from "./Gauge";
import PillarCard from "./PillarCard";
import LeadCapture from "./LeadCapture";
import { celebrate } from "./confetti";
import { trackEvent } from "./Analytics";

export default function ResultsDashboard({
  result,
  onRestart,
}: {
  result: AssessmentResult;
  onRestart: () => void;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent("view_results", { overall: result.overall });
    const t = setTimeout(() => celebrate(result.overall), 500);
    return () => clearTimeout(t);
  }, [result.overall]);

  return (
    <section className="section-cream py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header + gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-navy/8 bg-white p-8 text-center shadow-card sm:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Your Personalized Financial Health Dashboard
          </p>
          <div className="mx-auto mt-6">
            <Gauge score={result.overall} band={result.overallBand} status={result.overallStatus} />
          </div>
          <p className="mx-auto mt-5 max-w-lg text-navy/65">
            Here's a snapshot across the four pillars of financial health. Read on for
            your strengths, opportunities, and personalized recommendations.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <h2 className="mt-14 mb-6 text-center font-serif text-2xl font-semibold text-navy sm:text-3xl">
          Your Four Pillars
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {result.pillars.map((p, i) => (
            <PillarCard key={p.id} pillar={p} index={i} />
          ))}
        </div>

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 rounded-3xl border border-navy/8 bg-white p-8 shadow-card sm:p-10"
          >
            <h2 className="font-serif text-2xl font-semibold text-navy">Your Personalized Recommendations</h2>
            <p className="mt-2 text-navy/60">Focused next steps, based on your answers:</p>
            <ul className="mt-6 space-y-4">
              {result.recommendations.map((r, i) => {
                const meta = bandMeta[r.priority];
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-4 rounded-2xl bg-cream/70 p-4"
                  >
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-navy">{r.pillar}</p>
                      <p className="mt-0.5 text-sm text-navy/70">{r.text}</p>
                      <div className="mt-2 flex gap-3">
                        <span className="text-sm font-medium text-navy/55">Learn More</span>
                        <span className="text-navy/25">·</span>
                        <span className="text-sm font-medium text-gold-dark">Book a Review</span>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}

        {/* Lead capture */}
        <div className="mt-12" id="lead">
          <LeadCapture result={result} />
        </div>

        {/* Restart */}
        <div className="mt-8 text-center">
          <button
            onClick={onRestart}
            className="text-sm font-medium text-navy/50 transition-colors hover:text-navy"
          >
            ↻ Retake the assessment
          </button>
        </div>
      </div>
    </section>
  );
}
