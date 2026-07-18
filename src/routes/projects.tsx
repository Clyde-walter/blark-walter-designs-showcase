import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Grid3x3, LayoutGrid, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Portrait } from "@/components/site/Portrait";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Blark-walter Designs" },
      { name: "description", content: "Selected UI/UX, mobile app and brand identity projects by Clyde Walter." },
      { property: "og:title", content: "Projects — Blark-walter Designs" },
      { property: "og:description", content: "A collection of selected projects where strategy, creativity, and user-centered design come together." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const categories = ["All Projects", "Website", "UI/UX Design", "Graphics Design", "Logo"] as const;
  const [active, setActive] = useState<(typeof categories)[number]>("All Projects");
  const counts = useMemo(() => {
    const all = projects.length;
    const by = (c: string) => projects.filter((p) => p.category === c).length;
    return {
      "All Projects": all,
      "Website": by("Website"),
      "UI/UX Design": by("UI/UX Design"),
      "Graphics Design": by("Graphics Design"),
      "Logo": by("Logo"),
    } as Record<string, number>;
  }, []);
  const filtered = active === "All Projects" ? projects : projects.filter((p) => p.category === active);
  return (
    <>
      <section className="bg-ink pt-10 pb-14 text-ink-foreground md:pt-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <span className="section-label">My Work</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Projects That<br />
              Create <span className="text-primary">Impact</span>
            </h1>
            <p className="mt-5 max-w-md text-white/70">
              A collection of selected projects across full-stack development, UI/UX design, brand identity and logo design — where strategy, creativity and craft come together to solve real problems.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => setActive("All Projects")} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                All Projects <LayoutGrid className="h-4 w-4" />
              </button>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white">
                Let's Work Together <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-white sm:gap-8">
              {[["75+","Projects Completed"],["30+","Happy Clients"],["5+","Years of Experience"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold">{v}</div>
                  <div className="text-xs text-white/60">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <Portrait eager />
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/5 p-5 backdrop-blur">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <Grid3x3 className="h-4 w-4 text-primary" /> Categories
              </div>
              <ul className="space-y-1 text-sm">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setActive(c)}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition ${active === c ? "bg-primary/15 text-primary" : "text-white/80 hover:bg-white/5"}`}
                    >
                      <span>{c}</span>
                      <span className="text-white/50">{String(counts[c] ?? 0).padStart(2, "0")}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 backdrop-blur">
              <div className="flex-1">
                <div className="text-xs text-white/60">Have a project in mind?</div>
                <div className="text-sm font-semibold">Let's discuss your idea and bring it to life.</div>
              </div>
              <Link to="/contact" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink"><ArrowRight className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-label">{active === "All Projects" ? "All Projects" : active}</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Some Things I've <span className="text-primary">Built</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${active === c ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:border-primary"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.slug} className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
              <ProjectVisual project={p} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm font-medium text-primary">{p.subtitle}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{p.category}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Visit live site"
                        className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Link to="/projects/$slug" params={{ slug: p.slug }} aria-label="View case study" className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ink-foreground transition hover:bg-primary">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">No projects in this category yet — check back soon.</p>
        )}
      </section>
