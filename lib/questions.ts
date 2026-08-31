// Financial Health Check — assessment question bank & scoring engine
// 16 questions across 4 pillars (4 each). Each answer scores 0 / 50 / 100.

export type PillarId = "retirement" | "investments" | "tax" | "protection";

export interface Pillar {
  id: PillarId;
  name: string;
  short: string;
  icon: string; // emoji used sparingly; primary visuals are SVG
  description: string;
}

export interface Answer {
  label: string;
  score: number; // 0 | 50 | 100
}

export interface Question {
  id: string;
  pillar: PillarId;
  prompt: string;
  answers: Answer[];
}

export const PILLARS: Record<PillarId, Pillar> = {
  retirement: {
    id: "retirement",
    name: "Retirement Planning",
    short: "Retirement",
    icon: "Retirement",
    description: "Are you on track for the retirement you envision?",
  },
  investments: {
    id: "investments",
    name: "Investment Strategy",
    short: "Investments",
    icon: "Investments",
    description: "Is your money working as efficiently as it could?",
  },
  tax: {
    id: "tax",
    name: "Tax Planning",
    short: "Tax Planning",
    icon: "Tax",
    description: "Could you be keeping more of what you earn?",
  },
  protection: {
    id: "protection",
    name: "Protection & Estate",
    short: "Protection",
    icon: "Protection",
    description: "Is your family protected if the unexpected happens?",
  },
};

export const QUESTIONS: Question[] = [
  // ---- Retirement Planning (4) ----
  {
    id: "r1",
    pillar: "retirement",
    prompt: "Do you know how much money you’ll need to retire comfortably?",
    answers: [
      { label: "I have a clear target number", score: 100 },
      { label: "I have a rough idea", score: 50 },
      { label: "Not really sure", score: 0 },
    ],
  },
  {
    id: "r2",
    pillar: "retirement",
    prompt: "Are you currently on track to reach your retirement goal?",
    answers: [
      { label: "Yes, I’ve reviewed projections recently", score: 100 },
      { label: "I think so, but haven’t checked lately", score: 50 },
      { label: "I don’t know where I stand", score: 0 },
    ],
  },
  {
    id: "r3",
    pillar: "retirement",
    prompt: "Have you reviewed when to start your CPP (Canada Pension Plan)?",
    answers: [
      { label: "Yes, I have a planned timing strategy", score: 100 },
      { label: "I know CPP exists but haven’t planned the timing", score: 50 },
      { label: "I haven’t looked into CPP timing", score: 0 },
    ],
  },
  {
    id: "r4",
    pillar: "retirement",
    prompt: "Do you know your target retirement income (monthly or yearly)?",
    answers: [
      { label: "Yes, I have a specific income target", score: 100 },
      { label: "A ballpark, but not detailed", score: 50 },
      { label: "I haven’t set an income target", score: 0 },
    ],
  },

  // ---- Investment Strategy (4) ----
  {
    id: "i1",
    pillar: "investments",
    prompt: "Do you know your investment risk score / risk tolerance?",
    answers: [
      { label: "Yes, it’s been formally assessed", score: 100 },
      { label: "I have a general sense", score: 50 },
      { label: "I’m not sure what my risk tolerance is", score: 0 },
    ],
  },
  {
    id: "i2",
    pillar: "investments",
    prompt: "Do you know what fees you’re paying on your investments?",
    answers: [
      { label: "Yes, I know my fees and review them", score: 100 },
      { label: "I know fees exist but not the exact amount", score: 50 },
      { label: "I’m not sure what I’m paying", score: 0 },
    ],
  },
  {
    id: "i3",
    pillar: "investments",
    prompt: "If the market dropped 20% this year, would you stay invested?",
    answers: [
      { label: "Yes, I’d hold to my plan", score: 100 },
      { label: "I’d be tempted to sell some", score: 50 },
      { label: "I’d likely sell to stop the losses", score: 0 },
    ],
  },
  {
    id: "i4",
    pillar: "investments",
    prompt: "Are your investments diversified across asset classes?",
    answers: [
      { label: "Yes, across many asset classes and regions", score: 100 },
      { label: "Somewhat — a few different holdings", score: 50 },
      { label: "I’m not sure about my diversification", score: 0 },
    ],
  },

  // ---- Tax Planning (4) ----
  {
    id: "t1",
    pillar: "tax",
    prompt: "Do you know your current marginal tax bracket?",
    answers: [
      { label: "Yes, I know my bracket", score: 100 },
      { label: "I have a rough idea", score: 50 },
      { label: "I don’t know my tax bracket", score: 0 },
    ],
  },
  {
    id: "t2",
    pillar: "tax",
    prompt: "Are you maximizing your TFSA contributions each year?",
    answers: [
      { label: "Yes, I contribute the full amount", score: 100 },
      { label: "I contribute when I can", score: 50 },
      { label: "I don’t contribute to a TFSA", score: 0 },
    ],
  },
  {
    id: "t3",
    pillar: "tax",
    prompt: "Do you know whether RRSP or TFSA contributions are better for you?",
    answers: [
      { label: "Yes, I’ve compared them for my situation", score: 100 },
      { label: "I use one but haven’t compared", score: 50 },
      { label: "I’m not sure which is better", score: 0 },
    ],
  },
  {
    id: "t4",
    pillar: "tax",
    prompt: "Have you reviewed tax-saving strategies in the past year?",
    answers: [
      { label: "Yes, within the last year", score: 100 },
      { label: "It’s been more than a year", score: 50 },
      { label: "I’ve never done a tax review", score: 0 },
    ],
  },

  // ---- Protection & Estate Planning (4) ----
  {
    id: "p1",
    pillar: "protection",
    prompt: "Do you have an up-to-date Will?",
    answers: [
      { label: "Yes, and it’s current", score: 100 },
      { label: "I have one, but it may be outdated", score: 50 },
      { label: "I don’t have a Will", score: 0 },
    ],
  },
  {
    id: "p2",
    pillar: "protection",
    prompt: "Do you have Powers of Attorney (financial & personal care)?",
    answers: [
      { label: "Yes, both are in place", score: 100 },
      { label: "I have one but not both", score: 50 },
      { label: "I don’t have Powers of Attorney", score: 0 },
    ],
  },
  {
    id: "p3",
    pillar: "protection",
    prompt: "Do you have enough life insurance to protect your family?",
    answers: [
      { label: "Yes, I’ve reviewed my coverage needs", score: 100 },
      { label: "I have some, but haven’t checked if it’s enough", score: 50 },
      { label: "I don’t have life insurance", score: 0 },
    ],
  },
  {
    id: "p4",
    pillar: "protection",
    prompt: "Do you have an emergency fund and updated beneficiaries?",
    answers: [
      { label: "Yes to both", score: 100 },
      { label: "One of the two is in place", score: 50 },
      { label: "Neither is set up yet", score: 0 },
    ],
  },
];
