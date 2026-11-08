import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CheckCircle2, Circle, ExternalLink, Loader2, Search } from "lucide-react";
import { trackOrder } from "@/lib/orders.functions";

const STEPS = [
  { id: "received", label: "Received" },
  { id: "in_progress", label: "In progress" },
  { id: "in_review", label: "In review" },
  { id: "delivered", label: "Delivered" },
];

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Blark-walter Designs" },
      { name: "description", content: "Check the status of your project or template order with Blark-walter Designs." },
      { property: "og:title", content: "Track Your Order — Blark-walter Designs" },
      { property: "og:description", content: "See where your design project or template purchase stands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TrackPage,
});

type Order = Awaited<ReturnType<typeof trackOrder>>["orders"][number];

function TrackPage() {
  const track = useServerFn(trackOrder);
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await track({ data: { reference, email } });
      setOrders(res.orders);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-x max-w-3xl py-12 sm:py-16">
      <span className="font-script text-2xl text-primary">Client portal</span>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Track your order</h1>
      <p className="mt-3 text-muted-foreground">
        Enter the order code (or payment reference) from your email and the email you used.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input required value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Order code e.g. BW-1A2B3C4D" className="rounded-full border border-border bg-background px-4 py-3 text-sm" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="rounded-full border border-border bg-background px-4 py-3 text-sm" />
        <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Track
        </button>
      </form>

      {orders && orders.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No order found with those details. Double-check the code and email.
        </p>
      )}

      {orders?.map((o) => {
        const idx = STEPS.findIndex((s) => s.id === o.status);
        return (
          <article key={o.reference} className="mt-8 rounded-3xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">{o.item_type}</div>
                <h2 className="font-display text-2xl font-bold">{o.item_title}</h2>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 font-mono text-xs">{o.reference}</span>
            </div>
            <ol className="mt-6 grid gap-3 sm:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.id} className={`flex items-center gap-2 text-sm ${i <= idx ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {i <= idx ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5" />}
                  {s.label}
                </li>
              ))}
            </ol>
            {o.notes && <p className="mt-5 whitespace-pre-line text-sm text-muted-foreground">{o.notes}</p>}
            {o.delivery_url && (
              <a href={o.delivery_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline">
                Open preview / delivery <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <p className="mt-4 text-xs text-muted-foreground">Last updated {new Date(o.updated_at).toLocaleString()}</p>
          </article>
        );
      })}
    </div>
  );
}
