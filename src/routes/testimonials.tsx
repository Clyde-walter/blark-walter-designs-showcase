import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Grid3x3, Star, Briefcase, ThumbsUp, Award, Building2, GraduationCap, Heart, Home, Cpu, ShoppingCart, Quote, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Portrait } from "@/components/site/Portrait";
import { site, testimonials } from "@/lib/portfolio-data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Blark-walter Designs" },
      { name: "description", content: "Real feedback from real clients about working with Clyde Walter and Blark-walter Designs." },
      { property: "og:title", content: "Testimonials — Blark-walter Designs" },
      { property: "og:description", content: "What businesses and founders say about working with Blark-walter Designs." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

const industries = [
  { name: "Fintech", icon: Building2 },
  { name: "Education", icon: GraduationCap },
  { name: "Healthcare", icon: Heart },
  { name: "Real Estate", icon: Home },
  { name: "Technology", icon: Cpu },
  { name: "E-commerce", icon: ShoppingCart },
];

function TestimonialsPage() {
  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <span className="section-label">Client Testimonials</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              What My Clients Are <span className="text-primary">Saying</span>
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              Real feedback from real clients. Here's what businesses and founders say about working with me and the results we've achieved together.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                Work With Me <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary">
                View All Projects <Grid3x3 className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <Portrait eager />
          <div className="grid gap-3">
            {[
              { Icon: Star, v: "50+", l: "Happy Clients Worldwide" },
              { Icon: Briefcase, v: "750+", l: "Projects Completed" },
              { Icon: Award, v: "5+", l: "Years of Experience" },
              { Icon: ThumbsUp, v: "100%", l: "Client Satisfaction Rate" },
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

      <section className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-end">
          <div>
            <span className="section-label">Client Reviews</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Words That <span className="text-primary">Inspire</span>
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              I take pride in building strong relationships and delivering work that makes an impact. Here's what some of my amazing clients have to say.
            </p>
            <div className="flex shrink-0 gap-2">
              <button className="grid h-10 w-10 place-items-center rounded-full border border-border"><ChevronLeft className="h-4 w-4" /></button>
              <button className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <article key={t.name} className="relative rounded-2xl border border-border bg-card p-6">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/30" />
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-red-800" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                  <div className="mt-1 flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
                    <span className="ml-1 text-xs">5.0</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{t.quote}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="text-muted-foreground">Project: <span className="font-semibold text-primary">{t.project}</span></span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-border"><ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <span className="section-label">Industries I've Worked With</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Trusted By Different <span className="text-primary">Industries</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {industries.map(({ name, icon: Icon }) => (
              <div key={name} className="rounded-2xl border border-border bg-card p-5 text-center transition hover:border-primary">
                <Icon className="mx-auto h-8 w-8 text-primary" />
                <div className="mt-3 text-xs font-semibold">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="ink-panel grid gap-8 p-8 text-ink-foreground lg:grid-cols-[1fr_1.2fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-white/5">
            <div className="aspect-video bg-gradient-to-br from-primary/40 to-purple-700/40" />
            <button className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground"><Play className="h-6 w-6 fill-current" /></span>
            </button>
            <div className="absolute bottom-3 left-3 text-xs">Play Video</div>
            <div className="absolute bottom-3 right-3 text-xs">02:34</div>
          </div>
          <div>
            <span className="section-label">Video Testimonials</span>
            <h3 className="mt-4 text-3xl font-bold">
              Hear It Directly From My <span className="text-primary">Clients</span>
            </h3>
            <p className="mt-3 text-sm text-white/60">
              Real stories from real people about their experience working with me.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-5 pr-1 text-sm font-semibold text-primary-foreground">
              Watch More Testimonials
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
            </button>
          </div>
          <div className="space-y-4 border-l border-white/10 pl-6">
            {testimonials.slice(3, 5).map((t) => (
              <div key={t.name}>
                <Quote className="h-5 w-5 text-primary" />
                <p className="mt-1 text-sm text-white/80">{t.quote}</p>
                <div className="mt-2 text-xs">
                  <span className="text-primary">— {t.name}</span>
                  <div className="text-white/50">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 md:flex-row md:justify-between">
          <div>
            <h3 className="text-2xl font-bold">
              Ready to create something <span className="text-primary">amazing</span> together?
            </h3>
            <p className="text-sm text-muted-foreground">Let's bring your ideas to life.</p>
          </div>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground">
            Let's Talk
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
          </a>
        </div>
      </section>
    </>
  );
}
