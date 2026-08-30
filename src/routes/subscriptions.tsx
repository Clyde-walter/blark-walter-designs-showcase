import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Sparkles,
  Loader2,
  Clock3,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Pricing & Subscriptions — Blark-walter Designs" },
      {
        name: "description",
        content: "Monthly subscription plans for Brand Identity and Social Media Branding.",
      },
      { property: "og:title", content: "Pricing & Subscriptions — Blark-walter Designs" },
      { property: "og:description", content: "Simple, transparent monthly pricing." },
    ],
    links: [{ rel: "canonical", href: "/subscriptions" }],
  }),
  component: SubscriptionsPage,
});

type Plan = {
  id: string;
  slug: string;
  category: string;
  name: string;
  tagline: string;
  price_monthly: number;
  currency: string;
  features: string[];
  is_featured: boolean;
  sort: number;
};

const fallbackPlans: Plan[] = [
  {
    id: "starter",
    slug: "starter",
    category: "brand-identity",
    name: "Starter",
    tagline: "A focused monthly design partner.",
    price_monthly: 850,
    currency: "USD",
    features: [
      "One active design request",
      "Brand or product design support",
      "Weekly progress updates",
      "Source files included",
    ],
    is_featured: false,
    sort: 1,
  },
  {
    id: "studio",
    slug: "studio",
    category: "brand-identity",
    name: "Studio",
    tagline: "The right pace for growing teams.",
    price_monthly: 1450,
    currency: "USD",
    features: [
      "Two active design requests",
      "Priority turnaround",
      "Weekly strategy call",
      "Design system foundations",
      "Unlimited revisions",
    ],
    is_featured: true,
    sort: 2,
  },
  {
    id: "partner",
    slug: "partner",
    category: "brand-identity",
    name: "Partner",
    tagline: "A full creative department on call.",
    price_monthly: 2400,
    currency: "USD",
    features: [
      "Three active design requests",
      "Dedicated creative direction",
      "Product and brand systems",
      "Async Slack support",
      "Monthly roadmap review",
    ],
    is_featured: false,
    sort: 3,
  },
  {
    id: "social-starter",
    slug: "social-starter",
    category: "social-media",
    name: "Social Starter",
    tagline: "A consistent visual rhythm for your feed.",
    price_monthly: 650,
    currency: "USD",
    features: [
      "12 branded social assets",
      "One active request",
      "Caption-ready exports",
      "Monthly content direction",
    ],
    is_featured: false,
    sort: 1,
  },
  {
    id: "social-studio",
    slug: "social-studio",
    category: "social-media",
    name: "Social Studio",
    tagline: "A complete social design engine.",
    price_monthly: 1100,
    currency: "USD",
    features: [
      "24 branded social assets",
      "Priority turnaround",
      "Campaign art direction",
      "Story and carousel templates",
      "Monthly content review",
    ],
    is_featured: true,
    sort: 2,
  },
  {
    id: "social-partner",
    slug: "social-partner",
    category: "social-media",
    name: "Social Partner",
    tagline: "High-volume creative for ambitious brands.",
    price_monthly: 1750,
    currency: "USD",
    features: [
      "Unlimited social requests",
      "Campaign concepting",
      "Motion-ready direction",
      "Dedicated creative direction",
      "Weekly content planning",
    ],
    is_featured: false,
    sort: 3,
  },
];

const faqs = [
  [
    "How does a retainer work?",
    "You send requests through a shared queue, and I work through them one at a time. You always know what is in progress and what is next.",
  ],
  [
    "How quickly will my request be ready?",
    "Most focused requests are delivered within 2 to 5 business days. Larger identity or product pieces are scoped with you before work begins.",
  ],
  [
    "Can I pause or cancel?",
    "Yes. Plans are month to month with no long-term contract. Pause when you have enough work completed and restart when you are ready.",
  ],
  [
    "Is development included?",
    "Design handoff and implementation guidance are included. Frontend development can be added to a custom plan when needed.",
  ],
] as const;

function SubscriptionsPage() {
  const [tab, setTab] = useState<"brand-identity" | "social-media">("brand-identity");
  const { data, isLoading } = useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscription_plans" as never)
        .select("*")
        .eq("is_published", true)
        .order("sort");
      if (error) throw error;
      return (data as any as Plan[]) ?? [];
    },
  });
  const plans = (data?.length ? data : fallbackPlans).filter((p) => p.category === tab);

  return (
    <>
      <section className="container-x pt-10 pb-8 md:pt-16 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div className="max-w-3xl">
            <span className="section-label">Subscriptions</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl md:text-7xl">
              A sharper brand, <span className="text-primary">every month.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              Flexible design support for teams who want momentum without the overhead of a
              full-time creative department.
            </p>
          </div>
          <div className="grid gap-3 border-l-2 border-primary/20 pl-5 text-sm">
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-primary" />
              <span>2-5 day typical turnaround</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span>Direct access to your designer</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Pause or cancel anytime</span>
            </div>
          </div>
        </div>
        <div className="mt-10 inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
          {(["brand-identity", "social-media"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-6 ${tab === c ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {c === "brand-identity" ? "Brand Identity" : "Social Media"}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        {isLoading && !data ? (
          <div className="grid place-items-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition-transform hover:-translate-y-1 sm:p-8 ${p.is_featured ? "border-primary bg-card shadow-xl shadow-primary/10" : "border-border bg-card"}`}
              >
                {p.is_featured && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold font-display">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-7 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    ${p.price_monthly.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  search={{ plan: p.slug }}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3 pl-5 pr-1.5 text-sm font-semibold transition ${p.is_featured ? "bg-primary text-primary-foreground" : "bg-ink text-ink-foreground hover:bg-primary"}`}
                >
                  Get Started
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
            {plans.length === 0 && (
              <p className="col-span-full text-center text-sm text-muted-foreground">
                No plans in this category yet.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="container-x pb-16">
        <div className="ink-panel flex flex-col items-start gap-4 p-8 text-ink-foreground md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-bold font-display">Need something custom?</div>
            <p className="mt-1 text-sm text-white/70">
              Every business is different — let's build a plan that fits.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground"
          >
            Talk to Clyde{" "}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-10 border-t border-border pt-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="section-label">Good to know</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Questions, answered.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              A simple working relationship, designed to keep your creative work moving.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {question}
                  <span className="text-2xl font-normal text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pt-3 text-sm leading-6 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
