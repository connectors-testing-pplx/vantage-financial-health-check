// Scoring engine + recommendation engine for the Financial Health Check.

import { QUESTIONS, PILLARS, PillarId } from "./questions";

export type ScoreBand = "green" | "yellow" | "red";

export interface PillarResult {
  id: PillarId;
  name: string;
  short: string;
  score: number; // 0-100
  band: ScoreBand;
  status: string;
  explanation: string;
  recommendation: string;
  learnMore: string;
}

export interface AssessmentResult {
  overall: number; // 0-100
  overallBand: ScoreBand;
  overallStatus: string;
  pillars: PillarResult[];
  recommendations: { pillar: string; text: string; priority: ScoreBand }[];
  totalQuestions: number;
}

const bandFor = (score: number): ScoreBand => {
  if (score >= 75) return "green";
  if (score >= 50) return "yellow";
  return "red";
};

export const bandMeta: Record<
  ScoreBand,
  { color: string; bg: string; soft: string; label: string }
> = {
  green: { color: "#2E9E5B", bg: "#E8F5EE", soft: "#2E9E5B", label: "Strong" },
  yellow: { color: "#E0A104", bg: "#FDF6E3", soft: "#E0A104", label: "Needs Attention" },
  red: { color: "#D4634A", bg: "#FBEAE5", soft: "#D4634A", label: "Priority" },
};

const pillarCopy: Record<
  PillarId,
  { explanations: Record<ScoreBand, string>; recommendation: string; learnMore: string }
> = {
  retirement: {
    explanations: {
      green:
        "You appear to have a strong retirement foundation, with clear goals and a sense of where you stand.",
      yellow:
        "You’re on the right track. A few refinements to your projections could give you added confidence.",
      red:
        "This is a great area to focus on first — defining your retirement target brings everything else into view.",
    },
    recommendation:
      "Review your retirement projections and CPP timing with an advisor to confirm you’re on track.",
    learnMore: "Retirement Planning",
  },
  investments: {
    explanations: {
      green:
        "Your investment approach looks well-structured, with awareness of risk, fees, and diversification.",
      yellow:
        "There may be opportunities to improve diversification and reduce investment costs.",
      red:
        "Your investment strategy may benefit from a closer look at fees, risk, and diversification.",
    },
    recommendation:
      "Review your investment allocation and fees to make sure they align with your goals.",
    learnMore: "Investment Strategy",
  },
  tax: {
    explanations: {
      green:
        "You’re making good use of tax-advantaged accounts and keeping an eye on your tax position.",
      yellow:
        "There may be tax-saving opportunities you’re not yet capturing.",
      red:
        "You could be paying more tax than necessary — this often holds the quickest wins.",
    },
    recommendation:
      "Discuss tax-saving strategies like TFSA/RRSP optimization and income splitting.",
    learnMore: "Tax Planning",
  },
  protection: {
    explanations: {
      green:
        "Your family’s financial protection and estate documents appear to be in good order.",
      yellow:
        "Your family’s financial protection may benefit from a review.",
      red:
        "Let’s strengthen your protection plan — this brings peace of mind for you and your family.",
    },
    recommendation:
      "Update your Will, beneficiaries, and insurance coverage to match your current situation.",
    learnMore: "Protection & Estate Planning",
  },
};

const overallStatusFor = (score: number): string => {
  if (score >= 80) return "Excellent Progress";
  if (score >= 65) return "Strong Foundation";
  if (score >= 50) return "Good Foundation";
  if (score >= 35) return "Let’s Strengthen Your Plan";
  return "A Great Starting Point";
};

export function scoreAssessment(answers: Record<string, number>): AssessmentResult {
  const pillarScores: Record<PillarId, { sum: number; count: number }> = {
    retirement: { sum: 0, count: 0 },
    investments: { sum: 0, count: 0 },
    tax: { sum: 0, count: 0 },
    protection: { sum: 0, count: 0 },
  };

  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (a === undefined) continue;
    pillarScores[q.pillar].sum += a;
    pillarScores[q.pillar].count += 1;
  }

  const pillars: PillarResult[] = (Object.keys(pillarScores) as PillarId[]).map((id) => {
    const { sum, count } = pillarScores[id];
    const score = count ? Math.round(sum / count) : 0;
    const band = bandFor(score);
    const meta = PILLARS[id];
    const copy = pillarCopy[id];
    return {
      id,
      name: meta.name,
      short: meta.short,
      score,
      band,
      status:
        band === "green" ? "Excellent" : band === "yellow" ? "Needs Attention" : "Significant Opportunity",
      explanation: copy.explanations[band],
      recommendation: copy.recommendation,
      learnMore: copy.learnMore,
    };
  });

  const overall = Math.round(
    pillars.reduce((s, p) => s + p.score, 0) / pillars.length
  );
  const overallBand = bandFor(overall);

  // Recommendations: every pillar below green becomes an action item,
  // ordered by severity (red first), capped at 4.
  const recommendations = pillars
    .filter((p) => p.band !== "green")
    .sort((a, b) => (a.band === "red" ? -1 : 1) - (b.band === "red" ? -1 : 1))
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map((p) => ({
      pillar: p.name,
      text: p.recommendation,
      priority: p.band,
    }));

  return {
    overall,
    overallBand,
    overallStatus: overallStatusFor(overall),
    pillars,
    recommendations,
    totalQuestions: QUESTIONS.length,
  };
}
