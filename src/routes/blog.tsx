import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Search, Edit3, Users, Globe, Flame, Tag } from "lucide-react";
import { Portrait } from "@/components/site/Portrait";
import { posts, site } from "@/lib/portfolio-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Blark-walter Designs" },
      { name: "description", content: "Insights, ideas and design stories on UI/UX, branding and product design by Clyde Walter." },
      { property: "og:title", content: "Blog — Blark-walter Designs" },
      { property: "og:description", content: "Thoughts on UI/UX design, branding, product strategy and the creative process." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = [
  ["All Articles", "25"],
  ["UI/UX Design", "08"],
  ["Product Design", "04"],
  ["Branding", "05"],
  ["Web Design", "03"],
  ["Career & Growth", "03"],
  ["Tools & Resources", "02"],
];

const tagCloud = ["UI/UX", "Design Process", "Branding", "Mobile Design", "Web Design", "Productivity", "Figma", "User Research", "Career"];

function BlogPage() {
  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <span className="section-label">My Blog</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Insights, Ideas &amp;<br />
              <span className="text-primary">Design</span> Stories
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              Thoughts on UI/UX design, branding, product strategy, and the creative process. Real stories, practical tips, and insights to help you build better digital experiences.
            </p>
            <div className="mt-6 flex overflow-hidden rounded-full border border-border bg-card shadow-sm">
              <input type="search" placeholder="Search articles..." className="w-full bg-transparent px-5 py-3 text-sm outline-none" />
              <button className="grid w-14 place-items-center bg-primary text-primary-foreground"><Search className="h-4 w-4" /></button>
            </div>
          </div>
          <Portrait eager />
          <div className="grid gap-3">
            {[
              { Icon: Edit3, v: "25+", l: "Articles Published" },
              { Icon: Users, v: "5K+", l: "Readers Worldwide" },
              { Icon: Globe, v: "10+", l: "Topics Covered" },
            ].map(({ Icon, v, l }) => (
              <div key={l} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-bold">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="flex items-end justify-between">
          <span className="section-label">Latest Articles</span>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
                <div className={`h-48 bg-gradient-to-br ${accentFor(post.category)}`}>
                  <div className="flex h-full items-center justify-center font-display text-4xl font-bold text-white/90">
                    {post.category}
                  </div>
                </div>
                <div className="p-5">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{post.category}</span>
                  <h3 className="mt-3 text-lg font-bold leading-tight">
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="h-7 w-7 rounded-full bg-primary" />
                    <span className="font-semibold text-foreground">Clyde Walter</span>
                    <span>•</span><span>{post.date}</span><span>•</span><span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="space-y-6">
            <div className="ink-panel p-5 text-ink-foreground">
              <div className="mb-4 flex items-center gap-2 font-semibold">
                <Tag className="h-4 w-4 text-primary" /> Categories
              </div>
              <ul className="space-y-3 text-sm">
                {categories.map(([c, n], i) => (
                  <li key={c} className="flex justify-between border-b border-white/10 pb-2 last:border-0">
                    <span className={i === 0 ? "text-primary" : "text-white/80"}>{c}</span>
                    <span className="text-white/50">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-2 font-semibold">
                <Flame className="h-4 w-4 text-primary" /> Popular Posts
              </div>
              <ul className="space-y-3">
                {posts.slice(0, 3).map((p) => (
                  <li key={p.slug} className="flex gap-3">
                    <div className={`h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br ${accentFor(p.category)}`} />
                    <div>
                      <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-sm font-semibold hover:text-primary">
                        {p.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">{p.date}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-2 font-semibold">
                <Tag className="h-4 w-4 text-primary" /> Tag Cloud
              </div>
              <div className="flex flex-wrap gap-2">
                {tagCloud.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 text-xs hover:border-primary hover:text-primary">{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="ink-panel flex flex-col gap-6 p-8 text-ink-foreground md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-white/60">Stay inspired with design insights</div>
            <div className="text-2xl font-bold">
              Subscribe to my <span className="text-primary">newsletter</span>
            </div>
            <p className="mt-1 text-sm text-white/60">Get the latest articles, design tips, and resources straight to your inbox.</p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Enter your email" className="w-full rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none" />
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export function accentFor(cat: string) {
  const map: Record<string, string> = {
    "UI/UX Design": "from-violet-600 to-fuchsia-600",
    "Product Design": "from-amber-500 to-orange-600",
    "Mobile Design": "from-rose-600 to-red-500",
    "Branding": "from-neutral-800 to-red-600",
  };
  return map[cat] ?? "from-indigo-600 to-blue-500";
}
