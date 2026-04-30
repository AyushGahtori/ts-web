export type IndustryIconKey = "bfsi" | "pharma" | "telecom" | "oil" | "manufacturing";
export type OutcomeIconKey = "shield" | "clipboard" | "gauge" | "helmet" | "gear";

export interface IndustryTableRow {
  industry: string;
  industryIcon: IndustryIconKey;
  capabilities: string;
  outcomes: string;
  outcomeIcon: OutcomeIconKey;
}

export interface IndustryAccordionItemData {
  id: string;
  title: string;
  description?: string;
  rows?: IndustryTableRow[];
}

const baseDescription =
  "TechSnitch does not believe in generic solutions. Regulated and complex industries demand solutions that understand their language — compliance mandates, operational constraints, risk posture, and technology debt. We deliver solutions that are industry-fluent from day one";

const baseRows: IndustryTableRow[] = [
  {
    industry: "BFSI",
    industryIcon: "bfsi",
    capabilities: "Credit card & loan lifecycle, regulatory compliance (RBI, SEBI, FATF), fraud & risk intelligence, KYC automation",
    outcomes: "Reduced compliance exposure, faster onboarding, real-time fraud detection",
    outcomeIcon: "shield",
  },
  {
    industry: "Pharmaceuticals & Life Sciences",
    industryIcon: "pharma",
    capabilities: "GxP compliance & validation, pharmacovigilance, adverse event workflows, audit management",
    outcomes: "Audit-ready operations, reduced validation cycle time, end-to-end traceability",
    outcomeIcon: "clipboard",
  },
  {
    industry: "Telecommunications",
    industryIcon: "telecom",
    capabilities: "BSS/OSS integration, AIOps for network assurance, order orchestration, CX transformation",
    outcomes: "Fewer network incidents, faster order fulfillment, improved NPS",
    outcomeIcon: "gauge",
  },
  {
    industry: "Oil & Gas",
    industryIcon: "oil",
    capabilities: "Asset lifecycle management, HSE compliance, predictive maintenance, contractor workforce management",
    outcomes: "Reduced downtime, improved safety posture, optimized field operations",
    outcomeIcon: "helmet",
  },
  {
    industry: "Manufacturing",
    industryIcon: "manufacturing",
    capabilities: "Supply chain resilience, predictive asset maintenance, quality & compliance, plant operations",
    outcomes: "Lower defect rates, improved OEE, supply chain visibility",
    outcomeIcon: "gear",
  },
];

export const industryAccordionItems: IndustryAccordionItemData[] = [
  {
    id: "industry-specific-excellence",
    title: "Industry-Specific Excellence",
    description: baseDescription,
    rows: baseRows,
  },
  {
    id: "ai-agnostic-ecosystem",
    title: "AI-Agnostic Ecosystem",
    description: baseDescription,
    rows: baseRows,
  },
  {
    id: "elite-advantage",
    title: "The Elite Advantage — Why TechSnitch",
    description: baseDescription,
    rows: baseRows,
  },
  {
    id: "engagement-model",
    title: "Engagement Model: From Vision to Autonomy",
    description: baseDescription,
    rows: baseRows,
  },
];
