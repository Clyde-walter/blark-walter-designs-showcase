import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Download, Star, Briefcase, User, Circle, PenTool, Smartphone, Monitor, Layout, Frame, BadgeCheck, Type, Share2, Send } from "lucide-react";
import { Portrait } from "@/components/site/Portrait";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { site, services, tools, education, experience, projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blark-walter Designs — Clyde Walter, UI/UX & Brand Designer" },
      { name: "description", content: "I help startups and businesses transform ideas into intuitive digital experiences and memorable brand identities." },
      { property: "og:title", content: "Blark-walter Designs — Clyde Walter" },
      { property: "og:description", content: "UI/UX and brand design portfolio by Clyde Walter." },
    ],
  }),
  component: HomePage,
});

const serviceIcons = [PenTool, Smartphone, Monitor, Layout, Frame, BadgeCheck, Type, Share2];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <span className="section-label">Hello! I'm</span>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
              Clyde <span className="text-primary">Walter</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-foreground">UI/UX Designer &amp; Brand Designer</p>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              I help startups and businesses transform ideas into intuitive digital experiences and memorable brand identities.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                View My Work
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
                Hire Me <Download className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#f97066", "#fda29b", "#f59e0b", "#84cc16"].map((c, i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-background" style={{ background: c }} />
                ))}
              </div>
              <div className="grid h-11 min-w-11 place-items-center rounded-full bg-primary px-3 text-sm font-bold text-primary-foreground">50+</div>
              <div className="text-sm leading-tight text-muted-foreground">
                <div className="font-semibold text-foreground">Happy Clients</div>
                Worldwide
              </div>
            </div>
          </div>
          <Portrait eager className="lg:max-w-sm" />
          <div className="grid gap-3">
            <StatCard icon={User} value="5+" label="Years of Experience" />
            <StatCard icon={Briefcase} value="50+" label="Projects Completed" />
            <StatCard icon={Star} value="30+" label="Happy Clients" />
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <Circle className="h-3 w-3 fill-primary text-primary" />
              <p className="text-sm font-medium leading-tight">Available for<br />freelance projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills ticker bar */}
      <section className="container-x">
        <div className="ink-panel flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-5 text-sm font-semibold text-ink-foreground sm:text-base">
          {["UI/UX Design", "Frontend Development", "Web Design", "Mobile App Design", "Branding", "Prototyping"].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-4">
              {s}
              {i < arr.length - 1 && <span className="text-primary">+</span>}
            </span>
          ))}
        </div>
      </section>

      {/* About + Services */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="section-label">About Me</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Who is <span className="text-primary">Clyde Walter?</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              I'm a UI/UX and Brand Designer passionate about solving problems through thoughtful design. I create user-centered digital products, brand identities, and marketing visuals that help businesses connect with their audience and achieve measurable results.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["750+", "Projects Completed"],
                ["25+", "Industry Covered"],
                ["16+", "Awards Received"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold text-foreground">{v}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-border px-4 py-2">📞 {site.phone}</span>
              <span className="rounded-full border border-border px-4 py-2">✉ {site.email}</span>
            </div>
            <p className="mt-6 font-script text-4xl text-foreground">Clyde Walter</p>
          </div>
          <div>
            <span className="section-label">My Services</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Services I <span className="text-primary">Provide</span>
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {services.slice(0, 8).map((s, i) => {
                const Icon = serviceIcons[i] ?? PenTool;
                return (
                  <div key={s.name} className="group rounded-2xl border border-border bg-card p-5 text-center transition hover:border-primary hover:shadow-md">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-tight">{s.name}</p>
                  </div>
                );
              })}
            </div>
            <Link to="/services" className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary">
              View All Services
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools + Education */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <span className="section-label">My Favorite Tools</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Design Tools That <span className="text-primary">Power My Work</span>
            </h2>
            <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
              {tools.map((t) => (
                <div key={t.name} className="rounded-xl bg-card p-3 text-center shadow-sm">
                  <div className="mx-auto grid h-11 w-11 place-items-center rounded-lg bg-accent font-display font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div className="mt-3 text-lg font-bold">{t.mastery}%</div>
                  <div className="text-xs text-muted-foreground">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="section-label">My Experience</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Education &amp; Work <span className="text-primary">Experience</span>
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <TimelineCard title="Education" items={education} />
              <TimelineCard title="Work Experience" items={experience} />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="container-x py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-label">My Portfolio</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Let's Have a <span className="text-primary">Look at My Portfolio</span>
            </h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-5 pr-1 text-sm font-semibold text-primary-foreground">
            View All Projects
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <ProjectVisual project={p} />
              <div className="mt-3">
                <h3 className="text-lg font-semibold group-hover:text-primary">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="container-x pb-16">
        <div className="ink-panel grid gap-6 p-8 text-ink-foreground sm:grid-cols-5">
          <div>
            <div className="text-sm text-primary">Achievement Awards</div>
            <div className="mt-1 text-2xl font-bold font-display">
              My Award Winning <span className="text-primary">Journey</span>
            </div>
          </div>
          {[
            ["01", "Design Excellence Award", "2023"],
            ["02", "Best UI/UX Design Award", "2022"],
            ["03", "Creative Designer Award", "2021"],
            ["04", "Top Freelancer Award", "2020"],
          ].map(([n, name, year]) => (
            <div key={n} className="text-center">
              <div className="font-display text-2xl font-bold text-primary">{n}</div>
              <div className="mt-1 text-sm font-semibold">{name}</div>
              <div className="text-xs text-white/60">{year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABand title="Let's Work Together" text="Have a project in mind or want to work together? I'd love to hear from you." buttonLabel="Let's Discuss Your Project" />
    </>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xl font-bold leading-none">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function TimelineCard({ title, items }: { title: string; items: { title: string; org: string; when: string }[] }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 font-semibold">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-primary">
          <Briefcase className="h-4 w-4" />
        </span>
        {title}
      </div>
      <ol className="relative space-y-4 border-l border-border pl-4">
        {items.map((it) => (
          <li key={it.title} className="relative">
            <span className="absolute -left-[21px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-primary" />
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold">{it.title}</div>
                <div className="text-xs text-muted-foreground">{it.org}</div>
              </div>
              <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium text-ink-foreground whitespace-nowrap">{it.when}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CTABand({ title, text, buttonLabel }: { title: string; text: string; buttonLabel: string }) {
  return (
    <section className="container-x pb-16">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-primary text-primary">
            <Send className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">{title}</div>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        </div>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink py-3 pl-6 pr-1.5 text-sm font-semibold text-ink-foreground transition hover:bg-primary">
          {buttonLabel}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="h-4 w-4" /></span>
        </Link>
      </div>
    </section>
  );
}
