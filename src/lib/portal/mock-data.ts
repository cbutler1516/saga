export type DocumentCategory =
  | "Licensing"
  | "Policies & Procedures"
  | "Regulatory Reporting"
  | "Audit & Exam Readiness"
  | "Correspondent Readiness"
  | "Other";

export type PortalDocument = {
  id: string;
  name: string;
  category: DocumentCategory;
  updatedAt: string;
  uploadedBy: string;
};

export type PortalTaskStatus = "Open" | "In Progress" | "Completed";
export type PortalTaskPriority = "High" | "Medium" | "Low";

export type PortalTask = {
  id: string;
  title: string;
  status: PortalTaskStatus;
  dueDate: string;
  priority: PortalTaskPriority;
  owner: string;
  complianceArea: string;
};

export const mockClientDashboard = {
  companyName: "Summit Home Lending LLC",
  status: "Active client" as const,
  nextMilestone: "Q2 Mortgage Call Report preparation — Apr 15, 2026",
  complianceReadiness: {
    overall: "On track",
    openItems: 4,
    upcomingDeadlines: 3,
    lastReviewDate: "Mar 12, 2026",
  },
  metrics: {
    statesActive: 6,
    loanOfficersTracked: 14,
    openComplianceItems: 4,
    documentsStored: 47,
  },
};

export const mockRecentDocuments: PortalDocument[] = [
  {
    id: "doc-1",
    name: "Compliance Management System — Q1 2026",
    category: "Policies & Procedures",
    updatedAt: "Mar 10, 2026",
    uploadedBy: "Foundry Ops",
  },
  {
    id: "doc-2",
    name: "Texas Company License Renewal Packet",
    category: "Licensing",
    updatedAt: "Mar 8, 2026",
    uploadedBy: "Foundry Ops",
  },
  {
    id: "doc-3",
    name: "MCR Filing Worksheet — Q4 2025",
    category: "Regulatory Reporting",
    updatedAt: "Feb 28, 2026",
    uploadedBy: "Foundry Reporting",
  },
  {
    id: "doc-4",
    name: "State Exam Evidence Index",
    category: "Audit & Exam Readiness",
    updatedAt: "Feb 20, 2026",
    uploadedBy: "Foundry Compliance",
  },
];

export const mockDocumentVault: PortalDocument[] = [
  ...mockRecentDocuments,
  {
    id: "doc-5",
    name: "LO Compensation Policy",
    category: "Policies & Procedures",
    updatedAt: "Jan 15, 2026",
    uploadedBy: "Foundry Ops",
  },
  {
    id: "doc-6",
    name: "HMDA Submission Confirmation — 2025",
    category: "Regulatory Reporting",
    updatedAt: "Mar 1, 2026",
    uploadedBy: "Foundry Reporting",
  },
  {
    id: "doc-7",
    name: "QC Plan Summary",
    category: "Correspondent Readiness",
    updatedAt: "Jan 22, 2026",
    uploadedBy: "Foundry Compliance",
  },
  {
    id: "doc-8",
    name: "Vendor Management Register",
    category: "Other",
    updatedAt: "Dec 18, 2025",
    uploadedBy: "Foundry Ops",
  },
];

export const mockTasks: PortalTask[] = [
  {
    id: "task-1",
    title: "Prepare Q2 Mortgage Call Report data package",
    status: "In Progress",
    dueDate: "Apr 15, 2026",
    priority: "High",
    owner: "Foundry Reporting",
    complianceArea: "MCR",
  },
  {
    id: "task-2",
    title: "Texas company license renewal submission",
    status: "Open",
    dueDate: "May 1, 2026",
    priority: "High",
    owner: "Foundry Licensing",
    complianceArea: "State Licensing",
  },
  {
    id: "task-3",
    title: "Update advertising review policy",
    status: "Open",
    dueDate: "Apr 30, 2026",
    priority: "Medium",
    owner: "Foundry Compliance",
    complianceArea: "Policies",
  },
  {
    id: "task-4",
    title: "Complete Q1 QC sample review",
    status: "In Progress",
    dueDate: "Apr 10, 2026",
    priority: "Medium",
    owner: "Foundry QC",
    complianceArea: "Quality Control",
  },
  {
    id: "task-5",
    title: "Annual HMDA attestation archive",
    status: "Completed",
    dueDate: "Mar 1, 2026",
    priority: "Low",
    owner: "Foundry Reporting",
    complianceArea: "HMDA",
  },
];

export const mockComplianceOverview = {
  readinessScore: "On track",
  policyLibrary: { status: "Current", lastUpdated: "Mar 10, 2026" },
  mcrHmda: { status: "Q1 MCR filed · HMDA 2025 complete", nextDue: "Apr 15, 2026" },
  stateLicensing: {
    status: "6 active states",
    renewalsDue: 1,
    nextRenewal: "Texas — May 1, 2026",
  },
  examReadiness: {
    status: "Evidence organized",
    lastReview: "Mar 12, 2026",
    openGaps: 2,
  },
};

export const mockMetrics = {
  activeStates: 6,
  loanOfficersTracked: 14,
  reportsCompleted: 12,
  upcomingRenewals: 1,
  openExceptions: 2,
  monthlyTrend: [
    { label: "Oct", reports: 2 },
    { label: "Nov", reports: 2 },
    { label: "Dec", reports: 3 },
    { label: "Jan", reports: 2 },
    { label: "Feb", reports: 2 },
    { label: "Mar", reports: 1 },
  ],
};

export const documentCategories: DocumentCategory[] = [
  "Licensing",
  "Policies & Procedures",
  "Regulatory Reporting",
  "Audit & Exam Readiness",
  "Correspondent Readiness",
  "Other",
];
