import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, Check, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Pricing & Subscriptions — Blark-walter Designs" },
      { name: "description", content: "Monthly subscription plans for Brand Identity and Social Media Branding." },
      { property: "og:title", content: "Pricing & Subscriptions — Blark-walter Designs" },
      { property: "og:description", content: "Simple, transparent monthly pricing." },
    ],
    links: [{ rel: "canonical", href: "/subscriptions" }],
  }),
  component: SubscriptionsPage,
});

type Plan = {
  id: string; slug: string; category: string; name: string; tagline: string;
  price_monthly: number; currency: string; features: string[]; is_featured: boolean; sort: number;
};

function SubscriptionsPage() {
  const [tab, setTab] = useState<"brand-identity" | "social-media">("brand-identity");
  const { data, isLoading } = useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subscription_plans" as never).select("*").eq("is_published", true).order("sort");
      if (error) throw error;
      return (data as any as Plan[]) ?? [];
    },
  });
  const plans = (data ?? []).filter((p) => p.category === tab);

  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="max-w-3xl">
          <span className="section-label">Subscriptions</span>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Design On <span className="text-primary">Retainer</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Predictable monthly pricing for teams that need consistent design output. Cancel anytime.
          </p>
        </div>
        <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
          {(["brand-identity", "social-media"] as const).map((c) => (
            <button key={c} onClick={() => setTab(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${tab === c ? "bg-ink text-ink-foreground" : "text-muted-foreground"}`}>
              {c === "brand-identity" ? "Brand Identity" : "Social Media"}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        {isLoading ? (
          <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.id} className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${p.is_featured ? "border-primary bg-card shadow-xl" : "border-border bg-card"}`}>
                {p.is_featured && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold font-display">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${p.price_monthly}</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" search={{ plan: p.slug }} className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3 pl-5 pr-1.5 text-sm font-semibold transition ${p.is_featured ? "bg-primary text-primary-foreground" : "bg-ink text-ink-foreground hover:bg-primary"}`}>
                  Get Started
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
                </Link>
              </div>
            ))}
            {plans.length === 0 && <p className="col-span-full text-center text-sm text-muted-foreground">No plans in this category yet.</p>}
          </div>
        )}
      </section>

      <section className="container-x pb-16">
        <div className="ink-panel flex flex-col items-start gap-4 p-8 text-ink-foreground md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-bold font-display">Need something custom?</div>
            <p className="mt-1 text-sm text-white/70">Every business is different — let's build a plan that fits.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground">
            Talk to Clyde <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
