"use client";

import { trackEvent } from "./Analytics";

const BOOK_URL =
  "https://bookings.cloud.microsoft/bookwithme/user/a1aa02ef924444308479ede76996db34%40vantagewealth.ca?anonymous&ismsaljsauthenabled=true";

export default function BookingCTA() {
  return (
    <section className="bg-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 h-px w-16 bg-gold/60" />
        <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-[2.6rem]">
          Ready to Improve Your Financial Health?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
          Your assessment provides a snapshot — but every financial situation is unique.
          Meet with Dave for a complimentary review where we'll explain your results,
          answer your questions, and help you build a personalized action plan.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("book_call_click")}
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-navy shadow-lg transition-all hover:bg-gold-light hover:shadow-xl"
          >
            Book My Complimentary Review with Dave
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </a>
          <p className="text-sm text-white/50">
            Or call us directly at{" "}
            <a href="tel:+15198861353" className="font-medium text-white/80 underline-offset-4 hover:underline">
              519-886-1353
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
