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
  const categories = ["All Projects", "Mobile App Design", "Web Design", "UI/UX Design", "Branding", "Others"];
  const counts = ["12", "05", "03", "06", "04", "02"];
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
              A collection of selected projects where strategy, creativity, and user-centered design come together to solve real problems and deliver measurable results.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                All Projects <LayoutGrid className="h-4 w-4" />
              </button>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white">
                Let's Work Together <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex gap-8 text-white">
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
              <ul className="space-y-2 text-sm">
                {categories.map((c, i) => (
                  <li key={c} className="flex items-center justify-between text-white/80">
                    <span className={i === 0 ? "text-primary" : ""}>{c}</span>
                    <span className="text-white/50">{counts[i]}</span>
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
            <span className="section-label">Featured Projects</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Some Things I've <span className="text-primary">Built</span>
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-5 pr-1 text-sm font-semibold text-primary-foreground">
            View All Projects
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
          </span>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.slug} className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
              <ProjectVisual project={p} />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm font-medium text-primary">{p.subtitle}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs">{t}</span>
                    ))}
                  </div>
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ink-foreground transition hover:bg-primary">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="ink-panel flex flex-col items-center gap-4 p-8 text-ink-foreground md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-primary text-primary">
              <Send className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-white/60">Like what you see?</div>
              <div className="text-2xl font-bold">
                Let's create something <span className="text-primary">amazing</span> together!
              </div>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground">
            Start Your Project
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
