export type AssessmentId =
  | "independence"
  | "existing-broker"
  | "correspondent";

export type QuestionOption = {
  value: string;
  label: string;
  score: number;
};

export type AssessmentQuestion = {
  id: string;
  question: string;
  helperText?: string;
  options: QuestionOption[];
  allowMultiple?: boolean;
  maxQuestionScore?: number;
};

export type SnapshotTier = {
  minScore: number;
  maxScore: number;
  label: string;
  headline: string;
  summary: string;
  strengths: string[];
  focusAreas: string[];
  priorityActions: string[];
  nextSteps: string[];
  roadmap: {
    day30: string[];
    day60: string[];
    day90: string[];
    longTerm: string[];
  };
};

export type AssessmentDefinition = {
  id: AssessmentId;
  slug: string;
  cardTitle: string;
  cardDescription: string;
  pageTitle: string;
  pageDescription: string;
  scoreLabel: string;
  blueprintTitle: string;
  deliverableName: string;
  ctaLabel: string;
  estimatedMinutes: number;
  outcomes: string[];
  questions: AssessmentQuestion[];
  tiers: SnapshotTier[];
  maxScore: number;
};

function sumMaxScore(questions: AssessmentQuestion[]): number {
  return questions.reduce((total, q) => {
    if (q.maxQuestionScore != null) return total + q.maxQuestionScore;
    return total + Math.max(...q.options.map((o) => o.score));
  }, 0);
}

function scoreQuestion(
  question: AssessmentQuestion,
  answer: string | undefined,
): number {
  if (!answer) return 0;

  if (question.allowMultiple) {
    const selected = answer.split(",").filter(Boolean);
    if (selected.length === 0) return 0;

    if (question.id === "holding-back") {
      return Math.max(1, 5 - selected.length);
    }

    const sum = selected.reduce((acc, value) => {
      const option = question.options.find((o) => o.value === value);
      return acc + (option?.score ?? 0);
    }, 0);

    return question.maxQuestionScore != null
      ? Math.min(question.maxQuestionScore, sum)
      : sum;
  }

  const option = question.options.find((o) => o.value === answer);
  return option?.score ?? 0;
}

export const assessmentLanding = {
  title: "Could you own your own mortgage company?",
  subtitle:
    "Answer a few questions and we'll help you understand what's realistic, what might slow you down, and what your best next step should be.",
  supportLine: "Takes about 2 minutes. Confidential. No pressure.",
};

