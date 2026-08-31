"use client";

import confetti from "canvas-confetti";

// Premium, restrained confetti — gold + navy + white, not a chaotic burst.
export function celebrate(score: number) {
  if (typeof window === "undefined") return;
  const colors = ["#CA902F", "#0D2F52", "#FFFFFF", "#7EBEC5", "#E0B25A"];
  const count = score >= 80 ? 140 : score >= 65 ? 90 : 0;

  if (count === 0) return;

  // Create/ensure canvas mount
  const end = Date.now() + 900;
  (function frame() {
    confetti({
      particleCount: count / 3,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors,
      scalar: 0.9,
    });
    confetti({
      particleCount: count / 3,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors,
      scalar: 0.9,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
