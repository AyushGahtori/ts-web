import type { Metadata } from "next";
import { BlogIndexPage } from "@/modules/landing/blogs/BlogIndexPage";
import { blogPosts } from "@/modules/landing/blogs/blogData";

export const metadata: Metadata = {
  title: "Blogs | TechSnitch",
  description: "Editorial briefings on AI, ServiceNow, CRM, innovation, and autonomous enterprise systems.",
};

export default function BlogsRoute() {
  return <BlogIndexPage posts={blogPosts} />;
}
