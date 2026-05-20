import { docxBlogPosts } from "./docxBlogPosts";
import { getBlogImageSlot, type BlogMedia } from "./blogMedia";

export const BLOG_CATEGORIES = [
  "AI",
  "Innovation",
  "Tech",
  "Enterprise",
  "Inspiration",
  "Research",
  "Product",
  "Culture",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogTableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface BlogHeadingBlock {
  type: "heading";
  title: string;
  kicker?: string;
}

export interface BlogParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BlogListBlock {
  type: "list";
  items: string[];
}

export interface BlogCalloutBlock {
  type: "callout";
  eyebrow: string;
  title: string;
  items: string[];
}

export interface BlogFigureBlock {
  type: "figure";
  label: string;
  tone: "violet" | "pink" | "ink";
}

export type BlogBlock =
  | BlogHeadingBlock
  | BlogParagraphBlock
  | BlogListBlock
  | BlogCalloutBlock
  | BlogTableBlock
  | BlogFigureBlock;

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  title: string;
  description: string;
  deck: string;
  featuredLabel: string;
  source: string;
  accent: "violet" | "pink" | "ink";
  lead: string[];
  blocks: BlogBlock[];
  media?: BlogMedia;
}

const pdfBlogPosts: BlogPost[] = [
  {
    slug: "servicenow-ai-crm-playbook",
    category: "Innovation",
    title: "The AI-Agnostic CRM Playbook for ServiceNow Transformation",
    description:
      "A strategic look at how ServiceNow, SNADA, and model-flexible AI architecture can turn CRM workflows into an intelligent enterprise operating layer.",
    deck:
      "ServiceNow transformation is no longer only about workflow modernization. The next frontier is an AI layer that can route, reason, and retrieve across enterprise context without locking the organization into one model provider.",
    featuredLabel: "Featured playbook",
    source: "TS_SN_CRM_Playbook.pdf",
    accent: "violet",
    lead: [
      "Enterprise CRM teams are under pressure to resolve faster, personalize more deeply, and make every workflow feel intelligent without sacrificing governance. The opportunity is not a louder interface. It is a calmer operating model where ServiceNow becomes the trusted orchestration layer for customer, employee, and operational intelligence.",
      "The TechSnitch approach is deliberately AI-agnostic. Instead of betting the enterprise on one vendor roadmap, the architecture keeps model choice, retrieval strategy, and workflow execution flexible enough to evolve as the AI ecosystem changes.",
    ],
    blocks: [
      {
        type: "heading",
        kicker: "01",
        title: "Strategic flexibility becomes the architecture",
      },
      {
        type: "paragraph",
        text:
          "AI transformation in CRM works best when the intelligence layer can adapt to cost, complexity, compliance, and context. A simple chatbot cannot carry that responsibility. The enterprise needs a routing system that understands when to use a fast model, when to escalate to deeper reasoning, and when to ground every answer in verified ServiceNow knowledge.",
      },
      {
        type: "figure",
        label: "Editorial media frame",
        tone: "violet",
      },
      {
        type: "heading",
        kicker: "02",
        title: "SNADA: ServiceNow AI Digital Assistant",
      },
      {
        type: "paragraph",
        text:
          "SNADA is positioned as the intelligent bridge between complex enterprise data and a seamless user experience. It brings natural language access to ServiceNow workflows while keeping answers connected to the policies, records, and operating context that teams already trust.",
      },
      {
        type: "list",
        items: [
          "Multi-model routing orchestrates requests across LLMs such as GPT, Gemini, and Claude based on cost, complexity, and task intent.",
          "Conversational intelligence provides always-on support for employees and customers without forcing them through rigid forms.",
          "Contextual retrieval grounds AI responses in the organization's ServiceNow data, knowledge base, and CRM context.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Operating principle",
        title: "The assistant should feel simple because the architecture is doing the hard work.",
        items: [
          "Model choice happens behind the scenes.",
          "Governance travels with the workflow.",
          "Answers stay close to enterprise truth.",
        ],
      },
      {
        type: "heading",
        kicker: "03",
        title: "The AI-agnostic advantage",
      },
      {
        type: "paragraph",
        text:
          "TechSnitch's innovation strategy is built around strategic flexibility. The intelligence layer should never become a prisoner to a single vendor roadmap, especially when customer experience, support cost, compliance posture, and platform velocity are all moving at once.",
      },
      {
        type: "table",
        headers: ["Innovation pillar", "TechSnitch approach", "Business impact"],
        rows: [
          [
            "Model selection",
            "Integrate with Azure OpenAI, Google Gemini, AWS Bedrock, Claude, and future-fit models.",
            "Access best-in-class intelligence as model capabilities change.",
          ],
          [
            "Context grounding",
            "Use retrieval-augmented generation across ServiceNow, CRM, and enterprise knowledge sources.",
            "Improve trust by keeping responses tied to verified business context.",
          ],
          [
            "Workflow orchestration",
            "Route conversations into cases, approvals, summaries, and service actions.",
            "Move from passive answers to measurable operational outcomes.",
          ],
        ],
      },
      {
        type: "heading",
        kicker: "04",
        title: "CRM workflows that become intelligent",
      },
      {
        type: "list",
        items: [
          "Case triage can classify, prioritize, and route issues while preserving the decision trail.",
          "Agent assist can summarize customer history, surface next best actions, and draft responses grounded in policy.",
          "Customer 360 views can become conversational, letting teams ask questions instead of hunting through fragmented records.",
          "Escalation workflows can detect sentiment, urgency, and SLA risk before a customer relationship deteriorates.",
        ],
      },
      {
        type: "figure",
        label: "CRM intelligence frame",
        tone: "pink",
      },
      {
        type: "heading",
        kicker: "05",
        title: "A practical implementation path",
      },
      {
        type: "paragraph",
        text:
          "The strongest transformation path starts small enough to govern and broadens only after value is proven. Map the highest-friction CRM journeys, define the model routing policy, connect retrieval to trusted ServiceNow sources, and measure improvements in resolution time, deflection quality, and agent confidence.",
      },
      {
        type: "list",
        items: [
          "Discover the workflows where AI can reduce operational drag without increasing risk.",
          "Design the routing, retrieval, and approval model before introducing broad automation.",
          "Launch with clear human review paths, observability, and outcome metrics.",
          "Expand once the operating model is trusted by agents, leaders, and customers.",
        ],
      },
    ],
  },
];

function withMedia(post: BlogPost, media: BlogMedia): BlogPost {
  return {
    ...post,
    media,
  };
}

function requiredBlogImageSlot(slot: number) {
  const image = getBlogImageSlot(slot);

  if (!image) {
    throw new Error(`Missing blog image slot ${slot}`);
  }

  return image;
}

const pdfPostsWithMedia = pdfBlogPosts.map((post) =>
  withMedia(post, {
    thumbnail: requiredBlogImageSlot(1),
    hero: requiredBlogImageSlot(1),
    figures: [requiredBlogImageSlot(2), requiredBlogImageSlot(3)],
  }),
);

const docxPostsWithMedia = docxBlogPosts.map((post, index) => {
  const image = requiredBlogImageSlot(index + 4);

  return withMedia(post, {
    thumbnail: image,
    hero: image,
    figures: image ? [image] : [],
  });
});

export const blogPosts: BlogPost[] = [...pdfPostsWithMedia, ...docxPostsWithMedia];

export function categoryToSlug(category: BlogCategory) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function getCategoryFromSlug(slug: string) {
  return BLOG_CATEGORIES.find((category) => categoryToSlug(category) === slug);
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory) {
  return blogPosts.filter((post) => post.category === category);
}
