export type LibraryCollectionId =
  | "starting"
  | "compliance"
  | "growth"
  | "technology";

export type LibraryCollection = {
  id: LibraryCollectionId;
  title: string;
  description: string;
};

export type LibraryArticle = {
  slug: string;
  collectionId: LibraryCollectionId;
  title: string;
  description: string;
  readTime: string;
  eyebrow: string;
  pullQuote: string;
  executiveSummary: string[];
  mainContent: Array<{
    heading: string;
    body: string[];
  }>;
  practicalChecklist: string[];
  commonMistakes: string[];
  relatedSlugs: string[];
  nextStep: {
    title: string;
    body: string;
  };
};

export const libraryCollections: LibraryCollection[] = [
  {
    id: "starting",
    title: "Starting Your Mortgage Company",
    description:
      "Ownership economics, startup sequencing, licensing considerations, and the questions every experienced producer should answer first.",
  },
  {
    id: "compliance",
    title: "Compliance & Operations",
    description:
      "The operating infrastructure behind a durable mortgage company: policies, reporting, oversight, exams, and evidence.",
  },
  {
    id: "growth",
    title: "Growth & Leadership",
    description:
      "How owners think about teams, states, correspondent readiness, operating capacity, and long-term enterprise value.",
  },
  {
    id: "technology",
    title: "Technology & AI",
    description:
      "Practical guidance on systems, automation, responsible AI, and the modern workspace behind a serious mortgage company.",
  },
];

