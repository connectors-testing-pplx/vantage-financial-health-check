"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AssessmentResult } from "@/lib/scoring";
import { trackEvent } from "./Analytics";
import { celebrate } from "./confetti";

const BOOK_URL =
  "https://bookings.cloud.microsoft/bookwithme/user/a1aa02ef924444308479ede76996db34%40vantagewealth.ca?anonymous&ismsaljsauthenabled=true";

export default function LeadCapture({ result }: { result: AssessmentResult }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    meetingType: "Virtual",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Please share your name and email so we can send your roadmap.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    const demo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || "";
    try {
      if (demo) {
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const res = await fetch(`${apiBase}/api/submit-lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            overall: result.overall,
            pillars: result.pillars.map((p) => ({
              name: p.name,
              score: p.score,
              band: p.band,
            })),
            recommendations: result.recommendations.map((r) => r.text),
          }),
        });
        if (!res.ok) throw new Error("Submission failed");
      }
      trackEvent("lead_submitted", { overall: result.overall, meetingType: form.meetingType });
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or call us at 519-886-1353.");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/30 bg-white p-8 text-center shadow-card"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-health-greenBg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-navy">Thank you, {form.name.split(" ")[0]}</h3>
        <p className="mx-auto mt-3 max-w-md text-navy/65">
          Your Financial Health Scorecard is on its way to your inbox. The most valuable next
          step is a quick conversation — book your complimentary review with Dave now.
        </p>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { trackEvent("book_call_after_lead"); celebrate(result.overall); }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-navy shadow-lg transition-all hover:bg-gold-light"
        >
          Book My Complimentary Review with Dave →
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-navy/8 bg-white p-7 shadow-card sm:p-9"
    >
      <h3 className="font-serif text-2xl font-semibold text-navy">
        Get Your Personalized Financial Roadmap
      </h3>
      <p className="mt-2 text-navy/60">
        We'll email your full scorecard and recommendations — and a Vantage advisor will follow up
        to book your complimentary review.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field label="Name" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="vantage-input"
            autoComplete="name"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="vantage-input"
              autoComplete="email"
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="vantage-input"
              autoComplete="tel"
            />
          </Field>
        </div>
        <Field label="Preferred Meeting Type">
          <div className="grid grid-cols-3 gap-2">
            {["Virtual", "Phone", "In Person"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, meetingType: t })}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                  form.meetingType === t
                    ? "border-navy bg-navy text-white"
                    : "border-navy/15 bg-white text-navy hover:border-gold"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        {error && <p className="text-sm font-medium text-health-red">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-navy px-6 py-4 text-base font-semibold text-white shadow-card transition-all hover:bg-navy-700 hover:shadow-cardHover disabled:opacity-60"
        >
          {status === "submitting" ? "Preparing your roadmap…" : "Get My Personalized Financial Roadmap"}
        </button>
        <p className="text-center text-xs text-navy/45">
          Your information is kept private and secure. No obligation, no spam.
        </p>
      </form>
    </motion.div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy/75">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
