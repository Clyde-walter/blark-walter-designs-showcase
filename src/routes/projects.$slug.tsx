import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, ExternalLink, Play, Clock, User, Calendar, Monitor, ShieldCheck, TrendingUp, MessageCircle, HeadphonesIcon, AlertCircle, CheckCircle2, Linkedin, Twitter, Facebook, Dribbble, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { projects, site } from "@/lib/portfolio-data";
import { supabase } from "@/integrations/supabase/client";


export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: p ? `${p.title} — ${p.subtitle} | Blark-walter Designs` : "Project — Blark-walter Designs" },
        { name: "description", content: p?.summary ?? "Case study by Blark-walter Designs." },
        { property: "og:title", content: p ? `${p.title} — ${p.subtitle}` : "Project" },
        { property: "og:description", content: p?.summary ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProjectDetailPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <Link to="/projects" className="mt-6 inline-flex text-primary">Back to projects</Link>
    </div>
  ),
});

function ProjectDetailPage() {
  const p = Route.useLoaderData();
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 6);

  // Enrich with DB extras (hero_image, gallery_images) if the project exists in the CMS
  const { data: extras } = useQuery({
    queryKey: ["project-extras", p.slug],
    queryFn: async () => {
      const { data } = await (supabase.from("projects" as never) as any)
        .select("hero_image,gallery_images").eq("slug", p.slug).maybeSingle();
      return data as { hero_image?: string; gallery_images?: string[] } | null;
    },
  });
  const { data: testimonial } = useQuery({
    queryKey: ["project-testimonial", p.slug],
    queryFn: async () => {
      const { data } = await (supabase.from("testimonials" as never) as any)
        .select("*").eq("is_published", true).ilike("project", `%${p.title}%`).limit(1).maybeSingle();
      return data as { name: string; role: string; quote: string } | null;
    },
  });
  const gallery = extras?.gallery_images ?? [];

  return (

    <>
      <section className="bg-ink py-10 text-ink-foreground">
        <div className="container-x">
          <nav className="text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> ›{" "}
            <Link to="/projects" className="text-primary">Projects</Link> ›{" "}
            <span>{p.title} - {p.subtitle}</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr_1fr]">
            <div>
              <span className="section-label">{p.category}</span>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                {p.title}<br />
                <span className="text-white/80">{p.subtitle}</span>
              </h1>
              <p className="mt-5 text-white/70">{p.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground">
                  Visit Website
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20"><ExternalLink className="h-4 w-4" /></span>
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold">
                  View Live Demo <Play className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Figma", "Photoshop", "Illustrator"].map((t) => (
                  <span key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70 sm:grid-cols-4">
                <MetaLine icon={Clock} label="Duration" value={p.duration} />
                <MetaLine icon={User} label="My Role" value={p.role} />
                <MetaLine icon={Calendar} label="Year" value={p.year} />
                <MetaLine icon={Monitor} label="Platform" value={p.platforms} />
              </div>
            </div>
            <div className="flex items-center justify-center">
              {extras?.hero_image ? (
                <img src={extras.hero_image} alt={p.title} className="max-h-[520px] w-full rounded-2xl object-contain" />
              ) : (
                <ProjectVisual project={p} />
              )}
            </div>

            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Project Overview
              </div>
              <p className="text-sm text-white/70">{p.summary}</p>
              <dl className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                {[
                  ["Client", p.client],
                  ["Industry", p.industry],
                  ["Project Type", p.category],
                  ["My Role", p.role],
                  ["Duration", p.duration],
                  ["Year", p.year],
                  ["Platforms", p.platforms],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-white/60">{k}</dt>
                    <dd className="font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="section-label">Project Overview</span>
            <p className="mt-4 text-muted-foreground">{p.summary} The goal was to create a seamless and secure experience that helps users manage their finances, make transactions, and track spending with ease.</p>
            <div className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: TrendingUp, t: "Easy Transactions", s: "Send, receive and transfer money instantly." },
                { icon: ShieldCheck, t: "Smart Analytics", s: "Visual insights to track spending and savings." },
                { icon: ShieldCheck, t: "Top Security", s: "Biometric login and advanced encryption." },
                { icon: HeadphonesIcon, t: "24/7 Support", s: "Get help anytime with in-app support." },
              ].map(({ icon: Icon, t, s }) => (
                <div key={t}>
                  <Icon className="h-6 w-6 text-primary" />
                  <div className="mt-2 text-sm font-semibold">{t}</div>
                  <p className="text-xs text-muted-foreground">{s}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <AlertCircle className="h-5 w-5 text-primary" /> The Problem
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.problem}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-primary" /> The Solution
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.solution}</p>
              </div>
            </div>
            <div className="mt-12">
              <span className="section-label">My Design Process</span>
              <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
                {[
                  ["Discover", "Research, competitor analysis and user interviews."],
                  ["Define", "User personas, journey mapping & problem identification."],
                  ["Ideate", "Wireframes, user flows and low-fidelity prototypes."],
                  ["Design", "High-fidelity UI design with a focus on usability & accessibility."],
                  ["Test & Refine", "Usability testing and iteration for the best experience."],
                ].map(([t, s], i) => (
                  <div key={t} className="text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-primary text-primary font-bold">{i + 1}</div>
                    <div className="mt-3 text-sm font-semibold">{t}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-2 font-semibold">
                <div className="h-2 w-2 rounded-full bg-primary" /> Technologies Used
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {["Figma", "Photoshop", "Illustrator"].map((n) => (
                  <div key={n}>
                    <div className="mx-auto grid h-11 w-11 place-items-center rounded-lg bg-accent font-bold text-primary">{n[0]}</div>
                    <div className="mt-1 text-xs">{n}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <div className="h-2 w-2 rounded-full bg-primary" /> Share This Project
              </div>
              <div className="flex gap-2">
                {[Linkedin, Dribbble, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ink-foreground hover:bg-primary" aria-label="share">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="ink-panel p-6">
              <div className="text-xs text-white/60">Have a similar project?</div>
              <div className="mt-1 text-xl font-bold text-ink-foreground">
                Let's create something <span className="text-primary">amazing</span> together!
              </div>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-5 pr-1 text-sm font-semibold text-primary-foreground">
                Let's Talk
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="container-x pb-12">
          <span className="section-label">Project Gallery</span>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.map((src, i) => (
              <a key={src + i} href={src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-border bg-card">
                <img src={src} alt={`${p.title} screen ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
              </a>
            ))}
          </div>
        </section>
      )}

      {testimonial && (
        <section className="container-x pb-12">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <Quote className="h-8 w-8 shrink-0 text-primary" />
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">"{testimonial.quote}"</p>
            </div>
            <div className="text-right">
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-xs text-muted-foreground">{testimonial.role}</div>
            </div>
          </div>
        </section>
      )}

      <section className="container-x pb-16">

        <span className="section-label">Related Projects</span>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.slice(0, 3).map((r) => (
            <Link key={r.slug} to="/projects/$slug" params={{ slug: r.slug }} className="group block">
              <ProjectVisual project={r} small />
              <h3 className="mt-3 font-semibold group-hover:text-primary">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function MetaLine({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-primary"><Icon className="h-3.5 w-3.5" /> {label}</div>
      <div className="text-white">{value}</div>
    </div>
  );
}
