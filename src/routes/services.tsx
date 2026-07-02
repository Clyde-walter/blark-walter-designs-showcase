import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Download, Star, Briefcase, User, Circle, PenTool, Smartphone, Monitor, Layout, Frame, BadgeCheck, Type, Share2, LayoutGrid, Printer, Search, ClipboardList, Lightbulb, Palette, Rocket, ChevronRight } from "lucide-react";
import { Portrait } from "@/components/site/Portrait";
import { services, site } from "@/lib/portfolio-data";
import { CTABand } from "./index";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Blark-walter Designs" },
      { name: "description", content: "End-to-end design services: UI/UX, mobile app, web, brand identity, logo, and marketing design." },
      { property: "og:title", content: "Services — Blark-walter Designs" },
      { property: "og:description", content: "From product design to brand identity, end-to-end design solutions." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const icons = [PenTool, Smartphone, Monitor, Layout, Frame, BadgeCheck, Type, Share2, LayoutGrid, Printer];

function ServicesPage() {
  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <span className="section-label">My Services</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              What I Can Do<br />
              <span className="text-primary">For You</span>
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              I help startups, businesses, and brands transform ideas into intuitive digital products and memorable visual identities through user-centered design.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                View My Work <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold">
                Hire Me <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
          <Portrait eager />
          <div className="grid gap-3">
            {[
              { Icon: User, v: "5+", l: "Years of Experience" },
              { Icon: Briefcase, v: "750+", l: "Projects Completed" },
              { Icon: Star, v: "30+", l: "Happy Clients" },
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
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <Circle className="h-3 w-3 fill-primary text-primary" />
              <p className="text-sm font-medium">Available for freelance projects</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-label">Services I Provide</span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              My <span className="text-primary">Services</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            From product design to brand identity, I provide end-to-end design solutions tailored to your goals and your users' needs.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s, i) => {
            const Icon = icons[i] ?? PenTool;
            return (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            Discuss Your Project
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="h-4 w-4" /></span>
          </a>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="section-label">My Process</span>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                How I <span className="text-primary">Work</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              A clear, collaborative process that ensures we're aligned at every step and deliver the best results.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { n: "01", icon: Search, t: "Discover", s: "Understanding your goals, business, and user needs." },
              { n: "02", icon: ClipboardList, t: "Research", s: "Gathering insights, analyzing competitors and users." },
              { n: "03", icon: Layout, t: "Wireframe", s: "Structuring the layout and mapping user flow." },
              { n: "04", icon: Palette, t: "Design", s: "Creating visual interfaces with a focus on clarity." },
              { n: "05", icon: Rocket, t: "Test & Deliver", s: "Testing for usability and delivering the final product." },
            ].map(({ n, icon: Icon, t, s }, i, arr) => (
              <div key={n} className="relative text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-primary bg-background text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-3 font-display text-sm font-bold text-muted-foreground">{n}</div>
                <div className="mt-1 font-semibold">{t}</div>
                <p className="mx-auto mt-1 max-w-[180px] text-xs text-muted-foreground">{s}</p>
                {i < arr.length - 1 && (
                  <ChevronRight className="absolute right-0 top-6 hidden h-5 w-5 translate-x-1/2 text-primary lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-16">
        <CTABand title="Let's build something amazing together!" text="Have a project in mind?" buttonLabel="Let's Talk" />
      </div>
    </>
  );
}
