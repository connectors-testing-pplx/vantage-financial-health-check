"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS, PILLARS, PillarId } from "@/lib/questions";
import { trackEvent } from "./Analytics";

const pillarOrder: PillarId[] = ["retirement", "investments", "tax", "protection"];

export default function Assessment({
  onComplete,
}: {
  onComplete: (answers: Record<string, number>) => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = QUESTIONS[index];
  const total = QUESTIONS.length;
  const progress = Math.round(((index) / total) * 100);
  const currentPillar = PILLARS[question.pillar];

  const handleSelect = (score: number) => {
    const next = { ...answers, [question.id]: score };
    setAnswers(next);
    trackEvent("answer_question", { question_id: question.id, score });

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      trackEvent("complete_assessment", { answers: total });
      onComplete(next);
    }
  };

  const pillarIndex = pillarOrder.indexOf(question.pillar);

  return (
    <section className="section-cream min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-2xl px-6">
        {/* Progress bar */}
        <div className="sticky top-4 z-10 mb-10">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-navy/55">
            <span className="uppercase tracking-[0.14em]">
              {currentPillar.name}
            </span>
            <span>
              Question {index + 1} of {total}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #0D2F52, #CA902F)" }}
              initial={false}
              animate={{ width: `${progress + Math.round(100 / total)}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {/* Pillar dots */}
          <div className="mt-3 flex justify-center gap-2">
            {pillarOrder.map((pid, i) => (
              <span
                key={pid}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i < pillarIndex
                    ? "bg-gold"
                    : i === pillarIndex
                    ? "bg-navy"
                    : "bg-navy/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              {currentPillar.description}
            </p>
            <h2 className="mb-8 font-serif text-2xl font-semibold leading-snug text-navy sm:text-[2rem]">
              {question.prompt}
            </h2>

            <div className="flex flex-col gap-3" role="group" aria-label={question.prompt}>
              {question.answers.map((a, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(a.score)}
                  className="option-btn group flex items-center justify-between rounded-2xl border border-navy/10 bg-white px-5 py-5 text-left shadow-sm hover:border-gold hover:shadow-card focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <span className="pr-4 text-base font-medium text-navy sm:text-lg">
                    {a.label}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy/40 transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Back button */}
        {index > 0 && (
          <button
            onClick={() => setIndex(index - 1)}
            className="mx-auto mt-10 flex items-center gap-1.5 text-sm font-medium text-navy/50 transition-colors hover:text-navy"
          >
            <span aria-hidden>←</span> Previous question
          </button>
        )}
      </div>
    </section>
  );
}
