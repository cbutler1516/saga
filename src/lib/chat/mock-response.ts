import {
  FOUNDRY_ASSESSMENT_CTA,
  FOUNDRY_ASSESSMENT_URL,
} from "./system-prompt";

const ASSESSMENT_SUFFIX = `\n\n${FOUNDRY_ASSESSMENT_CTA} → ${FOUNDRY_ASSESSMENT_URL}`;

function includesAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

export function generateMockResponse(userMessage: string): {
  reply: string;
  suggestAssessment: boolean;
  assessmentUrl: string;
} {
  const message = userMessage.trim();

  if (
    includesAny(message, [
      "could i own",
      "own my own",
      "own a mortgage",
      "go independent",
      "independence",
      "start a broker",
      "start a mortgage",
    ])
  ) {
    return {
      reply: `Many high-producing loan officers and branch managers explore ownership when they want more control over brand, economics, and team structure.

Whether it makes sense depends on your production, timeline, and how much operational infrastructure you want support with — licensing, reporting, audits, and day-to-day compliance are real considerations, but they are manageable with the right structure.${ASSESSMENT_SUFFIX}`,
      suggestAssessment: true,
      assessmentUrl: FOUNDRY_ASSESSMENT_URL,
    };
  }

  if (
    includesAny(message, [
      "hold me back",
      "holding back",
      "obstacle",
      "what stops",
      "barrier",
      "afraid",
      "worried",
    ])
  ) {
    return {
      reply: `Common concerns we hear: compliance and licensing complexity, MCR and HMDA reporting, exam readiness, technology, staffing, cost, and leaving a current company.

These are normal — the question is which matter most for your situation and what support would make ownership feel realistic without pulling you out of production.${ASSESSMENT_SUFFIX}`,
      suggestAssessment: true,
      assessmentUrl: FOUNDRY_ASSESSMENT_URL,
    };
  }

  if (
    includesAny(message, [
      "what does foundry",
      "foundry help",
      "foundry do",
      "your services",
      "what do you offer",
    ])
  ) {
    return {
      reply: `Foundry helps mortgage professionals own the company and keep selling. We stand up and maintain the infrastructure behind independent brokerages:

• Licensing and company launch
• Policies and procedures
• MCR and HMDA reporting
• Compliance control testing
• Exam readiness
• Correspondent preparation

You stay focused on clients and production — we help build and maintain what runs behind the company.`,
      suggestAssessment: false,
      assessmentUrl: FOUNDRY_ASSESSMENT_URL,
    };
  }

  if (
    includesAny(message, [
      "which assessment",
      "what assessment",
      "which path",
      "what path",
      "take the assessment",
    ])
  ) {
    return {
      reply: `Choose based on where you are today:

• **Thinking About Ownership** — high-producing LOs or branch managers wondering if independence is realistic → /assessment/independence

• **Already Own a Brokerage** — owners who want help with compliance, reporting, or operations → /assessment/existing-broker

• **Exploring Correspondent** — owners considering warehouse lines or closing in their own name → /assessment/correspondent

Not sure? Start at /assessment — it takes about two minutes.`,
      suggestAssessment: true,
      assessmentUrl: FOUNDRY_ASSESSMENT_URL,
    };
  }

  if (
    includesAny(message, [
      "mcr",
      "mortgage call report",
      "hmda",
      "licensing",
      "nmls",
      "audit",
      "exam",
      "examination",
      "renewal",
      "correspondent",
      "warehouse",
    ])
  ) {
    return {
      reply: `At a high level, these are core parts of running a mortgage company — not one-time setup tasks.

Foundry helps broker owners maintain reporting (MCR, HMDA), licensing renewals, policies, control testing, and exam readiness so production stays the priority.

I cannot determine your compliance status or legal obligations here — for anything situation-specific, a confidential conversation is the right next step.${ASSESSMENT_SUFFIX}`,
      suggestAssessment: true,
      assessmentUrl: FOUNDRY_ASSESSMENT_URL,
    };
  }

  if (
    includesAny(message, [
      "legal",
      "compliant",
      "compliance determination",
      "guarantee",
      "approved",
      "will i pass",
    ])
  ) {
    return {
      reply: `I cannot provide legal advice, compliance determinations, or guaranteed outcomes for licensing, audits, or investor approval.

Foundry provides advisory infrastructure support — not legal counsel. For your specific situation, the best path is a confidential conversation with our team or completing the short assessment to understand where you stand.${ASSESSMENT_SUFFIX}`,
      suggestAssessment: true,
      assessmentUrl: FOUNDRY_ASSESSMENT_URL,
    };
  }

  return {
    reply: `I'm Foundry Assistant — here to help with questions about mortgage company ownership, compliance infrastructure, and which assessment path fits you.

Ask about independence, what Foundry handles, licensing, reporting, audits, or correspondent readiness. For anything specific to your company, I'll point you toward a confidential conversation.${ASSESSMENT_SUFFIX}`,
    suggestAssessment: true,
    assessmentUrl: FOUNDRY_ASSESSMENT_URL,
  };
}
