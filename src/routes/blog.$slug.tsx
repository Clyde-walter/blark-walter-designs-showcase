import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Facebook, Twitter, Linkedin, Link2, Flame } from "lucide-react";
import { posts, site, type Post } from "@/lib/portfolio-data";
import { accentFor } from "./blog";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const p = posts.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: p ? `${p.title} — Blark-walter Designs` : "Article — Blark-walter Designs" },
        { name: "description", content: p?.excerpt ?? "" },
        { property: "og:title", content: p?.title ?? "Article" },
        { property: "og:description", content: p?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const p = posts.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: BlogDetailPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-flex text-primary">Back to blog</Link>
    </div>
  ),
});

function BlogDetailPage() {
  const post = Route.useLoaderData() as Post;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <section className="container-x py-10">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> ›{" "}
          <Link to="/blog" className="text-primary">Blog</Link> ›{" "}
          <span>{post.title}</span>
        </nav>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{post.category}</span>
              <span className="text-xs text-muted-foreground">• {post.date}</span>
              <span className="text-xs text-muted-foreground">• {post.readTime}</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
            <div className={`mt-8 h-72 rounded-2xl bg-gradient-to-br ${accentFor(post.category)}`}>
              <div className="flex h-full items-center justify-center font-display text-6xl font-bold text-white/90">
                {post.category}
              </div>
            </div>
            <div className="prose prose-lg mt-8 max-w-none">
              <p className="text-lg leading-relaxed">
                <span className="float-left mr-3 mt-1 font-display text-6xl leading-none text-primary">
                  {post.body[0]?.content[0] ?? "I"}
                </span>
                {post.body[0]?.content.slice(1)}
              </p>
              {post.body.slice(1).map((sec) => (
                <div key={sec.heading}>
                  <h2 className="mt-8 text-2xl font-bold">
                    {sec.heading.split(" ").slice(0, -2).join(" ")}{" "}
                    <span className="text-primary">{sec.heading.split(" ").slice(-2).join(" ")}</span>
                  </h2>
                  <p className="mt-3 text-muted-foreground">{sec.content}</p>
                </div>
              ))}
            </div>
            <div className="my-8 rounded-2xl border-l-4 border-primary bg-surface p-6">
              <p className="text-lg italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
              <p className="mt-2 text-sm font-semibold text-primary">— Steve Jobs</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">Share this article</span>
                {[Facebook, Twitter, Linkedin, Link2].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ink-foreground hover:bg-primary" aria-label="share">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Tags</span>
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="h-14 w-14 rounded-full bg-primary" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Written by</div>
                <div className="text-lg font-bold">Clyde Walter</div>
                <p className="text-sm text-muted-foreground">UI/UX Designer &amp; Brand Designer passionate about creating user-centered digital experiences that solve real problems and drive results.</p>
              </div>
            </div>
          </article>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className={`mx-auto h-24 w-24 rounded-full bg-gradient-to-br ${accentFor(post.category)}`} />
              <div className="mt-3 font-semibold">Clyde Walter</div>
              <div className="text-xs text-muted-foreground">UI/UX Designer &amp; Brand Designer</div>
              <p className="mt-2 text-xs text-muted-foreground">Helping startups and brands turn ideas into intuitive digital experiences.</p>
              <Link to="/about" className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary hover:text-primary">
                View Profile <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-2 font-semibold"><span className="h-2 w-2 rounded-full bg-primary" /> Table of Contents</div>
              <ol className="space-y-2 text-sm">
                {post.body.map((s, i) => (
                  <li key={s.heading} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {i + 1}. {s.heading}
                  </li>
                ))}
              </ol>
            </div>
            <div className="ink-panel p-5 text-ink-foreground">
              <div className="text-xs text-white/60">Stay Inspired</div>
              <div className="text-lg font-bold">Get the latest <span className="text-primary">design</span> insights</div>
              <p className="mt-2 text-xs text-white/60">Tips, resources, and stories straight to your inbox.</p>
              <form className="mt-4 space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Enter your email" className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none" />
                <button className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Subscribe</button>
              </form>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-2 font-semibold"><Flame className="h-4 w-4 text-primary" /> Popular Posts</div>
              <ul className="space-y-3">
                {posts.slice(0, 3).map((p) => (
                  <li key={p.slug}>
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-sm font-semibold hover:text-primary">{p.title}</Link>
                    <div className="text-xs text-muted-foreground">{p.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">You Might Also Like</h2>
          <Link to="/blog" className="text-sm font-semibold text-primary">View All Articles →</Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="block overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
              <div className={`h-40 bg-gradient-to-br ${accentFor(p.category)}`} />
              <div className="p-5">
                <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{p.category}</span>
                <h3 className="mt-3 font-bold hover:text-primary">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
