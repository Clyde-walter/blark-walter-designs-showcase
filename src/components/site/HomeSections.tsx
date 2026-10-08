import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote, Lightbulb, PenTool, Code2, Rocket } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { projects as fallbackProjects, testimonials as fallbackTestimonials } from "@/lib/portfolio-data";
import { usePublishedProjects, usePublishedTestimonials } from "@/lib/public-content";

function useAutoplay(api: CarouselApi | undefined, ms = 4500) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    const id = window.setInterval(() => api.scrollNext(), ms);
    return () => {
      window.clearInterval(id);
      api.off("select", onSelect);
    };
  }, [api, ms]);
  return { index, count };
}

function Dots({ api, index, count }: { api?: CarouselApi; index: number; count: number }) {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => api?.scrollTo(i)}
          className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-border"}`}
        />
      ))}
    </div>
  );
}

export function FeaturedCarousel() {
  const { data } = usePublishedProjects();
  const items = (data ?? fallbackProjects).slice(0, 8);
  const [api, setApi] = useState<CarouselApi>();
  const { index, count } = useAutoplay(api);
  return (
    <section className="container-x py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="section-label">Featured Work</span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Recent <span className="text-primary">Highlights</span>
          </h2>
        </div>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          See everything <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="mt-8">
        <CarouselContent>
          {items.map((p) => (
            <CarouselItem key={p.slug} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block rounded-2xl border border-border bg-card p-3 transition hover:border-primary hover:shadow-lg">
                <ProjectVisual project={p} />
                <div className="px-1 pb-1 pt-3">
                  <h3 className="font-semibold group-hover:text-primary">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 hidden md:flex" />
        <CarouselNext className="right-2 hidden md:flex" />
      </Carousel>
      <Dots api={api} index={index} count={count} />
    </section>
  );
}

const steps = [
  { icon: Lightbulb, title: "Discover", text: "We talk goals, audience and what success looks like." },
  { icon: PenTool, title: "Design", text: "Wireframes, brand direction and polished UI screens." },
  { icon: Code2, title: "Build", text: "Fast, responsive websites and apps built to scale." },
  { icon: Rocket, title: "Launch", text: "Go live, measure results and keep improving." },
];

export function ProcessSection() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container-x">
        <div className="text-center">
          <span className="section-label">How I Work</span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            A Simple <span className="text-primary">4-Step Process</span>
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
              <span className="absolute right-5 top-4 font-display text-4xl font-bold text-primary/15">0{i + 1}</span>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsCarousel() {
  const { data } = usePublishedTestimonials();
  const items = (data ?? fallbackTestimonials) as { name: string; role: string; quote: string }[];
  const [api, setApi] = useState<CarouselApi>();
  const { index, count } = useAutoplay(api, 6000);
  return (
    <section className="container-x py-16 md:py-20">
      <div className="ink-panel px-6 py-12 text-ink-foreground md:px-16">
        <div className="text-center">
          <span className="section-label">Client Love</span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            What Clients <span className="text-primary">Say</span>
          </h2>
        </div>
        <Carousel setApi={setApi} opts={{ loop: true }} className="mx-auto mt-8 max-w-3xl">
          <CarouselContent>
            {items.map((t) => (
              <CarouselItem key={t.name}>
                <div className="text-center">
                  <Quote className="mx-auto h-10 w-10 text-primary" />
                  <p className="mt-4 text-lg leading-relaxed sm:text-xl">"{t.quote}"</p>
                  <div className="mt-5 font-semibold">{t.name}</div>
                  <div className="text-sm opacity-70">{t.role}</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Dots api={api} index={index} count={count} />
        <div className="mt-6 text-center">
          <Link to="/testimonials" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Read all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