export const libraryArticles: LibraryArticle[] = [
  {
    slug: "is-ownership-realistic-for-a-high-producing-lo",
    collectionId: "starting",
    eyebrow: "Ownership Decision",
    title: "Is Ownership Realistic for a High-Producing Loan Officer?",
    description:
      "A practical framework for deciding whether mortgage company ownership is a real option, a future option, or a distraction.",
    readTime: "6 min read",
    pullQuote:
      "The question is not just whether you can sell. It is whether the company behind you can operate properly while you keep selling.",
    executiveSummary: [
      "High production can make ownership financially attractive, but production alone does not make a company durable.",
      "The strongest candidates understand their volume, referral base, transition risk, operating support needs, and appetite for responsibility.",
      "Ownership becomes more realistic when the operational side can be structured before it becomes a drag on production.",
    ],
    mainContent: [
      {
        heading: "Start with the economics, not the logo",
        body: [
          "Many producers begin ownership thinking with a brand, office, or entity. The more useful starting point is the economics: loan count, volume, margin opportunity, fixed costs, compliance costs, and the support required to operate responsibly.",
          "A strong producer may still decide not to own. That can be a good decision. The goal is not to romanticize ownership; it is to understand whether the upside is real after the operating burden is accounted for.",
        ],
      },
      {
        heading: "Separate sales confidence from operating readiness",
        body: [
          "Most experienced mortgage professionals already know whether they can generate business. What is less obvious is what happens after the lead converts: licensing, policies, reporting, loan-level oversight, vendor management, quality control, and examination readiness.",
          "If those functions are unclear, ownership can quickly turn into a second job. If they are structured, ownership can let the producer keep doing what already works.",
        ],
      },
      {
        heading: "Think in transition risk",
        body: [
          "Leaving a platform can affect referral relationships, lender access, compensation timing, systems, and support. A responsible ownership plan should map what changes, what stays stable, and what must be built before launch.",
          "The right answer may be to move now, build toward a later date, or decide that ownership is not worth the tradeoff. Clarity is the win.",
        ],
      },
    ],
    practicalChecklist: [
      "Know your annual loan count and funded volume.",
      "Estimate realistic margin improvement after operating costs.",
      "Identify states where you would need licensing support.",
      "Map which operational functions you would not want to personally own.",
      "Pressure-test whether production can stay stable during transition.",
    ],
    commonMistakes: [
      "Assuming high production automatically makes ownership easy.",
      "Underestimating compliance and reporting work.",
      "Planning the brand before planning the operating model.",
      "Leaving a platform without a transition roadmap.",
    ],
    relatedSlugs: [
      "mortgage-company-startup-costs",
      "compliance-infrastructure-for-new-mortgage-companies",
      "from-producer-to-owner",
    ],
    nextStep: {
      title: "Wondering how this applies to your business?",
      body: "Take the Foundry Ownership Readiness Review to understand whether ownership, stronger infrastructure, or a later path makes sense.",
    },
  },
  {
    slug: "mortgage-company-startup-costs",
    collectionId: "starting",
    eyebrow: "Startup Planning",
    title: "What It Really Costs to Start a Mortgage Company",
    description:
      "The cost categories mortgage professionals should understand before comparing ownership to staying on a platform.",
    readTime: "7 min read",
    pullQuote:
      "Startup cost is not one number. It is a sequence of decisions that determines how much risk the owner carries personally.",
    executiveSummary: [
      "Startup costs include entity setup, licensing, bonds, policies, technology, compliance support, vendor setup, and working capital.",
      "The cheapest path is rarely the most responsible path if it leaves the company under-supported.",
      "A good plan separates one-time launch costs from recurring operating support.",
    ],
    mainContent: [
      {
        heading: "Separate launch cost from operating cost",
        body: [
          "Launch cost is what it takes to stand the company up. Operating cost is what it takes to keep it running. Confusing the two can make ownership look cheaper than it is.",
          "A realistic model should include monthly support, reporting, compliance reviews, software, accounting, insurance, and the owner's time.",
        ],
      },
      {
        heading: "Working capital matters",
        body: [
          "Even a lean mortgage company needs breathing room. Licensing timelines, lender setup, production transitions, and compensation cycles can create gaps.",
          "Founders should understand the difference between being approved to operate and being financially prepared to operate.",
        ],
      },
      {
        heading: "Infrastructure reduces surprise costs",
        body: [
          "Policies, reporting calendars, QC processes, vendor files, and exam-ready documentation are often treated as later work. They are cheaper and cleaner when built early.",
          "The better question is not 'What is the lowest cost to start?' It is 'What is the minimum responsible infrastructure for this business model?'",
        ],
      },
    ],
    practicalChecklist: [
      "Estimate one-time launch costs and monthly operating costs separately.",
      "Include licensing, bonds, technology, compliance, accounting, and insurance.",
      "Model conservative production during transition.",
      "Identify what can be outsourced responsibly.",
      "Build a working-capital cushion before launch.",
    ],
    commonMistakes: [
      "Budgeting only for licensing and entity formation.",
      "Ignoring recurring compliance support.",
      "Assuming production will transfer without disruption.",
      "Choosing tools before defining workflows.",
    ],
    relatedSlugs: [
      "is-ownership-realistic-for-a-high-producing-lo",
      "nmls-licensing-roadmap",
      "choosing-a-mortgage-technology-stack",
    ],
    nextStep: {
      title: "Need a realistic ownership model?",
      body: "The Ownership Readiness Review helps frame cost, timing, and support needs around your current production and goals.",
    },
  },
  {
    slug: "compliance-infrastructure-for-new-mortgage-companies",
    collectionId: "compliance",
    eyebrow: "Operating Foundation",
    title: "Compliance Infrastructure for a New Mortgage Company",
    description:
      "What needs to exist behind the scenes so a mortgage company can operate, grow, and withstand scrutiny.",
    readTime: "8 min read",
    pullQuote:
      "Compliance is not a binder. It is the operating rhythm that proves the company knows what it is doing.",
    executiveSummary: [
      "New mortgage companies need policies, procedures, reporting ownership, testing, evidence, and a compliance calendar.",
      "The goal is not paperwork for its own sake; the goal is repeatable control over the business.",
      "Building this early lets the owner stay focused on production instead of reacting to deadlines.",
    ],
    mainContent: [
      {
        heading: "Policies need to match the business",
        body: [
          "A policy library should reflect how the company actually operates: products, states, channels, compensation, vendors, advertising, and supervision.",
          "Shelf policies create risk when they describe a company that does not exist. The better approach is a practical system that can be maintained.",
        ],
      },
      {
        heading: "Reporting needs ownership",
        body: [
          "Mortgage Call Reports, HMDA, renewals, state filings, and internal tracking require dates, data sources, reviewers, and backup responsibility.",
          "When ownership is unclear, reporting becomes a recurring scramble. A calendar and evidence trail create control.",
        ],
      },
      {
        heading: "Exam readiness is built continuously",
        body: [
          "A company does not become exam-ready the week an exam notice arrives. It becomes exam-ready by maintaining policies, logs, testing results, exception handling, and corrective action records over time.",
          "This is where operational discipline becomes enterprise value.",
        ],
      },
    ],
    practicalChecklist: [
      "Create a compliance calendar before launch.",
      "Assign ownership for MCR, HMDA, renewals, and testing.",
      "Maintain policies that reflect actual workflows.",
      "Document vendor oversight and complaint handling.",
      "Store evidence where it can be retrieved quickly.",
    ],
    commonMistakes: [
      "Treating compliance as a one-time setup project.",
      "Keeping policies disconnected from operations.",
      "Waiting until an exam notice to organize evidence.",
      "Letting the owner become the default compliance department.",
    ],
    relatedSlugs: [
      "nmls-licensing-roadmap",
      "choosing-a-mortgage-technology-stack",
      "ai-in-mortgage-compliance-workflows",
    ],
    nextStep: {
      title: "Unsure what infrastructure you would need?",
      body: "The Ownership Readiness Review identifies which operating and compliance areas matter most for your situation.",
    },
  },
  {
    slug: "nmls-licensing-roadmap",
    collectionId: "compliance",
    eyebrow: "Licensing",
    title: "A Practical NMLS Licensing Roadmap for Future Owners",
    description:
      "How to think about company licensing, state sequencing, surety bonds, and launch timing.",
    readTime: "6 min read",
    pullQuote:
      "Licensing is not just an application. It is a launch sequence that affects timing, cost, and production continuity.",
    executiveSummary: [
      "Licensing strategy should start with where production exists today and where the company realistically expects to operate first.",
      "State sequencing, entity details, bonds, control persons, and documentation all affect timing.",
      "A clear roadmap helps avoid costly rework and launch delays.",
    ],
    mainContent: [
      {
        heading: "Start with production geography",
        body: [
          "The first licensing question is not how many states you could pursue. It is where you actually need to operate to protect current production and referral relationships.",
          "A staged state plan often creates more control than trying to launch everywhere at once.",
        ],
      },
      {
        heading: "Documentation drives timelines",
        body: [
          "Entity records, ownership details, financial information, control-person history, bonds, policies, and business plans can all affect approval timing.",
          "The more prepared the package, the less uncertainty the owner carries.",
        ],
      },
      {
        heading: "Licensing should align with operations",
        body: [
          "A company should not be licensed in a state without the operational capacity to serve that state properly. Compliance, reporting, disclosures, and supervision follow the license.",
          "Growth planning and licensing planning should happen together.",
        ],
      },
    ],
    practicalChecklist: [
      "List states tied to current production.",
      "Identify launch-critical states versus later expansion states.",
      "Confirm entity, ownership, and control-person information.",
      "Map bond and documentation requirements.",
      "Connect licensing timing to production transition timing.",
    ],
    commonMistakes: [
      "Applying for too many states too early.",
      "Underestimating documentation lead time.",
      "Treating licensing separately from operations.",
      "Ignoring renewals and ongoing state obligations.",
    ],
    relatedSlugs: [
      "mortgage-company-startup-costs",
      "compliance-infrastructure-for-new-mortgage-companies",
      "from-producer-to-owner",
    ],
    nextStep: {
      title: "Need to know where to start?",
      body: "The Ownership Readiness Review helps identify whether licensing, cost, operations, or timing is the first issue to solve.",
    },
  },
  {
    slug: "from-producer-to-owner",
    collectionId: "growth",
    eyebrow: "Leadership",
    title: "From Producer to Owner: What Actually Changes",
    description:
      "The mindset and operating shifts that happen when an experienced producer becomes responsible for the company.",
    readTime: "7 min read",
    pullQuote:
      "The producer asks, 'How do I close more?' The owner asks, 'What has to be true for the company to run without me touching everything?'",
    executiveSummary: [
      "Ownership changes the job from production alone to production plus stewardship.",
      "The best owner-operators protect their selling time by designing support around it.",
      "Leadership requires visibility into compliance, operations, finance, people, and risk without personally owning every task.",
    ],
    mainContent: [
      {
        heading: "Your time becomes the constraint",
        body: [
          "A high-producing originator already has a valuable use of time. Ownership should not destroy that advantage by burying the owner in back-office work.",
          "The operating model should be designed around keeping the owner close to clients, referral partners, and leadership decisions.",
        ],
      },
      {
        heading: "Visibility replaces improvisation",
        body: [
          "Owners do not need to personally perform every operational task, but they do need visibility. Deadlines, exceptions, reports, policies, and handoffs should be trackable.",
          "A company becomes easier to lead when the operating picture is clear.",
        ],
      },
      {
        heading: "Enterprise value comes from repeatability",
        body: [
          "A book of business is valuable. A company that can produce, comply, document, and grow repeatedly is more durable.",
          "The move from producer to owner is the move from personal production to operating leverage.",
        ],
      },
    ],
    practicalChecklist: [
      "Define what the owner should not personally handle.",
      "Create visibility into deadlines and exceptions.",
      "Assign ownership for operations, compliance, and reporting.",
      "Protect time for sales and referral relationships.",
      "Build repeatable workflows before adding complexity.",
    ],
    commonMistakes: [
      "Trying to personally own every back-office process.",
      "Hiring before defining workflows.",
      "Measuring only production instead of operating health.",
      "Confusing activity with leadership visibility.",
    ],
    relatedSlugs: [
      "is-ownership-realistic-for-a-high-producing-lo",
      "building-a-scalable-mortgage-company",
      "foundry-workspace-operating-system",
    ],
    nextStep: {
      title: "Want to know what ownership would change for you?",
      body: "The Ownership Readiness Review helps translate your current role into a realistic operating path.",
    },
  },
  {
    slug: "building-a-scalable-mortgage-company",
    collectionId: "growth",
    eyebrow: "Scale",
    title: "Building a Mortgage Company That Can Scale",
    description:
      "How owners should think about states, teams, correspondent readiness, and operational capacity.",
    readTime: "8 min read",
    pullQuote:
      "Scale is not adding volume. Scale is adding volume without losing control of the operating model.",
    executiveSummary: [
      "Growth creates more reporting, supervision, vendor, and quality-control complexity.",
      "A scalable mortgage company has workflows, ownership, documentation, and technology that can absorb complexity.",
      "The right growth plan sequences people, states, products, and channels with operational capacity.",
    ],
    mainContent: [
      {
        heading: "Growth adds obligations",
        body: [
          "New states, new loan officers, new branches, and new channels can all create operational and compliance obligations.",
          "A growth plan should identify which obligations arrive with each move and who owns them.",
        ],
      },
      {
        heading: "Correspondent readiness is a maturity test",
        body: [
          "Correspondent lending may improve economics and control, but it usually demands stronger quality control, documentation, financial readiness, and operational discipline.",
          "Owners should view correspondent readiness as a staged outcome, not a shortcut.",
        ],
      },
      {
        heading: "Technology should support operating rhythm",
        body: [
          "The right systems help owners see deadlines, tasks, documents, exceptions, and readiness without digging through scattered tools.",
          "Technology is most useful when it reinforces a clear operating model.",
        ],
      },
    ],
    practicalChecklist: [
      "Map the obligations attached to each growth move.",
      "Confirm operational capacity before adding states or LOs.",
      "Build reporting and QC workflows that can scale.",
      "Evaluate correspondent readiness only after the broker foundation is strong.",
      "Use technology to create visibility, not noise.",
    ],
    commonMistakes: [
      "Adding states without support capacity.",
      "Recruiting before supervision and onboarding workflows exist.",
      "Treating correspondent lending as only a margin decision.",
      "Using technology to compensate for unclear ownership.",
    ],
    relatedSlugs: [
      "from-producer-to-owner",
      "compliance-infrastructure-for-new-mortgage-companies",
      "choosing-a-mortgage-technology-stack",
    ],
    nextStep: {
      title: "Planning growth or correspondent readiness?",
      body: "The Ownership Readiness Review helps clarify what foundation should come before the next move.",
    },
  },
  {
    slug: "choosing-a-mortgage-technology-stack",
    collectionId: "technology",
    eyebrow: "Systems",
    title: "Choosing a Mortgage Technology Stack for Ownership",
    description:
      "How future owners should evaluate tools for origination, compliance, documents, reporting, and operating visibility.",
    readTime: "7 min read",
    pullQuote:
      "A technology stack is not a list of vendors. It is the operating system for how the company works.",
    executiveSummary: [
      "Technology decisions should follow workflow decisions, not the other way around.",
      "Owners need systems that support compliance, reporting, task ownership, document organization, and borrower experience.",
      "The best stack reduces manual burden while making the company easier to supervise.",
    ],
    mainContent: [
      {
        heading: "Start with workflows",
        body: [
          "Before choosing tools, define the workflows: lead intake, disclosure, processing, conditions, closing, post-closing, reporting, complaints, policies, and renewals.",
          "Tools should fit the operating model rather than force the company into accidental processes.",
        ],
      },
      {
        heading: "Visibility matters as much as automation",
        body: [
          "Automation is useful, but owners also need visibility. They need to see what is due, what is missing, where exceptions live, and whether the company is ready for scrutiny.",
          "A modern stack should make operating health easier to understand.",
        ],
      },
      {
        heading: "Keep the stack maintainable",
        body: [
          "More tools can create more handoffs and more failure points. The best stack is usually the simplest set of systems that can support the company's risk, volume, and growth plan.",
          "Maintenance should be part of the technology decision.",
        ],
      },
    ],
    practicalChecklist: [
      "Document core workflows before selecting tools.",
      "Identify compliance and reporting data sources.",
      "Choose systems that support evidence and retrieval.",
      "Avoid duplicate data entry where possible.",
      "Assign ownership for system maintenance.",
    ],
    commonMistakes: [
      "Buying tools before defining processes.",
      "Overbuilding for a future company that does not exist yet.",
      "Ignoring reporting and compliance evidence needs.",
      "Letting every vendor become a separate source of truth.",
    ],
    relatedSlugs: [
      "foundry-workspace-operating-system",
      "ai-in-mortgage-compliance-workflows",
      "compliance-infrastructure-for-new-mortgage-companies",
    ],
    nextStep: {
      title: "Not sure which systems you would need?",
      body: "The Ownership Readiness Review helps identify the operating model first, then the technology that should support it.",
    },
  },
  {
    slug: "ai-in-mortgage-compliance-workflows",
    collectionId: "technology",
    eyebrow: "Responsible AI",
    title: "Where AI Belongs in Mortgage Compliance Workflows",
    description:
      "A practical view of how AI can support regulated mortgage operations without replacing human judgment.",
    readTime: "6 min read",
    pullQuote:
      "AI should accelerate judgment, not replace accountability.",
    executiveSummary: [
      "AI can help organize information, draft summaries, identify patterns, and accelerate review.",
      "Borrower-level data, regulatory decisions, and compliance judgment require careful controls and human oversight.",
      "The best AI workflows are grounded in the company's actual documents, deadlines, policies, and operating posture.",
    ],
    mainContent: [
      {
        heading: "Use AI for acceleration, not abdication",
        body: [
          "AI can be useful for summarizing documents, tracking policy changes, drafting checklists, and answering operational questions from approved sources.",
          "It should not be used as a substitute for accountable compliance judgment, especially where borrower data or regulatory interpretation is involved.",
        ],
      },
      {
        heading: "Context determines usefulness",
        body: [
          "Generic AI answers are less valuable than answers grounded in the company's policies, deadlines, states, licenses, and evidence.",
          "The more structured the operating system, the more useful AI can become.",
        ],
      },
      {
        heading: "Controls matter",
        body: [
          "Responsible AI use requires data-handling rules, review expectations, access controls, and documentation of where AI is allowed to assist.",
          "Mortgage companies should treat AI as part of the operating environment, not a side experiment.",
        ],
      },
    ],
    practicalChecklist: [
      "Define what data AI tools may and may not process.",
      "Keep human review on compliance judgments.",
      "Ground AI outputs in approved company materials.",
      "Document AI-assisted workflows and review expectations.",
      "Use AI to improve visibility and speed, not bypass responsibility.",
    ],
    commonMistakes: [
      "Uploading sensitive borrower data into uncontrolled tools.",
      "Treating generic AI output as compliance advice.",
      "Using AI without policy or oversight.",
      "Skipping human review because an answer sounds confident.",
    ],
    relatedSlugs: [
      "foundry-workspace-operating-system",
      "choosing-a-mortgage-technology-stack",
      "compliance-infrastructure-for-new-mortgage-companies",
    ],
    nextStep: {
      title: "Want to understand how AI fits your operating model?",
      body: "The Ownership Readiness Review helps clarify where technology and AI could support your company responsibly.",
    },
  },
  {
    slug: "foundry-workspace-operating-system",
    collectionId: "technology",
    eyebrow: "Operating System",
    title: "Why Future Owners Need an Operating Workspace",
    description:
      "How deadlines, documents, tasks, audit readiness, and AI belong in one operating view.",
    readTime: "5 min read",
    pullQuote:
      "The owner should not have to ask five systems whether the company is ready.",
    executiveSummary: [
      "Mortgage company owners need visibility across compliance, operations, tasks, documents, and readiness.",
      "An operating workspace reduces the gap between knowing what matters and knowing what is current.",
      "The future of ownership is not more dashboards; it is calmer operating clarity.",
    ],
    mainContent: [
      {
        heading: "Ownership needs one source of operating truth",
        body: [
          "A mortgage company can have many systems but still lack a clear view of what is current, what is due, and what needs attention.",
          "An operating workspace should pull the owner toward the few things that matter now.",
        ],
      },
      {
        heading: "Readiness should be continuous",
        body: [
          "Audit readiness, license renewals, policy updates, reporting deadlines, and QC evidence should not live in someone's memory.",
          "The workspace should keep the company in a state of preparation rather than periodic panic.",
        ],
      },
      {
        heading: "AI becomes useful when the workspace is structured",
        body: [
          "AI can answer better questions when the underlying documents, tasks, policies, and deadlines are organized.",
          "The workspace is the foundation that makes AI practical rather than theatrical.",
        ],
      },
    ],
    practicalChecklist: [
      "Centralize operating deadlines and ownership.",
      "Organize policies, licenses, and exam evidence.",
      "Track tasks and exceptions clearly.",
      "Make readiness visible without digging.",
      "Use AI only where the workspace provides reliable context.",
    ],
    commonMistakes: [
      "Adding dashboards that do not change behavior.",
      "Letting documents scatter across drives and inboxes.",
      "Tracking deadlines without assigning ownership.",
      "Using AI before the operating data is structured.",
    ],
    relatedSlugs: [
      "choosing-a-mortgage-technology-stack",
      "ai-in-mortgage-compliance-workflows",
      "building-a-scalable-mortgage-company",
    ],
    nextStep: {
      title: "Want to know what your operating workspace would need?",
      body: "The Ownership Readiness Review helps identify what infrastructure matters for your company stage.",
    },
  },
];

export function getLibraryCollection(id: LibraryCollectionId) {
  return libraryCollections.find((collection) => collection.id === id);
}

export function getLibraryArticlesByCollection(id: LibraryCollectionId) {
  return libraryArticles.filter((article) => article.collectionId === id);
}

export function getLibraryArticle(slug: string) {
  return libraryArticles.find((article) => article.slug === slug);
}
