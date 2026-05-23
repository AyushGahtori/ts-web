import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexPage } from "@/modules/landing/blogs/BlogIndexPage";
import {
  BLOG_CATEGORIES,
  categorySlugAliases,
  getCategoryFromSlug,
  getPostsByCategory,
} from "@/modules/landing/blogs/blogData";

interface BlogCategoryRouteProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.flatMap((category) =>
    categorySlugAliases(category).map((categorySlug) => ({
      category: categorySlug,
    })),
  );
}

export async function generateMetadata({ params }: BlogCategoryRouteProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | TechSnitch",
    };
  }

  return {
    title: `${category} Articles | TechSnitch Blogs`,
    description: `TechSnitch editorial briefings for ${category.toLowerCase()} signals and enterprise systems.`,
  };
}

export default async function BlogCategoryRoute({ params }: BlogCategoryRouteProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);

  if (!category) {
    notFound();
  }

  return <BlogIndexPage activeCategory={category} posts={getPostsByCategory(category)} />;
}
