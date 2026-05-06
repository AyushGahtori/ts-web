export type IndustryIconKey = "bfsi" | "pharma" | "telecom" | "oil" | "manufacturing";
export type OutcomeIconKey = "shield" | "clipboard" | "gauge" | "helmet" | "gear";

type IndustryTableCellIcon =
  | {
      type: "industry";
      key: IndustryIconKey;
    }
  | {
      type: "outcome";
      key: OutcomeIconKey;
    };

export interface IndustryTableCell {
  text: string;
  icon?: IndustryTableCellIcon;
}

export interface IndustryTableRow {
  cells: IndustryTableCell[];
}

export interface IndustryAccordionItemData {
  id: string;
  title: string;
  description?: string;
  columns?: string[];
  rows?: IndustryTableRow[];
}

const baseDescription =
  "TechSnitch does not believe in generic solutions. Regulated and complex industries demand solutions that understand their language — compliance mandates, operational constraints, risk posture, and technology debt. We deliver solutions that are industry-fluent from day one.";

const baseRows: IndustryTableRow[] = [
  {
    cells: [
      { text: "BFSI", icon: { type: "industry", key: "bfsi" } },
      { text: "Credit card & loan lifecycle, regulatory compliance (RBI, SEBI, FATF), fraud & risk intelligence, KYC automation" },
      { text: "Reduced compliance exposure, faster onboarding, real-time fraud detection", icon: { type: "outcome", key: "shield" } },
    ],
  },
  {
    cells: [
      { text: "Pharmaceuticals & Life Sciences", icon: { type: "industry", key: "pharma" } },
      { text: "GxP compliance & validation, pharmacovigilance, adverse event workflows, audit management" },
      { text: "Audit-ready operations, reduced validation cycle time, end-to-end traceability", icon: { type: "outcome", key: "clipboard" } },
    ],
  },
  {
    cells: [
      { text: "Telecommunications", icon: { type: "industry", key: "telecom" } },
      { text: "BSS/OSS integration, AIOps for network assurance, order orchestration, CX transformation" },
      { text: "Fewer network incidents, faster order fulfilment, improved NPS", icon: { type: "outcome", key: "gauge" } },
    ],
  },
  {
    cells: [
      { text: "Oil & Gas", icon: { type: "industry", key: "oil" } },
      { text: "Asset lifecycle management, HSE compliance, predictive maintenance, contractor workforce management" },
      { text: "Reduced downtime, improved safety posture, optimized field operations", icon: { type: "outcome", key: "helmet" } },
    ],
  },
  {
    cells: [
      { text: "Manufacturing", icon: { type: "industry", key: "manufacturing" } },
      { text: "Supply chain resilience, predictive asset maintenance, quality & compliance, plant operations" },
      { text: "Lower defect rates, improved OEE, supply chain visibility", icon: { type: "outcome", key: "gear" } },
    ],
  },
];

const aiAgnosticDescription =
  "Freedom to Innovate — Without Constraints. The AI landscape is evolving faster than any single vendor can track. TechSnitch's AI-agnostic architecture ensures your ServiceNow investments are never held hostage to a single model provider. We orchestrate across the entire AI frontier — today, tomorrow, and beyond.";

const aiAgnosticRows: IndustryTableRow[] = [
  {
    cells: [
      { text: "Microsoft Azure OpenAI" },
      { text: "Enterprise GPT models with Microsoft security and compliance" },
    ],
  },
  {
    cells: [
      { text: "Google Gemini" },
      { text: "Multimodal intelligence for complex document and workflow scenarios" },
    ],
  },
  {
    cells: [
      { text: "AWS Bedrock" },
      { text: "Managed LLM access with AWS-native data sovereignty controls" },
    ],
  },
  {
    cells: [
      { text: "Open-Source LLMs (LLaMA, Mistral)" },
      { text: "Cost-optimized, on-premises deployable models for data-sensitive workloads" },
    ],
  },
  {
    cells: [
      { text: "Enterprise Proprietary AI" },
      { text: "Seamless integration with models you've built internally for competitive differentiation" },
    ],
  },
];

const eliteAdvantageRows: IndustryTableRow[] = [
  {
    cells: [
      { text: "Strategic Vision" },
      { text: "A trusted advisor who challenges conventional thinking and co-architects transformation that creates lasting competitive advantage" },
    ],
  },
  {
    cells: [
      { text: "Platform Mastery" },
      { text: "Certified depth across the entire ServiceNow ecosystem — not generalists, not checkbox partners" },
    ],
  },
  {
    cells: [
      { text: "AI Leadership" },
      { text: "An AI-agnostic architecture that gives you the freedom to evolve, not the obligation to follow a vendor roadmap" },
    ],
  },
  {
    cells: [
      { text: "Accelerated Value" },
      { text: "Proprietary accelerators (SNADA & SAOS) that compress timelines, reduce risk, and deliver measurable ROI faster" },
    ],
  },
  {
    cells: [
      { text: "White-Glove Delivery" },
      { text: "Premium, governance-led managed services with dedicated engineering talent — not offshore ticket queues" },
    ],
  },
  {
    cells: [
      { text: "Outcome Assurance" },
      { text: "Engagements anchored to business KPIs, with transparent reporting and accountability at every milestone" },
    ],
  },
];

const engagementRows: IndustryTableRow[] = [
  {
    cells: [
      { text: "Discover" },
      { text: "Deep-dive assessment of your current capabilities, pain points, and transformation ambitions" },
      { text: "Prioritized opportunity map and business case" },
    ],
  },
  {
    cells: [
      { text: "Architect" },
      { text: "Design of scalable, secure, AI-enabled solutions tailored to your industry and regulatory context" },
      { text: "Blueprint and accelerator-aligned delivery plan" },
    ],
  },
  {
    cells: [
      { text: "Transform" },
      { text: "Rapid, risk-managed deployment using proven methodologies, SNADA, and SAOS accelerators" },
      { text: "Go-live with measurable baseline outcomes" },
    ],
  },
  {
    cells: [
      { text: "Operate" },
      { text: "White-glove managed services ensuring platform stability, performance, and continuous optimization" },
      { text: "Sustained reliability and KPI performance" },
    ],
  },
  {
    cells: [
      { text: "Evolve" },
      { text: "Continuous innovation cycles — new AI capabilities, platform features, and strategic enhancements" },
      { text: "Compounding return on your platform investment" },
    ],
  },
];

export const industryAccordionItems: IndustryAccordionItemData[] = [
  {
    id: "industry-specific-excellence",
    title: "Industry-Specific Excellence",
    description: baseDescription,
    columns: ["Industry", "Key Capabilities", "Flagship Outcomes"],
    rows: baseRows,
  },
  {
    id: "ai-agnostic-ecosystem",
    title: "AI-Agnostic Ecosystem",
    description: aiAgnosticDescription,
    columns: ["AI Ecosystem", "Enterprise Value"],
    rows: aiAgnosticRows,
  },
  {
    id: "elite-advantage",
    title: "The Elite Advantage — Why TechSnitch",
    columns: ["Pillar", "What It Means for You"],
    rows: eliteAdvantageRows,
  },
  {
    id: "engagement-model",
    title: "Engagement Model: From Vision to Autonomy",
    columns: ["Phase", "What Happens", "Outcome"],
    rows: engagementRows,
  },
];
