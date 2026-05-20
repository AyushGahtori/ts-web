import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/modules/landing/blogs/BlogDetailPage";
import { blogPosts, getBlogPost } from "@/modules/landing/blogs/blogData";

interface BlogPostRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | TechSnitch",
    };
  }

  return {
    title: `${post.title} | TechSnitch Blogs`,
    description: post.description,
  };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailPage post={post} />;
}
