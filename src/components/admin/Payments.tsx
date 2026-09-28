import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type PaymentRow = {
  id: string;
  reference: string;
  customer_name: string;
  customer_email: string;
  plan_name: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
};

export function PaymentsView() {
  const { data, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as PaymentRow[];
    },
  });

  const rows = data ?? [];
  const successful = rows.filter((r) => r.status === "success");
  const totals = successful.reduce<Record<string, number>>((acc, r) => {
    acc[r.currency] = (acc[r.currency] ?? 0) + Number(r.amount);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Payments</h2>
        <p className="text-sm text-muted-foreground">
          Subscription payments received through Paystack.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">Successful payments</div>
          <div className="mt-2 text-2xl font-semibold">{successful.length}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">Total received</div>
          <div className="mt-2 text-2xl font-semibold">
            {Object.keys(totals).length
              ? Object.entries(totals)
                  .map(([c, v]) => `${c === "NGN" ? "₦" : "$"}${v.toLocaleString()}`)
                  .join(" · ")
              : "—"}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">All records</div>
          <div className="mt-2 text-2xl font-semibold">{rows.length}</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        {isLoading ? (
          <div className="grid place-items-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No payments yet.</p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Reference</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.customer_name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{r.customer_email}</div>
                  </td>
                  <td className="px-4 py-3">{r.plan_name || "—"}</td>
                  <td className="px-4 py-3 font-semibold">
                    {r.currency === "NGN" ? "₦" : "$"}
                    {Number(r.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.status === "success" ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {r.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
