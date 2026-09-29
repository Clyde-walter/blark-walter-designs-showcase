import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getPaystackConfig, verifyPaystackPayment } from "@/lib/paystack.functions";

const NGN_PER_USD = 1600;
const PAYSTACK_SCRIPT = "https://js.paystack.co/v1/inline.js";

type PaystackWindow = Window & {
  PaystackPop?: {
    setup: (options: Record<string, unknown>) => { openIframe: () => void };
  };
};

function loadPaystack(): Promise<PaystackWindow["PaystackPop"]> {
  return new Promise((resolve, reject) => {
    const w = window as PaystackWindow;
    if (w.PaystackPop) return resolve(w.PaystackPop);
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PAYSTACK_SCRIPT}"]`);
    const script = existing ?? document.createElement("script");
    script.src = PAYSTACK_SCRIPT;
    script.async = true;
    script.addEventListener("load", () => resolve((window as PaystackWindow).PaystackPop));
    script.addEventListener("error", () => reject(new Error("Could not load the payment window.")));
    if (!existing) document.body.appendChild(script);
  });
}

export function PaystackCheckout({
  planSlug,
  planName,
  priceUsd,
  featured,
}: {
  planSlug: string;
  planName: string;
  priceUsd: number;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const currency = "NGN" as const;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<{
    reference: string;
    amount: number;
    currency: string;
  } | null>(null);

  const fetchConfig = useServerFn(getPaystackConfig);
  const verify = useServerFn(verifyPaystackPayment);
  const { data: config } = useQuery({
    queryKey: ["paystack-config"],
    queryFn: () => fetchConfig({}),
    staleTime: Infinity,
    enabled: open,
  });

  useEffect(() => {
    if (!open) return;
    void loadPaystack().catch(() => undefined);
  }, [open]);

  const amount = Math.round(priceUsd * NGN_PER_USD);
  const display = `₦${amount.toLocaleString()}`;

  async function pay() {
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError("Please enter a valid email.");
    if (!config?.publicKey) return setError("Payments are not available right now.");

    setBusy(true);
    try {
      const paystack = await loadPaystack();
      if (!paystack) throw new Error("Could not load the payment window.");
      const reference = `bwd_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      await new Promise<void>((resolve, reject) => {
        const handler = paystack.setup({
          key: config.publicKey,
          email: email.trim(),
          amount: Math.round(amount * 100),
          currency,
          ref: reference,
          metadata: {
            customer_name: name.trim(),
            plan_slug: planSlug,
            plan_name: planName,
          },
          callback: () => resolve(),
          onClose: () => reject(new Error("Payment window closed before finishing.")),
        });
        handler.openIframe();
      });

      const result = await verify({ data: { reference, planSlug, planName } });
      if (result.status !== "success") throw new Error("The payment did not go through.");
      setReceipt({ reference, amount: result.amount, currency: result.currency });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function close() {
    setOpen(false);
    setTimeout(() => {
      setReceipt(null);
      setError("");
    }, 200);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3 pl-5 pr-1.5 text-sm font-semibold transition ${featured ? "bg-primary text-primary-foreground" : "bg-ink text-ink-foreground hover:bg-primary"}`}
      >
        Subscribe now
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>

      <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
        <DialogContent className="sm:max-w-md">
          {receipt ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
              <DialogHeader className="mt-4">
                <DialogTitle className="text-center">Payment received</DialogTitle>
                <DialogDescription className="text-center">
                  Thank you, {name}. Your {planName} plan is confirmed.
                </DialogDescription>
              </DialogHeader>
              <dl className="mt-6 space-y-2 rounded-xl border border-border bg-muted/40 p-4 text-left text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Plan</dt>
                  <dd className="font-semibold">{planName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd className="font-semibold">
                    {receipt.currency === "NGN" ? "₦" : "$"}
                    {receipt.amount.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Reference</dt>
                  <dd className="truncate font-mono text-xs">{receipt.reference}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                A welcome message will follow at {email} with your onboarding details.
              </p>
              <button
                onClick={close}
                className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-ink-foreground"
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              <DialogHeader>
                <DialogTitle>Subscribe to {planName}</DialogTitle>
                <DialogDescription>
                  Pay securely by card, bank transfer or USSD. Cancel any month.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="pay-name">
                    Full name
                  </label>
                  <input
                    id="pay-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="pay-email">
                    Email address
                  </label>
                  <input
                    id="pay-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <span className="text-sm font-medium">Pay in</span>
                  <div className="mt-1 inline-flex rounded-full border border-border bg-card p-1">
                    {(["NGN", "USD"] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCurrency(c)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${currency === c ? "bg-ink text-ink-foreground" : "text-muted-foreground"}`}
                      >
                        {c === "NGN" ? "Naira" : "Dollars"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-baseline justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
                  <span className="text-sm text-muted-foreground">Total today</span>
                  <span className="text-xl font-bold">{display}</span>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}
                {config && !config.configured && (
                  <p className="text-sm text-destructive">
                    Payments are not switched on yet. Please try again shortly.
                  </p>
                )}

                <button
                  onClick={pay}
                  disabled={busy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {busy ? "Processing…" : `Pay ${display}`}
                </button>
                <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secured by Paystack
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
