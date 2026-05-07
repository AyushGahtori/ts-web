import { ServiceCard } from "@/modules/landing/sections/servicesGrid/ServiceCard";
import styles from "./servicesGrid.module.css";

const services = [
  {
    id: "one",
    title: "1. Salesforce Ecosystem: AI-Powered Customer Engagement",
    description:
      "TechSnitch empowers organizations to unlock the full potential of the Salesforce ecosystem by integrating advanced AI capabilities. Our AI-agnostic approach ensures your platform is not locked into a single provider, enabling seamless integration with industry-leading LLMs to deliver hyper-personalized customer journeys.",
    variant: "salesforce" as const,
    learnMoreHref: "/learnmore/salesforce",
  },
  {
    id: "two",
    title: "2. Enterprise ERP Solutions (Oracle & SAP)",
    description:
      "We specialize in modernizing legacy ERP landscapes through AI-driven automation and advanced analytics, focusing on Oracle Cloud and SAP S/4HANA.",
    variant: "erp" as const,
    learnMoreHref: "/learnmore/enterprise-erp",
  },
  {
    id: "three",
    title: "3. Microsoft Dynamics 365 & Power Platform",
    description:
      "TechSnitch integrates the full Microsoft AI stack—including Copilot and Azure OpenAI—into your Dynamics 365 environment. We transform standard business processes into intelligent workflows using the Power Platform (Power BI, Apps, and Automate).",
    variant: "microsoft" as const,
    learnMoreHref: "/learnmore/microsoft-dynamics",
  },
  {
    id: "four",
    title: "4. AI Customer Development & LLM Services",
    description:
      'For organizations seeking a competitive edge, we build domain-specific AI applications that go beyond "off-the-shelf" capabilities.',
    variant: "llm" as const,
    learnMoreHref: "/learnmore/ai-customer-development-llm",
  },
  {
    id: "five",
    title: "5. DevOps & Cloud Infrastructure (AWS, Azure, GCP)",
    description:
      "Platform Engineering & DevSecOps\nWe achieve operational resilience by integrating DevOps with AI and ServiceNow.",
    bullets: [
      "CI/CD & IaC: Automated pipelines using Jenkins, GitHub, and Terraform.",
      "AIOps & Observability: Closed-loop remediation using Dynatrace, Datadog, and Prometheus.",
    ],
    variant: "cloud" as const,
    learnMoreHref: "/learnmore/devops-cloud-infrastructure",
  },
  {
    id: "six",
    title: "6. IT Service Management: BMC, Freshworks & ManageEngine",
    description:
      "Whether you are optimizing a mid-market solution or managing a complex enterprise BMC footprint, TechSnitch provides the bridge to modern AI operations.",
    variant: "itsm" as const,
    learnMoreHref: "/learnmore/it-service-management",
  },
];

export function ServicesGrid() {
  return (
    <section id="services-grid" className={styles.section}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <div className={styles.headerLine}>
            <span className={styles.headerPill}>
              <span className={styles.headerBrand}>TechSnitch:</span>
            </span>
            <span className={styles.headerText}>Enterprise AI Transformation Portfolio</span>
          </div>
        </header>

        <div className={styles.grid}>
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} className={styles[service.id]} />
          ))}
        </div>
      </div>
    </section>
  );
}
