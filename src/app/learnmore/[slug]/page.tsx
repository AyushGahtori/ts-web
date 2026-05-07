import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnMorePage } from "@/modules/landing/learnmore/LearnMorePage";
import { getLearnMorePage, learnMorePages } from "@/modules/landing/learnmore/learnMoreData";

interface LearnMoreRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return learnMorePages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: LearnMoreRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLearnMorePage(slug);

  if (!page) {
    return {
      title: "Service Not Found | TechSnitch",
    };
  }

  return {
    title: `${page.eyebrow} | TechSnitch Learn More`,
    description: page.summary,
  };
}

export default async function LearnMoreRoute({ params }: LearnMoreRouteProps) {
  const { slug } = await params;
  const page = getLearnMorePage(slug);

  if (!page) {
    notFound();
  }

  return <LearnMorePage page={page} />;
}
