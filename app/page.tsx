"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Assessment from "@/components/Assessment";
import ResultsDashboard from "@/components/ResultsDashboard";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { scoreAssessment, AssessmentResult } from "@/lib/scoring";
import { trackEvent } from "@/components/Analytics";

type Stage = "hero" | "assessment" | "results";

export default function Page() {
  const [stage, setStage] = useState<Stage>("hero");
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStart = () => {
    setStage("assessment");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = (answers: Record<string, number>) => {
    setResult(scoreAssessment(answers));
    setStage("results");
    trackEvent("view_results");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setResult(null);
    setStage("hero");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <Header onLogo={handleRestart} />
      {stage === "hero" && (
        <>
          <Hero onStart={handleStart} />
          <BookingCTA />
        </>
      )}
      {stage === "assessment" && (
        <Assessment onComplete={handleComplete} />
      )}
      {stage === "results" && result && (
        <>
          <ResultsDashboard result={result} onRestart={handleRestart} />
          <BookingCTA />
        </>
      )}
      <Footer />
    </main>
  );
}

function Header({ onLogo }: { onLogo: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-navy/8 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <button onClick={onLogo} className="focus-visible:outline-2 focus-visible:outline-gold">
          <Logo />
        </button>
        <a
          href="https://vantagewealth.ca"
          className="text-sm font-medium text-navy/60 transition-colors hover:text-navy"
        >
          Back to Vantage →
        </a>
      </div>
    </header>
  );
}
