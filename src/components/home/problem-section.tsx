"use client";



import { realityIntro, realityItems } from "@/lib/site-content";

import {

  Container,

  FadeIn,

  Section,

  SectionHeading,

  SectionLabel,

} from "@/components/ui/section";



export function ProblemSection() {

  return (

    <Section className="border-t border-white/[0.06] bg-[#050505]">

      <Container>

        <FadeIn className="mx-auto max-w-3xl text-center">

          <SectionLabel>{realityIntro.label}</SectionLabel>

          <SectionHeading className="mt-6">

            {realityIntro.headline}

          </SectionHeading>

          <p className="mt-6 text-lg leading-relaxed text-zinc-400">

            {realityIntro.body}

          </p>

        </FadeIn>



        <FadeIn delay={0.08} className="mx-auto mt-16 max-w-2xl">

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-4">

            {realityItems.map((item) => (

              <div

                key={item}

                className="bg-[#101010] px-4 py-5 text-center text-xs font-medium tracking-wide text-zinc-400"

              >

                {item}

              </div>

            ))}

          </div>

        </FadeIn>

      </Container>

    </Section>

  );

}


