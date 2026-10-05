import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowRight, Code2, ExternalLink, Search } from "lucide-react";
import { formatNaira, publishedTemplatesQuery, type Template } from "@/lib/templates";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Website Templates for Sale — Blark-walter Designs" },
      {
        name: "description",
        content:
          "Buy production-ready, code-complete website templates by Clyde Walter. React, Tailwind and TypeScript, ready to launch.",
      },
      { property: "og:title", content: "Website Templates for Sale — Blark-walter Designs" },
      {
        property: "og:description",
        content: "Production-ready website templates with clean code, ready to customise and launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplatesPage,
});

export function TemplateCover({ t, className = "h-52" }: { t: Template; className?: string }) {
  if (t.hero_image) {
    return <img src={t.hero_image} alt={t.title} loading="lazy" className={`w-full object-cover ${className}`} />;
  }
  return (
    <div className={`grid w-full place-items-center bg-gradient-to-br from-primary/80 to-ink ${className}`}>
      <span className="font-display text-4xl font-bold text-primary-foreground">
        {t.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
      </span>
    </div>
  );
}

function TemplatesPage() {
  const { data: templates = [], isLoading } = useQuery(publishedTemplatesQuery());
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const cats = useMemo(() => ["All", ...Array.from(new Set(templates.map((t) => t.category)))], [templates]);
  const list = templates.filter(
    (t) =>
      (cat === "All" || t.category === cat) &&
      (q === "" ||
        `${t.title} ${t.tagline} ${t.tech_stack.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="container-x py-12 sm:py-16">
      <div className="max-w-2xl">
        <span className="font-script text-2xl text-primary">Ready to launch</span>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          Website Templates, <span className="text-primary">Code Ready</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Professionally designed and fully coded templates. Buy once, customise and launch your site fast.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-full border border-border px-4 py-2 md:w-72">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      {isLoading ? (
        <p className="mt-12 text-muted-foreground">Loading templates…</p>
      ) : list.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border p-10 text-center">
          <Code2 className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 font-display text-lg font-semibold">New templates are coming soon</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Want something custom in the meantime?{" "}
            <Link to="/contact" className="text-primary underline">Let's talk</Link>.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <article key={t.id} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
              <Link to="/templates/$slug" params={{ slug: t.slug }} className="relative block">
                <TemplateCover t={t} />
                {t.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {t.badge}
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">{t.category}</div>
                <h2 className="mt-1 font-display text-xl font-bold">{t.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.tech_stack.slice(0, 4).map((s) => (
                    <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs">{s}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <div>
                    <div className="font-display text-2xl font-bold">{formatNaira(t.price_usd)}</div>
                    <div className="text-xs text-muted-foreground">≈ ${t.price_usd}</div>
                  </div>
                  <div className="flex gap-2">
                    {t.live_demo_url && (
                      <a href={t.live_demo_url} target="_blank" rel="noreferrer" aria-label="Live demo" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Link to="/templates/$slug" params={{ slug: t.slug }} className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground hover:bg-primary">
                      Details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
