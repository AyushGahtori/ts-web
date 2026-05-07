export interface LearnMoreTable {
  headers: string[];
  rows: string[][];
}

export interface LearnMoreSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: LearnMoreTable;
}

export interface LearnMorePageData {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  lead: string[];
  sections: LearnMoreSection[];
  outcomes: string[];
  cta: {
    heading: string;
    body: string;
    primary: string;
    secondary: string;
  };
}

export const learnMorePages: LearnMorePageData[] = [
  {
    slug: "salesforce",
    eyebrow: "Salesforce Ecosystem",
    title: "Elevating Customer Engagement Through AI-Driven Salesforce Transformation",
    summary:
      "TechSnitch helps enterprises unlock the full potential of Salesforce by integrating flexible, enterprise-grade AI across customer engagement, service, data, and growth workflows.",
    lead: [
      "In today's hyper-competitive digital landscape, out-of-the-box CRM solutions are no longer enough to secure customer loyalty. At TechSnitch, we empower organizations to unlock the full potential of their Salesforce ecosystem by seamlessly integrating advanced, enterprise-grade AI capabilities.",
      "We do not just upgrade your tech stack. We transform how you connect with your customers.",
    ],
    sections: [
      {
        title: "The TechSnitch Advantage: An AI-Agnostic Approach",
        paragraphs: [
          "One size does not fit all when it comes to Artificial Intelligence. TechSnitch champions an AI-agnostic architecture so your platform is never locked into a single provider.",
          "We enable flexible integration with industry-leading Large Language Models, allowing your organization to pivot, scale, and deliver hyper-personalized customer journeys using the best tools for each need.",
        ],
      },
      {
        title: "Sales & Marketing Cloud",
        paragraphs: ["Stop guessing and start predicting. We inject AI directly into your sales and marketing funnels so teams focus their energy where it matters most."],
        bullets: [
          "AI-driven lead scoring to identify and prioritize high-intent prospects.",
          "Revenue forecasting with predictive financial models and clearer pipeline visibility.",
          "Personalized journey orchestration across the right message, channel, and moment.",
        ],
      },
      {
        title: "Service & Experience Cloud",
        paragraphs: ["Transform customer support from a cost center into a powerful driver of loyalty and retention."],
        bullets: [
          "Intelligent case routing that analyzes incoming queries and routes them to the best-equipped agent.",
          "Automated summarization that saves agents time across complex email threads and chat histories.",
          "AI-powered self-service portals that help customers find answers through conversational AI interfaces.",
        ],
      },
      {
        title: "Data Cloud & Einstein",
        paragraphs: ["Data is only valuable when your teams can act on it. We build the foundation for real-time intelligence."],
        bullets: [
          "Unified customer data architectures that create a comprehensive 360-degree customer view.",
          "Predictive intelligence with Einstein AI to anticipate needs, suggest next-best actions, and surface frontline insights.",
        ],
      },
    ],
    outcomes: [
      "Accelerated revenue growth through predictive insights and stronger lead qualification.",
      "Improved customer satisfaction through voice-of-the-customer sentiment analysis.",
      "A Salesforce platform that can evolve with the AI ecosystem instead of being locked to one model provider.",
    ],
    cta: {
      heading: "Ready to future-proof your Salesforce ecosystem?",
      body: "Stop leaving data and revenue on the table. Build a tailored AI-powered Salesforce strategy for your enterprise.",
      primary: "Contact our experts",
      secondary: "Schedule a demo",
    },
  },
  {
    slug: "enterprise-erp",
    eyebrow: "Oracle & SAP",
    title: "Modernizing the Core with Intelligent Oracle and SAP Solutions",
    summary:
      "TechSnitch modernizes legacy ERP landscapes through AI-driven automation, advanced analytics, and cloud-native transformation across Oracle Cloud and SAP S/4HANA.",
    lead: [
      "In an era of rapid digital disruption, relying on rigid legacy ERP systems is an operational risk. TechSnitch helps global enterprises modernize their digital core by transitioning to intelligent, cloud-native ERP platforms.",
      "We do not just migrate systems. We reimagine back-office operations through strategic AI-driven automation and advanced analytics.",
    ],
    sections: [
      {
        title: "The TechSnitch Advantage: AI-Infused Transformation",
        paragraphs: [
          "We specialize in complex modernization efforts focused on Oracle Cloud and SAP S/4HANA.",
          "By integrating machine learning and predictive analytics directly into workflows, we turn ERP from a static system of record into a dynamic system of intelligence.",
        ],
      },
      {
        title: "Tailored AI by Ecosystem",
        table: {
          headers: ["Business Function", "Oracle Cloud AI Services", "SAP S/4HANA AI Services"],
          rows: [
            ["Finance", "Automated reconciliation and predictive forecasting.", "Anomaly detection and intelligent invoice processing."],
            ["Supply Chain", "Risk prediction and demand optimization.", "Predictive maintenance and inventory optimization."],
            ["Human Capital", "AI talent analytics and lifecycle automation.", "Conversational HR agents and talent management."],
          ],
        },
      },
      {
        title: "Next-Generation Finance",
        bullets: [
          "With Oracle: accelerate financial close through automated reconciliation and predictive forecasting.",
          "With SAP: flag financial anomalies and reduce manual data entry through intelligent invoice processing.",
        ],
      },
      {
        title: "Resilient Supply Chains",
        bullets: [
          "With Oracle: predict supplier risks and optimize demand planning.",
          "With SAP: reduce downtime through IoT-enabled predictive maintenance and optimize inventory levels.",
        ],
      },
      {
        title: "Intelligent Human Capital Management",
        bullets: [
          "With Oracle: identify skill gaps and flight risks while automating the employee lifecycle.",
          "With SAP: deploy conversational HR agents and smart talent management algorithms.",
        ],
      },
    ],
    outcomes: [
      "A smarter enterprise core that actively drives business value.",
      "Reduced manual work across finance, supply chain, and HCM.",
      "Cloud-native ERP foundations ready for future AI capabilities.",
    ],
    cta: {
      heading: "Ready to build a smarter, faster enterprise core?",
      body: "Do not let legacy systems slow down innovation. Execute a focused AI-driven Oracle or SAP transformation.",
      primary: "Speak with an ERP architect",
      secondary: "Request an assessment",
    },
  },
  {
    slug: "microsoft-dynamics",
    eyebrow: "Microsoft Dynamics 365",
    title: "Reimagining Business Applications with Copilot-Ready Solutions",
    summary:
      "TechSnitch integrates Copilot, Azure OpenAI, Dynamics 365, and Power Platform to turn standard business processes into intelligent, adaptive workflows.",
    lead: [
      "The modern enterprise requires more than connected applications. It needs intelligent workflows that adapt as the business changes.",
      "TechSnitch helps you harness the Microsoft AI stack to turn Dynamics 365 into a proactive engine for growth.",
    ],
    sections: [
      {
        title: "Architecting the Intelligent Enterprise",
        paragraphs: [
          "We do not just deploy software. We architect unified operating models by bridging Dynamics 365 with the Power Platform so data, processes, and people are connected.",
        ],
      },
      {
        title: "Core Microsoft Capabilities",
        bullets: [
          "Azure OpenAI integration that embeds enterprise-grade generative AI into proprietary data estates.",
          "Power Apps modernization for low-code applications tailored to operational workflows.",
          "Power Automate hyper-automation for complex, multi-step processes across legacy and modern systems.",
          "Power BI decision intelligence that turns fragmented data into predictive dashboards.",
        ],
      },
      {
        title: "The Conversational Enterprise",
        paragraphs: [
          "Large organizations lose time surfacing critical data hidden inside complex systems. TechSnitch solves this by deploying custom conversational copilots directly into daily workflows.",
          "Finance teams can ask natural language questions about operational expenses, variance, and key drivers. Operations teams can surface supply chain bottlenecks and mitigation options without navigating cumbersome interfaces.",
        ],
      },
    ],
    outcomes: [
      "A unified operating model across CRM, ERP, and localized applications.",
      "Enhanced decision intelligence through proactive AI-driven forecasting.",
      "Workforce augmentation that frees high-value talent from repetitive administrative tasks.",
    ],
    cta: {
      heading: "Ready to unlock the full potential of Microsoft AI?",
      body: "Transform your business applications into a strategic advantage with a Copilot-ready enterprise environment.",
      primary: "Consult a Microsoft AI architect",
      secondary: "Explore the Copilot demo",
    },
  },
  {
    slug: "ai-customer-development-llm",
    eyebrow: "Custom AI & LLM Services",
    title: "Engineering Bespoke Intelligence with Custom LLM Solutions",
    summary:
      "TechSnitch builds domain-specific AI applications and custom LLM solutions that understand your enterprise language, data, workflows, and compliance needs.",
    lead: [
      "Off-the-shelf AI tools provide baseline productivity, but they do not create a defensible competitive advantage.",
      "For organizations building a true competitive moat, the future lies in domain-specific AI that understands the unique language, data, and nuances of the enterprise.",
    ],
    sections: [
      {
        title: "Intelligence Tailored to Your Domain",
        paragraphs: [
          "We treat proprietary data as your most valuable asset. Our custom AI development methodology is built on agility, deep industry context, and rigorous data security.",
        ],
      },
      {
        title: "Custom LLM Development & Contextual AI",
        bullets: [
          "Retrieval-Augmented Generation that grounds model responses in your proprietary enterprise data.",
          "Model fine-tuning for specialized terminology, industry regulations, and operational logic.",
        ],
      },
      {
        title: "The Agnostic AI Advantage",
        bullets: [
          "Integration with proprietary models including OpenAI, Google Gemini, and Anthropic Claude for complex reasoning-heavy tasks.",
          "Secure self-hosted open-source models such as Meta Llama and Mistral for control over privacy and inference cost.",
        ],
      },
      {
        title: "Enterprise Governance & Responsible AI",
        bullets: [
          "Responsible AI frameworks with guardrails for secure, ethical, and reliable operation.",
          "Data privacy and compliance architectures where your data never trains public models.",
        ],
      },
    ],
    outcomes: [
      "A defensible competitive moat through AI capabilities unique to your enterprise.",
      "Hyper-automated workflows for complex domain-specific tasks.",
      "Uncompromised security while adopting generative AI aggressively.",
    ],
    cta: {
      heading: "Ready to build your proprietary AI advantage?",
      body: "Move beyond generic tools and engineer an AI strategy that differentiates your enterprise.",
      primary: "Consult an AI engineer",
      secondary: "Explore custom AI architectures",
    },
  },
  {
    slug: "devops-cloud-infrastructure",
    eyebrow: "DevOps & Cloud Infrastructure",
    title: "Scalable Foundations for the AI-Driven Enterprise",
    summary:
      "TechSnitch architects secure, high-performance cloud foundations across AWS, Azure, and GCP so enterprises can scale AI workloads with resilience.",
    lead: [
      "You cannot build next-generation artificial intelligence on legacy infrastructure. As data volume and computational demand grow, rigid IT environments become a critical liability.",
      "TechSnitch architects the secure cloud foundations required to power enterprise AI across regulated workloads, agile IT operations, and global GCC environments.",
    ],
    sections: [
      {
        title: "Platform Engineering & DevSecOps",
        paragraphs: [
          "We modernize how enterprises build, secure, and maintain software by connecting DevOps methods with AI and central ServiceNow workflows.",
        ],
        bullets: [
          "Continuous integration and Infrastructure as Code with Jenkins, GitHub, and Terraform.",
          "AIOps and observability using Dynatrace, Datadog, and Prometheus for closed-loop remediation.",
          "Shift-left security with automated security and compliance checks in development pipelines.",
        ],
      },
      {
        title: "Multi-Cloud Excellence",
        bullets: [
          "AWS: high-throughput environments with Amazon Bedrock and SageMaker.",
          "Azure: Azure OpenAI, Azure Synapse, secure analytics, and enterprise reporting.",
          "GCP: BigQuery and Vertex AI for data-heavy cloud-native innovation.",
        ],
      },
    ],
    outcomes: [
      "Unconstrained scalability for intense AI workloads without over-provisioning.",
      "Accelerated time-to-market through aggressive pipeline automation.",
      "Stronger operational resilience through AIOps and automated remediation workflows.",
    ],
    cta: {
      heading: "Ready to build your AI-ready foundation?",
      body: "Stop letting infrastructure bottlenecks dictate your pace of innovation.",
      primary: "Consult a cloud architect",
      secondary: "Request an infrastructure audit",
    },
  },
  {
    slug: "it-service-management",
    eyebrow: "IT Service Management",
    title: "Intelligent Service Management & Platform Evolution",
    summary:
      "TechSnitch bridges BMC, Freshworks, ManageEngine, and ServiceNow ecosystems with AIOps, migration strategy, CMDB integration, and modern service operations.",
    lead: [
      "IT Service Management can no longer be a reactive helpdesk function. It must become a proactive engine for business continuity.",
      "Whether you are optimizing a mid-market solution or streamlining a complex BMC footprint, TechSnitch delivers strategies that reduce noise, accelerate resolution, and future-proof IT operations.",
    ],
    sections: [
      {
        title: "Optimize or Evolve",
        paragraphs: [
          "Our methodology is dual-pronged. We inject intelligent automation into existing platforms to maximize current investments, and we architect migration pathways for organizations ready to evolve.",
        ],
      },
      {
        title: "BMC Helix Transformation & AIOps",
        bullets: [
          "Predictive event correlation that groups alert noise to identify the real underlying issue.",
          "Automated root cause analysis that reduces Mean Time to Resolution by pinpointing causes before users are impacted.",
        ],
      },
      {
        title: "Strategic Modernization & Migration",
        bullets: [
          "Risk-mitigated frameworks to migrate operations from BMC, Freshworks, or ManageEngine to ServiceNow.",
          "Scalable architectures aligned to ITIL best practices and enterprise cloud workflows.",
        ],
      },
      {
        title: "Unified Visibility & Discovery",
        bullets: [
          "ServiceNow CMDB integrations with discovery tools like BMC Discovery.",
          "A single source of truth across assets, dependencies, and service mappings.",
        ],
      },
    ],
    outcomes: [
      "Drastic MTTR reduction through AI-driven insights and automated remediation.",
      "Elimination of operational silos across disparate ITSM tools.",
      "Frictionless IT experiences that enable workforce productivity.",
    ],
    cta: {
      heading: "Ready to evolve your IT Service Management?",
      body: "Optimize your current footprint or architect a comprehensive migration strategy with TechSnitch.",
      primary: "Speak with an ITSM architect",
      secondary: "Request a platform assessment",
    },
  },
];

export function getLearnMorePage(slug: string) {
  return learnMorePages.find((page) => page.slug === slug);
}
