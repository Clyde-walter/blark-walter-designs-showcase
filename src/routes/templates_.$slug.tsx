import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { PaystackCheckout } from "@/components/site/PaystackCheckout";
import { formatNaira, publishedTemplatesQuery } from "@/lib/templates";
import { TemplateCover } from "@/components/site/TemplateCover";

export const Route = createFileRoute("/templates_/$slug")({
  head: () => ({
    meta: [
      { title: "Website Template — Blark-walter Designs" },
      { name: "description", content: "Template details, features, tech stack and pricing." },
      { property: "og:title", content: "Website Template — Blark-walter Designs" },
      { property: "og:description", content: "Production-ready website template with clean code." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplateDetail,
});

const included = [
  "Full source code",
  "Setup & deployment guide",
  "Fully responsive on all devices",
  "Free updates for this template",
];

function TemplateDetail() {
  const { slug } = Route.useParams();
  const { data = [], isLoading } = useQuery(publishedTemplatesQuery());
  const t = data.find((x) => x.slug === slug);
  const [shot, setShot] = useState<string | null>(null);

  if (isLoading) return <div className="container-x py-20 text-muted-foreground">Loading…</div>;
  if (!t)
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Template not found</h1>
        <Link to="/templates" className="mt-4 inline-block text-primary underline">Back to templates</Link>
      </div>
    );

  const images = [t.hero_image, ...t.gallery_images].filter(Boolean) as string[];
  const current = shot ?? images[0];

  return (
    <div className="container-x py-10 sm:py-14">
      <Link to="/templates" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All templates
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-border">
            {current ? (
              <img src={current} alt={t.title} className="aspect-video w-full object-cover" />
            ) : (
              <TemplateCover t={t} className="aspect-video" />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {images.map((src) => (
                <button key={src} onClick={() => setShot(src)} className={`shrink-0 overflow-hidden rounded-xl border-2 ${current === src ? "border-primary" : "border-transparent"}`}>
                  <img src={src} alt="" className="h-16 w-28 object-cover" />
                </button>
              ))}
            </div>
          )}

          <h2 className="mt-10 font-display text-2xl font-bold">About this template</h2>
          <p className="mt-3 whitespace-pre-line text-muted-foreground">{t.description || t.tagline}</p>

          {t.features.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl font-bold">Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24">
          {t.badge && <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{t.badge}</span>}
          <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">{t.category}</div>
          <h1 className="mt-1 font-display text-3xl font-bold">{t.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
          <div className="mt-5 font-display text-4xl font-bold">{formatNaira(t.price_usd)}</div>
          <div className="text-xs text-muted-foreground">≈ ${t.price_usd} · one-time payment</div>

          <PaystackCheckout
            planSlug={`template:${t.slug}`}
            planName={`Template: ${t.title}`}
            priceUsd={t.price_usd}
            featured
            buttonLabel="Buy template"
          />
          {t.live_demo_url && (
            <a href={t.live_demo_url} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold hover:border-primary">
              Live demo <ExternalLink className="h-4 w-4" />
            </a>
          )}

          {t.tech_stack.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-semibold">Tech stack</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.tech_stack.map((s) => <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs">{s}</span>)}
              </div>
            </div>
          )}
          <div className="mt-6">
            <div className="text-sm font-semibold">What's included</div>
            <ul className="mt-2 space-y-2">
              {included.map((i) => <li key={i} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 h-4 w-4 text-primary" />{i}</li>)}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">After payment, the code is sent to your email.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
