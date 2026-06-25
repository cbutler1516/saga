"use client";

import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";

const pillars = [
  {
    title: "Licensing",
    description:
      "Entity formation, NMLS registration, and state licensing — managed end to end so you can originate in the states that matter.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400">
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-violet-500/20 to-violet-500/5",
  },
  {
    title: "Compliance Infrastructure",
    description:
      "Policies, procedures, compliance management systems, and control testing — built and maintained so you never wonder if you're covered.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-400">
        <path
          d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    title: "Regulatory Reporting",
    description:
      "MCR, HMDA, and state reporting handled on schedule — with documentation and audit trails that hold up under review.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-400">
        <path
          d="M9 17H15M9 13H15M9 9H12M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Exam Readiness",
    description:
      "Evidence packages, control documentation, and ongoing monitoring — so when an examiner arrives, you're ready.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
        <path
          d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Correspondent Preparation",
    description:
      "QC plans, seller documentation, and operational readiness — structured so you can pursue correspondent relationships with confidence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-400">
        <path
          d="M3 17L9 11L13 15L21 7M21 7H15M21 7V13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-amber-500/20 to-amber-500/5",
  },
];

export function PlatformSection() {
  return (
    <Section className="border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FF6A00]/5 via-transparent to-transparent" />
      <Container className="relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>What we build and run</SectionLabel>
          <SectionHeading className="mt-6">
            The compliance infrastructure{" "}
            <span className="text-gradient-accent">independence requires.</span>
          </SectionHeading>
          <p className="mt-6 text-lg text-zinc-400">
            Not a patchwork of vendors and consultants. Licensing, compliance
            infrastructure, reporting, exam readiness, and correspondent
            preparation — handled as one integrated backbone.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass-card glass-card-hover p-8">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {pillar.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#FF6A00] opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