export const assessments: Record<AssessmentId, AssessmentDefinition> = {
  independence: {
    id: "independence",
    slug: "independence",
    cardTitle: "Thinking About Ownership",
    cardDescription:
      "For high-producing LOs or branch managers wondering if independence is realistic.",
    pageTitle: "Thinking About Ownership",
    pageDescription:
      "A few quick questions to help you understand whether owning your own mortgage company is realistic for you.",
    scoreLabel: "Ownership readiness",
    blueprintTitle: "Ownership Summary",
    deliverableName: "Your Ownership Summary",
    ctaLabel: "Find Out If I'm Ready",
    estimatedMinutes: 2,
    outcomes: ["Plain-language summary", "Suggested next step"],
    questions: [
      {
        id: "role",
        question: "What best describes you right now?",
        options: [
          { value: "loan-officer", label: "Loan Officer", score: 2 },
          { value: "branch-manager", label: "Branch Manager", score: 3 },
          { value: "team-leader", label: "Team Leader", score: 3 },
          { value: "broker-owner", label: "Broker Owner", score: 4 },
          { value: "other", label: "Other", score: 1 },
        ],
      },
      {
        id: "volume",
        question: "About how much business do you produce each year?",
        options: [
          { value: "under-15m", label: "Under $15M", score: 1 },
          { value: "15-30m", label: "$15M–$30M", score: 2 },
          { value: "30-75m", label: "$30M–$75M", score: 3 },
          { value: "75-150m", label: "$75M–$150M", score: 4 },
          { value: "150-plus", label: "$150M+", score: 4 },
        ],
      },
      {
        id: "ownership-interest",
        question: "How often have you thought about owning your own company?",
        options: [
          { value: "rarely", label: "Rarely, but I'm curious", score: 1 },
          { value: "occasionally", label: "Occasionally", score: 2 },
          { value: "frequently", label: "Frequently", score: 3 },
          { value: "actively", label: "I'm actively planning", score: 4 },
          { value: "entity", label: "I already have an entity or plan", score: 4 },
        ],
      },
      {
        id: "holding-back",
        question: "What's holding you back?",
        helperText: "Select all that apply.",
        allowMultiple: true,
        maxQuestionScore: 4,
        options: [
          { value: "compliance", label: "Compliance", score: 0 },
          { value: "licensing", label: "Licensing", score: 0 },
          { value: "audits", label: "Audits/exams", score: 0 },
          { value: "mcr", label: "Mortgage Call Reports", score: 0 },
          { value: "hmda", label: "HMDA/reporting", score: 0 },
          { value: "technology", label: "Technology", score: 0 },
          { value: "staffing", label: "Staffing", score: 0 },
          { value: "cost", label: "Cost", score: 0 },
          { value: "leaving", label: "Leaving my current company", score: 0 },
          { value: "start", label: "I don't know where to start", score: 0 },
        ],
      },
      {
        id: "want-ownership",
        question:
          "If those obstacles were handled, would you want to own your own company?",
        options: [
          { value: "yes", label: "Yes", score: 4 },
          { value: "probably", label: "Probably", score: 3 },
          { value: "maybe", label: "Maybe", score: 2 },
          { value: "not-sure", label: "Not sure yet", score: 1 },
        ],
      },
      {
        id: "timeline",
        question: "What timeline feels realistic?",
        options: [
          { value: "asap", label: "ASAP", score: 4 },
          { value: "0-3", label: "0–3 months", score: 4 },
          { value: "3-6", label: "3–6 months", score: 3 },
          { value: "6-12", label: "6–12 months", score: 2 },
          { value: "researching", label: "Just researching", score: 1 },
        ],
      },
      {
        id: "focus-time",
        question: "What would you want to spend more time doing?",
        options: [
          { value: "originating", label: "Originating loans", score: 3 },
          { value: "realtors", label: "Building realtor relationships", score: 3 },
          { value: "leading", label: "Leading a team", score: 3 },
          { value: "brand", label: "Growing a brand", score: 3 },
          { value: "operations", label: "Improving operations", score: 2 },
          { value: "correspondent", label: "Exploring correspondent lending", score: 3 },
        ],
      },
    ],
    tiers: [
      {
        minScore: 0,
        maxScore: 11,
        label: "Foundation first",
        headline:
          "Ownership may still be possible, but the foundation matters first.",
        summary:
          "You're asking the right question. Based on your answers, there are a few practical pieces to understand before ownership would feel realistic — and that's normal.",
        strengths: [
          "You're exploring ownership before making a rushed move",
          "You have time to build the right structure",
        ],
        focusAreas: [
          "Understanding licensing and company setup",
          "Clarifying what operating support you'd need",
          "Mapping a realistic timeline",
          "Separating production goals from back-office burden",
        ],
        priorityActions: [
          "Talk through your production and state footprint",
          "Identify which obstacles matter most for your situation",
          "Outline what ownership would actually change day to day",
        ],
        nextSteps: [
          "Have a confidential conversation about your options",
          "Review what standing up a company would require in your states",
          "Decide whether to keep exploring or pause for now",
        ],
        roadmap: {
          day30: [
            "Clarify your production, team, and target states",
            "List the obstacles that matter most to you",
            "Understand entity and licensing basics for your situation",
          ],
          day60: [
            "Compare ownership economics to your current structure",
            "Identify operating support options",
            "Set a realistic decision timeline",
          ],
          day90: [
            "Decide whether to move forward, wait, or keep researching",
            "If moving forward, begin licensing and setup planning",
            "Keep production stable while planning the transition",
          ],
          longTerm: [
            "Build a company designed around how you want to sell",
            "Keep compliance and operations off your daily plate",
            "Grow with structure instead of chaos",
          ],
        },
      },
      {
        minScore: 12,
        maxScore: 19,
        label: "Path with gaps",
        headline: "You have a path — but a few pieces need attention.",
        summary:
          "Ownership looks realistic for someone in your position. The main question is which operational and regulatory pieces need support so you can keep selling while the company runs properly.",
        strengths: [
          "Your production and interest suggest ownership is worth exploring",
          "You have a clearer sense of what you want from the business",
        ],
        focusAreas: [
          "Licensing and company setup across your target states",
          "Reporting, oversight, and ongoing operational support",
          "Transition timing without disrupting production",
          "Building the right team and vendor structure",
        ],
        priorityActions: [
          "Map licensing requirements in your primary states",
          "Identify which back-office items you'd want handled for you",
          "Build a transition plan that keeps you in production",
        ],
        nextSteps: [
          "Talk through your timeline and state footprint",
          "Review what standing up would look like for your volume",
          "Decide your first 30-day move toward ownership",
        ],
        roadmap: {
          day30: [
            "Confirm target entity structure and ownership model",
            "Prioritize states based on where you produce",
            "Identify operating support for licensing and reporting",
          ],
          day60: [
            "Begin company licensing and core policy setup",
            "Plan lender and referral partner transition",
            "Keep a clear line between selling and back-office work",
          ],
          day90: [
            "Move toward launch with operational support in place",
            "Validate reporting and oversight processes",
            "Prepare for independent production with confidence",
          ],
          longTerm: [
            "Operate with ongoing support behind the scenes",
            "Grow production, team, and brand on your terms",
            "Evaluate correspondent readiness when the time is right",
          ],
        },
      },
      {
        minScore: 20,
        maxScore: 28,
        label: "Closer than you think",
        headline: "You may be closer than you think.",
        summary:
          "Your answers suggest you're serious about ownership and well-positioned to explore it. The next step is understanding exactly what standing up and running the company would look like for you.",
        strengths: [
          "Strong production and clear ownership interest",
          "Realistic timeline and motivation to move forward",
          "You want to keep selling — not become a full-time operator",
        ],
        focusAreas: [
          "Executing licensing and launch in the right order",
          "Standing up reporting and oversight without slowing production",
          "Transitioning relationships and operations smoothly",
        ],
        priorityActions: [
          "Confirm licensing path across target states",
          "Line up operating support before you launch",
          "Set a transition date that protects your pipeline",
        ],
        nextSteps: [
          "Talk through launch timing and state footprint",
          "Review what Foundry would handle vs. what stays with you",
          "Move toward a concrete 30-day action plan",
        ],
        roadmap: {
          day30: [
            "Confirm licensing status and launch sequence",
            "Finalize operating support and vendor plan",
            "Protect active pipeline during transition planning",
          ],
          day60: [
            "Stand up core policies, reporting, and oversight",
            "Transition lender and referral relationships",
            "Keep you focused on production and leadership",
          ],
          day90: [
            "Launch or complete transition with support in place",
            "Validate that back-office runs without consuming your time",
            "Plan next phase of growth",
          ],
          longTerm: [
            "Own the company and keep selling",
            "Build enterprise value with proper structure",
            "Expand states, team, or channel when ready",
          ],
        },
      },
    ],
    maxScore: 0,
  },

  "existing-broker": {
    id: "existing-broker",
    slug: "existing-broker",
    cardTitle: "Already Own a Brokerage",
    cardDescription:
      "For owners who want help with compliance, reporting, operations, or growth.",
    pageTitle: "Already Own a Brokerage",
    pageDescription:
      "A few questions about your company — so we can understand what's working and what could run better behind the scenes.",
    scoreLabel: "Operating readiness",
    blueprintTitle: "Brokerage Summary",
    deliverableName: "Your Brokerage Summary",
    ctaLabel: "Check My Setup",
    estimatedMinutes: 2,
    outcomes: ["Plain-language summary", "Suggested next step"],
    questions: [
      {
        id: "tenure",
        question: "How long have you been running your own brokerage?",
        options: [
          { value: "under-1", label: "Less than 1 year", score: 2 },
          { value: "1-3", label: "1 to 3 years", score: 3 },
          { value: "3-7", label: "3 to 7 years", score: 3 },
          { value: "7-plus", label: "More than 7 years", score: 4 },
        ],
      },
      {
        id: "lo-count",
        question: "About how many loan officers work with you?",
        options: [
          { value: "1-3", label: "1 to 3 LOs", score: 2 },
          { value: "4-10", label: "4 to 10 LOs", score: 3 },
          { value: "11-25", label: "11 to 25 LOs", score: 3 },
          { value: "25-plus", label: "More than 25 LOs", score: 4 },
        ],
      },
      {
        id: "help-needed",
        question: "What would help most right now?",
        options: [
          { value: "sell-more", label: "More time to sell and lead", score: 3 },
          { value: "compliance", label: "Compliance and oversight support", score: 3 },
          { value: "reporting", label: "Reporting (MCR/HMDA) handled properly", score: 3 },
          { value: "operations", label: "Stronger day-to-day operations", score: 3 },
          { value: "growth", label: "Support for growth or new states", score: 4 },
          { value: "correspondent", label: "Preparing for correspondent lending", score: 4 },
        ],
      },
      {
        id: "hmda-mcr",
        question: "How are Mortgage Call Reports and HMDA handled today?",
        options: [
          { value: "scramble", label: "Last-minute — stressful every time", score: 1 },
          { value: "manual", label: "Manual — pulled together from different places", score: 2 },
          { value: "process", label: "Defined process with clear ownership", score: 3 },
          { value: "integrated", label: "Handled smoothly as part of normal operations", score: 4 },
        ],
      },
      {
        id: "compliance-resources",
        question: "Who handles compliance oversight today?",
        options: [
          { value: "owner", label: "Mostly me or ownership", score: 1 },
          { value: "part-time", label: "Part-time or shared responsibility", score: 2 },
          { value: "dedicated", label: "One dedicated person", score: 3 },
          { value: "partner", label: "Compliance partner or team", score: 4 },
        ],
      },
      {
        id: "expansion-plans",
        question: "What are you hoping to do next?",
        options: [
          { value: "maintain", label: "Keep things running smoothly", score: 2 },
          { value: "states", label: "Add new states", score: 3 },
          { value: "los", label: "Recruit LOs or open branches", score: 3 },
          { value: "correspondent", label: "Move toward correspondent lending", score: 4 },
        ],
      },
    ],
    tiers: [
      {
        minScore: 0,
        maxScore: 10,
        label: "Needs attention",
        headline:
          "Ownership may still be possible, but the foundation matters first.",
        summary:
          "You're running a company — which means a lot is already on your shoulders. Your answers suggest a few back-office areas could use structure so you can focus on production and growth.",
        strengths: [
          "You're already operating as an owner",
          "You know where the pain points are",
        ],
        focusAreas: [
          "Written compliance management system",
          "Compliance control testing program",
          "Regulatory reporting process and ownership",
          "Exam readiness documentation and evidence trail",
        ],
        priorityActions: [
          "Conduct a formal compliance gap assessment",
          "Prioritize CMS and policy documentation",
          "Establish a regular control testing cadence",
        ],
        nextSteps: [
          "Audit current policies against regulatory requirements",
          "Assign ownership for MCR and HMDA reporting",
          "Organize exam evidence by control area",
        ],
        roadmap: {
          day30: [
            "Inventory existing policies and identify gaps",
            "Document current reporting and testing processes",
            "Assign compliance ownership and accountability",
          ],
          day60: [
            "Implement written CMS with defined processes",
            "Begin structured control testing on high-risk areas",
            "Establish regulatory reporting calendar",
          ],
          day90: [
            "Complete first full testing cycle with documented exceptions",
            "Organize exam evidence package by control area",
            "Conduct internal readiness review",
          ],
          longTerm: [
            "Maintain continuous compliance monitoring",
            "Scale infrastructure with growth plans",
            "Reduce examination risk through ongoing evidence maintenance",
          ],
        },
      },
      {
        minScore: 11,
        maxScore: 17,
        label: "Room to strengthen",
        headline: "You have a path — but a few pieces need attention.",
        summary:
          "You have pieces of a solid operation in place. The opportunity is making reporting, oversight, and day-to-day support more consistent — so growth doesn't add chaos.",
        strengths: [
          "Existing production and operating experience",
          "Clear sense of what would help most",
        ],
        focusAreas: [
          "Continuous compliance control testing",
          "HMDA and MCR reporting integration",
          "Policy currency and regulatory change management",
          "Exam evidence organization and retrieval",
        ],
        priorityActions: [
          "Audit policies against current regulatory requirements",
          "Implement structured testing with documented exceptions",
          "Integrate reporting from daily operational systems",
        ],
        nextSteps: [
          "Stress-test exam readiness with a mock documentation review",
          "Automate exception tracking where possible",
          "Plan compliance scaling for anticipated growth",
        ],
        roadmap: {
          day30: [
            "Review policy library for currency and completeness",
            "Map reporting data sources and ownership",
            "Identify highest-risk control areas for testing priority",
          ],
          day60: [
            "Implement continuous testing on priority controls",
            "Streamline MCR and HMDA preparation workflow",
            "Update CMS documentation to reflect current operations",
          ],
          day90: [
            "Complete mock exam documentation review",
            "Address identified gaps with corrective action plans",
            "Align compliance capacity with expansion plans",
          ],
          longTerm: [
            "Optimize compliance operations for scale",
            "Maintain exam-ready posture continuously",
            "Evaluate correspondent readiness when appropriate",
          ],
        },
      },
      {
        minScore: 18,
        maxScore: 24,
        label: "Running well",
        headline: "You may be closer than you think.",
        summary:
          "Your operation appears structurally sound. The opportunity may be optimization — reducing manual burden and making sure the company can scale without pulling you out of production.",
        strengths: [
          "Mature operating foundation",
          "Ready to optimize or expand with support",
        ],
        focusAreas: [
          "Automating control testing and exception tracking",
          "Scaling compliance infrastructure with growth",
          "Vendor and third-party oversight",
          "Continuous exam readiness maintenance",
        ],
        priorityActions: [
          "Evaluate automation opportunities in testing and reporting",
          "Stress-test exam readiness with mock documentation review",
          "Plan compliance scaling for anticipated expansion",
        ],
        nextSteps: [
          "Confirm compliance program supports expansion plans",
          "Review vendor oversight and third-party risk management",
          "Maintain continuous evidence trail for examinations",
        ],
        roadmap: {
          day30: [
            "Benchmark current program against expansion requirements",
            "Identify automation opportunities in testing workflow",
            "Review vendor and LO oversight processes",
          ],
          day60: [
            "Implement efficiency improvements in reporting",
            "Validate compliance capacity for new states or LOs",
            "Update risk assessment for growth scenarios",
          ],
          day90: [
            "Conduct comprehensive mock examination review",
            "Document scaling plan for compliance infrastructure",
            "Evaluate correspondent channel readiness if applicable",
          ],
          longTerm: [
            "Maintain institutional-grade compliance operation",
            "Scale without compromising examination readiness",
            "Build enterprise value through owned compliance infrastructure",
          ],
        },
      },
    ],
    maxScore: 0,
  },

  correspondent: {
    id: "correspondent",
    slug: "correspondent",
    cardTitle: "Exploring Correspondent",
    cardDescription:
      "For broker owners considering warehouse lines, investor approval, or closing in their own name.",
    pageTitle: "Exploring Correspondent",
    pageDescription:
      "A few questions about your goals first — then what it would take to move toward correspondent lending.",
    scoreLabel: "Correspondent readiness",
    blueprintTitle: "Correspondent Summary",
    deliverableName: "Your Correspondent Summary",
    ctaLabel: "Check Correspondent Readiness",
    estimatedMinutes: 2,
    outcomes: ["Plain-language summary", "Suggested next step"],
    questions: [
      {
        id: "why-correspondent",
        question: "Why are you interested in correspondent lending?",
        options: [
          { value: "margin", label: "Keep more margin on each loan", score: 3 },
          { value: "control", label: "More control over the process", score: 3 },
          { value: "brand", label: "Close in my company's name", score: 3 },
          { value: "scale", label: "Build a larger lending operation", score: 4 },
          { value: "exploring", label: "Just exploring what it would take", score: 2 },
        ],
      },
      {
        id: "own-name",
        question: "What would closing in your own name mean for your business?",
        options: [
          { value: "economics", label: "Better economics on every loan", score: 3 },
          { value: "experience", label: "A better client and partner experience", score: 3 },
          { value: "enterprise", label: "More enterprise value long term", score: 4 },
          { value: "unsure", label: "Still figuring that out", score: 1 },
        ],
      },
      {
        id: "annual-volume",
        question: "About how much do you fund or close each year today?",
        options: [
          { value: "under-12m", label: "Under $12 million", score: 1 },
          { value: "12-36m", label: "$12 to $36 million", score: 2 },
          { value: "36-84m", label: "$36 to $84 million", score: 3 },
          { value: "84-plus", label: "Over $84 million", score: 4 },
        ],
      },
      {
        id: "current-channel",
        question: "How do you operate today?",
        options: [
          { value: "broker-only", label: "Broker only — no funded loans", score: 1 },
          { value: "mini-corr", label: "Some limited correspondent experience", score: 2 },
          { value: "mixed", label: "Mix of broker and correspondent", score: 3 },
          { value: "correspondent", label: "Mostly correspondent already", score: 4 },
        ],
      },
      {
        id: "warehouse",
        question: "Do you have warehouse lender relationships today?",
        options: [
          { value: "none", label: "Not yet", score: 1 },
          { value: "exploring", label: "Exploring options", score: 2 },
          { value: "one", label: "One active relationship", score: 3 },
          { value: "multiple", label: "Multiple relationships", score: 4 },
        ],
      },
      {
        id: "timeline",
        question: "When would you ideally like to be correspondent-ready?",
        options: [
          { value: "researching", label: "Just researching", score: 1 },
          { value: "12-plus", label: "More than 12 months out", score: 2 },
          { value: "6-12", label: "6 to 12 months", score: 3 },
          { value: "under-6", label: "Within 6 months", score: 4 },
        ],
      },
    ],
    tiers: [
      {
        minScore: 0,
        maxScore: 10,
        label: "Build the foundation",
        headline:
          "Ownership may still be possible, but the foundation matters first.",
        summary:
          "Correspondent lending is a meaningful step up. Your answers suggest strengthening the broker operation first will make warehouse and investor conversations much smoother later.",
        strengths: [
          "You're exploring correspondent for the right reasons",
          "Better to prepare early than rush approval conversations",
        ],
        focusAreas: [
          "Written quality control plan development",
          "Compliance program maturity and CMS documentation",
          "Control testing and exception management",
          "Financial and operational readiness documentation",
        ],
        priorityActions: [
          "Strengthen broker compliance program to exam-ready standard",
          "Develop or formalize a written QC plan",
          "Document financial strength and operational capacity",
        ],
        nextSteps: [
          "Complete compliance gap assessment against correspondent requirements",
          "Research warehouse due diligence requirements generically",
          "Build seller approval documentation proactively",
        ],
        roadmap: {
          day30: [
            "Assess compliance program against correspondent standards",
            "Draft or formalize written QC plan",
            "Gather financial statements and operational documentation",
          ],
          day60: [
            "Implement QC testing with documented results",
            "Complete control testing on broker operations",
            "Identify specific correspondent compliance gaps",
          ],
          day90: [
            "Assemble preliminary seller approval package",
            "Conduct internal readiness review",
            "Research warehouse lender requirements generically",
          ],
          longTerm: [
            "Achieve exam-ready broker compliance posture",
            "Pursue warehouse relationships when foundation is solid",
            "Scale funded volume with ongoing QC and compliance monitoring",
          ],
        },
      },
      {
        minScore: 11,
        maxScore: 17,
        label: "Preparation underway",
        headline: "You have a path — but a few pieces need attention.",
        summary:
          "You're moving in the right direction. Correspondent entry usually requires tighter documentation, QC, and operational readiness — but those are solvable with the right support.",
        strengths: [
          "Clear goals for correspondent lending",
          "Broker operation with room to strengthen",
        ],
        focusAreas: [
          "QC plan implementation and documented results",
          "Seller approval documentation package",
          "Financial and operational readiness",
          "Compliance certifications and representations",
        ],
        priorityActions: [
          "Finalize QC plan and begin documented testing cycles",
          "Assemble seller approval documentation proactively",
          "Validate financial documentation meets typical due diligence standards",
        ],
        nextSteps: [
          "Review seller documentation against typical warehouse requirements",
          "Identify compliance gaps specific to correspondent channel",
          "Plan operational capacity for funded loan volume",
        ],
        roadmap: {
          day30: [
            "Finalize QC plan and begin testing cycles",
            "Update seller approval documentation package",
            "Validate net worth and financial statement readiness",
          ],
          day60: [
            "Complete documented QC results for review period",
            "Conduct compliance certification readiness review",
            "Evaluate warehouse lender options generically",
          ],
          day90: [
            "Submit preliminary applications where appropriate",
            "Address due diligence findings proactively",
            "Plan operational scaling for funded volume",
          ],
          longTerm: [
            "Establish warehouse relationship when approved",
            "Maintain QC and compliance at higher funded volume",
            "Expand correspondent footprint as operation matures",
          ],
        },
      },
      {
        minScore: 18,
        maxScore: 24,
        label: "Well positioned",
        headline: "You may be closer than you think.",
        summary:
          "Your answers suggest you may be ready to explore warehouse and investor conversations. Approval is never guaranteed — but your foundation aligns with what those processes typically look for.",
        strengths: [
          "Strong motivation and operating experience",
          "Realistic timeline for correspondent readiness",
        ],
        focusAreas: [
          "Seller approval documentation refinement",
          "Warehouse relationship evaluation and comparison",
          "Operational scaling for funded volume",
          "Ongoing QC and compliance monitoring at higher volume",
        ],
        priorityActions: [
          "Review and update seller approval documentation",
          "Engage warehouse lenders to understand specific requirements",
          "Confirm operational capacity for funded volume targets",
        ],
        nextSteps: [
          "Submit or refresh warehouse applications",
          "Plan operational capacity for funded loan volume",
          "Maintain continuous QC and compliance monitoring",
        ],
        roadmap: {
          day30: [
            "Refresh seller approval documentation package",
            "Identify target warehouse lenders for comparison",
            "Validate operational capacity for volume goals",
          ],
          day60: [
            "Engage warehouse lenders with complete documentation",
            "Address due diligence requests promptly",
            "Prepare team for funded loan operations",
          ],
          day90: [
            "Execute warehouse onboarding if approved",
            "Begin funded closings with full QC oversight",
            "Monitor compliance at higher operational complexity",
          ],
          longTerm: [
            "Scale correspondent volume with maintained QC rigor",
            "Diversify warehouse relationships for resilience",
            "Build enterprise value through owned lending operations",
          ],
        },
      },
    ],
    maxScore: 0,
  },
};

for (const id of Object.keys(assessments) as AssessmentId[]) {
  assessments[id].maxScore = sumMaxScore(assessments[id].questions);
}

export function getAssessment(id: AssessmentId): AssessmentDefinition {
  return assessments[id];
}

export function getAssessmentList(): AssessmentDefinition[] {
  return [
    assessments.independence,
    assessments["existing-broker"],
    assessments.correspondent,
  ];
}

export type AssessmentAnswers = Record<string, string>;

export function scoreAssessment(
  config: AssessmentDefinition,
  answers: AssessmentAnswers,
): number {
  return config.questions.reduce(
    (total, question) => total + scoreQuestion(question, answers[question.id]),
    0,
  );
}

export function getSnapshotTier(
  config: AssessmentDefinition,
  score: number,
): SnapshotTier {
  const tier =
    config.tiers.find(
      (t) => score >= t.minScore && score <= t.maxScore,
    ) ?? config.tiers[config.tiers.length - 1];
  return tier;
}

export function getAnsweredCount(
  config: AssessmentDefinition,
  answers: AssessmentAnswers,
): number {
  return config.questions.filter((q) => answers[q.id]).length;
}
