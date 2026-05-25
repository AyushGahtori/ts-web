import type { BlogBlock, BlogPost } from "./blogData";

interface BlogSectionMergeGroup {
  source: string;
  parentSlug: string;
  sectionHeading: string;
  matchChild: (post: BlogPost) => boolean;
}

export function mergeBlogSections(
  posts: BlogPost[],
  groups: BlogSectionMergeGroup[],
): BlogPost[] {
  const hiddenSlugs = new Set<string>();

  const mergedPosts = posts.map((post) => {
    const group = groups.find((candidate) => candidate.parentSlug === post.slug);

    if (!group) {
      return post;
    }

    const childPosts = posts.filter(
      (candidate) =>
        candidate.source === group.source &&
        candidate.slug !== group.parentSlug &&
        group.matchChild(candidate),
    );

    if (childPosts.length === 0) {
      return post;
    }

    childPosts.forEach((childPost) => hiddenSlugs.add(childPost.slug));

    const sectionIntro: BlogBlock = {
      type: "heading",
      kicker: "Deep dive",
      title: group.sectionHeading,
    };

    return {
      ...post,
      blocks: [
        ...post.blocks,
        sectionIntro,
        ...childPosts.flatMap((childPost) => childPost.blocks),
      ],
    };
  });

  return mergedPosts.filter((post) => !hiddenSlugs.has(post.slug));
}
