import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Target, HeartHandshake, ShieldCheck, Sparkles, GraduationCap, Briefcase, Zap, MessageSquare, Heart, User, Code2 } from "lucide-react";
import { Portrait } from "@/components/site/Portrait";
import { site, education, experience, frontendSkills } from "@/lib/portfolio-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Blark-walter Designs" },
      { name: "description", content: "Clyde Walter is a UI/UX and brand designer with 5+ years of experience building intuitive digital products and memorable brands." },
      { property: "og:title", content: "About Clyde Walter — Blark-walter Designs" },
      { property: "og:description", content: "Learn about Clyde Walter's design philosophy, values and journey." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <span className="section-label">About Me</span>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              Who is <span className="text-primary">Clyde Walter?</span>
            </h1>
            <p className="mt-5 text-muted-foreground">
              I'm a UI/UX and Brand Designer passionate about solving problems through thoughtful design. I create user-centered digital products, brand identities, and marketing visuals that help businesses connect with their audience and achieve measurable results.
            </p>
            <p className="mt-4 text-muted-foreground">
              With over 5 years of experience, I've worked with startups, entrepreneurs, and established brands to deliver designs that are not only beautiful but also functional and impactful.
            </p>
            <div className="mt-6 flex gap-6">
              {[["750+","Projects Completed"],["30+","Happy Clients"],["5+","Years of Experience"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-border px-4 py-2">📞 {site.phone}</span>
              <span className="rounded-full border border-border px-4 py-2">✉ {site.email}</span>
            </div>
            <p className="mt-6 font-script text-4xl">Clyde Walter</p>
          </div>
          <Portrait eager />
          <div className="grid gap-3">
            {[
              ["Name", site.designer],
              ["Email", site.email],
              ["Phone", site.phone],
              ["Location", site.location],
              ["Experience", "5+ Years"],
              ["Freelance", "Available"],
            ].map(([label, v]) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-sm font-semibold">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="section-label">My Values</span>
            <h2 className="mt-4 text-4xl font-bold">
              What I <span className="text-primary">Believe In</span>
            </h2>
            <div className="mt-8 space-y-5">
              {[
                { icon: Target, title: "Purposeful Design", text: "I design with intention, focusing on solving real problems and creating meaningful impact." },
                { icon: HeartHandshake, title: "User-Centered", text: "I put users first by understanding their needs and crafting intuitive experiences." },
                { icon: ShieldCheck, title: "Quality & Excellence", text: "I'm committed to delivering high-quality designs that exceed expectations." },
                { icon: Sparkles, title: "Growth Mindset", text: "I'm always learning, improving, and exploring new ideas to stay ahead in design." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="section-label">My Values</span>
            <h2 className="mt-4 text-4xl font-bold">
              What <span className="text-primary">Drives Me</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              I'm driven by the opportunity to turn ideas into experiences that make a difference. Every project is a chance to learn, solve problems, and create value for businesses and their users.
            </p>
            <p className="mt-4 text-muted-foreground">
              When I'm not designing, I enjoy teaching and creating content through my platform, <span className="font-semibold text-primary underline underline-offset-2">Learn with Blark</span>, where I share UI/UX and graphic design tips to help aspiring designers grow.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Target, t: "Design", s: "Solving problems with creativity" },
                { icon: GraduationCap, t: "Teach", s: "Empowering aspiring designers" },
                { icon: Sparkles, t: "Inspire", s: "Motivating through content & talks" },
                { icon: Zap, t: "Innovate", s: "Exploring new ideas and trends" },
              ].map(({ icon: Icon, t, s }) => (
                <div key={t} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{t}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <span className="section-label">My Journey</span>
        <h2 className="mt-4 text-4xl font-bold">
          My <span className="text-primary">Education &amp; Work Journey</span>
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <JourneyList title="Education" icon={GraduationCap} items={education} />
          <JourneyList title="Work Experience" icon={Briefcase} items={experience} />
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <span className="section-label">Frontend Development</span>
            <h2 className="mt-4 text-4xl font-bold">
              Design That <span className="text-primary">Ships</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              I don't just hand off mockups. I build the interfaces I design — production-ready, accessible and fast.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {frontendSkills.map((s) => (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary"><Code2 className="h-5 w-5" /></div>
                <div className="mt-3 text-sm font-semibold">{s.name}</div>
                <div className="text-xs text-primary">{s.level}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="ink-panel p-10">
          <span className="section-label">My Promise</span>
          <h2 className="mt-4 text-4xl font-bold text-ink-foreground">
            What I <span className="text-primary">Bring</span> to the Table
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Target, t: "Strategic Thinking", s: "I align design with business goals to deliver real results." },
              { icon: User, t: "Attention to Detail", s: "I focus on every detail to ensure a polished outcome." },
              { icon: Zap, t: "Fast & Reliable", s: "I respect deadlines and deliver quality on time." },
              { icon: MessageSquare, t: "Clear Communication", s: "I keep clients updated and involved at every step." },
              { icon: Heart, t: "Client Satisfaction", s: "I'm dedicated to building lasting relationships." },
            ].map(({ icon: Icon, t, s }) => (
              <div key={t} className="text-center">
                <Icon className="mx-auto h-10 w-10 text-primary" />
                <div className="mt-3 font-semibold text-ink-foreground">{t}</div>
                <p className="mt-1 text-sm text-white/60">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function JourneyList({ title, icon: Icon, items }: { title: string; icon: any; items: any[] }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2 text-lg font-semibold">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </span>
        {title}
      </div>
      <ol className="relative space-y-4 border-l-2 border-border pl-5">
        {items.map((it) => (
          <li key={it.title} className="relative">
            <span className="absolute -left-[26px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary" />
            <div className="flex flex-wrap items-start justify-between gap-2 rounded-2xl border border-border bg-card p-4">
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-muted-foreground">{it.org}</div>
              </div>
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-ink-foreground">{it.when}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
