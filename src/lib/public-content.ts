import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  posts as fallbackPosts,
  projects as fallbackProjects,
  testimonials as fallbackTestimonials,
  type Post,
  type Project,
} from "@/lib/portfolio-data";

export const publishedProjectsQuery = () => ({
  queryKey: ["public", "projects"],
  queryFn: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("sort", { ascending: true });

    if (error || !data?.length) return fallbackProjects;
    return (data as Array<Record<string, unknown>>).map((row) => {
      const fallback = fallbackProjects.find((project) => project.slug === row.slug);
      return {
        ...fallback,
        ...row,
        tags: Array.isArray(row.tags) ? row.tags : (fallback?.tags ?? []),
        liveUrl: fallback?.liveUrl,
        stack: fallback?.stack,
      } as Project;
    });
  },
});

export const publishedPostsQuery = () => ({
  queryKey: ["public", "blog-posts"],
  queryFn: async (): Promise<Post[]> => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error || !data?.length) return fallbackPosts;
    return (data as Array<Record<string, unknown>>).map((row) => {
      const fallback = fallbackPosts.find((post) => post.slug === row.slug);
      const sections = String(row.body_md ?? "")
        .split(/\n(?=#{1,3}\s)/)
        .map((section) => section.trim())
        .filter(Boolean)
        .map((section) => {
          const lines = section.split("\n");
          const heading = lines[0]?.replace(/^#{1,3}\s*/, "") || "Article notes";
          return { heading, content: lines.slice(1).join(" ") || heading };
        });

      return {
        ...fallback,
        slug: String(row.slug),
        title: String(row.title),
        category: String(row.category ?? ""),
        date: row.published_at
          ? new Date(String(row.published_at)).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : (fallback?.date ?? ""),
        readTime: String(row.read_time ?? fallback?.readTime ?? "5 min read"),
        excerpt: String(row.excerpt ?? ""),
        tags: Array.isArray(row.tags) ? row.tags.map(String) : (fallback?.tags ?? []),
        body: sections.length ? sections : (fallback?.body ?? []),
      } as Post;
    });
  },
});

export const publishedTestimonialsQuery = () => ({
  queryKey: ["public", "testimonials"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("name,role,project,quote")
      .eq("is_published", true)
      .order("sort", { ascending: true });

    if (error || !data?.length) return fallbackTestimonials;
    return data;
  },
});

export function usePublishedProjects() {
  return useQuery(publishedProjectsQuery());
}

export function usePublishedPosts() {
  return useQuery(publishedPostsQuery());
}

export function usePublishedTestimonials() {
  return useQuery(publishedTestimonialsQuery());
}