"use client";

import { motion } from "framer-motion";
import { trackEvent } from "./Analytics";

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="hero-backdrop relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-medium uppercase tracking-[0.18em] text-navy/55"
        >
          <span>Helping families since 2010</span>
          <span className="hidden h-1 w-1 rounded-full bg-gold/60 sm:inline-block" />
          <span>Kitchener–Waterloo, ON</span>
          <span className="hidden h-1 w-1 rounded-full bg-gold/60 sm:inline-block" />
          <span>Comprehensive Wealth Planning</span>
        </motion.div>

        <div className="hairline mx-auto mt-6 w-24" />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto mt-10 max-w-3xl text-center font-serif text-4xl font-semibold leading-[1.08] text-navy sm:text-6xl"
        >
          How Financially Prepared Are You?
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy/70 sm:text-xl"
        >
          Answer a few quick questions and receive your personalized{" "}
          <span className="font-medium text-navy">Financial Health Scorecard</span> across
          Retirement, Investments, Tax Planning, and Protection.
        </motion.p>

        {/* CTA + meta */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <button
            onClick={() => {
              trackEvent("start_assessment");
              onStart();
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-base font-medium text-white shadow-card transition-all hover:bg-navy-700 hover:shadow-cardHover focus-visible:outline-2 focus-visible:outline-gold"
          >
            Start My Assessment
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-navy/60">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon /> 90 Seconds
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> No Cost
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> No Obligation
            </span>
          </div>
        </motion.div>

        {/* Pillars preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {PILLARS_PREVIEW.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-navy/8 bg-white/70 px-4 py-5 text-center shadow-sm backdrop-blur-sm"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center text-navy">
                {p.icon}
              </div>
              <p className="text-sm font-semibold text-navy">{p.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const PILLARS_PREVIEW = [
  { name: "Retirement", icon: <RetirementIcon /> },
  { name: "Investments", icon: <InvestmentsIcon /> },
  { name: "Tax Planning", icon: <TaxIcon /> },
  { name: "Protection", icon: <ProtectionIcon /> },
];

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function RetirementIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 20h18M5 20l4-9 4 5 3-8 3 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function InvestmentsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 19V5M4 15l5-5 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TaxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 3h9l4 4v14H6zM6 11h12M9 7h4M9 15h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ProtectionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" strokeLinejoin="round" />
    </svg>
  );
}
