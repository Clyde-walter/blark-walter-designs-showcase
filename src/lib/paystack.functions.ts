import { createServerFn } from "@tanstack/react-start";

/** The Paystack public key is publishable and safe to send to the browser. */
export const getPaystackConfig = createServerFn({ method: "GET" }).handler(async () => {
  const publicKey = process.env["PAYSTACK_PUBLIC_KEY"] ?? "";
  return { publicKey, configured: publicKey.length > 0 };
});

type VerifyInput = {
  reference: string;
  planSlug: string;
  planName: string;
};

export const verifyPaystackPayment = createServerFn({ method: "POST" })
  .inputValidator((input: VerifyInput) => {
    if (!input || typeof input.reference !== "string" || input.reference.length < 3) {
      throw new Error("A payment reference is required.");
    }
    return {
      reference: input.reference.slice(0, 200),
      planSlug: String(input.planSlug ?? "").slice(0, 120),
      planName: String(input.planName ?? "").slice(0, 200),
    };
  })
  .handler(async ({ data }) => {
    const secret = process.env["PAYSTACK_SECRET_KEY"];
    if (!secret) throw new Error("Payments are not configured yet.");

    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(data.reference)}`,
      { headers: { Authorization: `Bearer ${secret}` } },
    );
    const payload = (await res.json()) as {
      status?: boolean;
      message?: string;
      data?: {
        status?: string;
        amount?: number;
        currency?: string;
        reference?: string;
        customer?: { email?: string };
        metadata?: { customer_name?: string; plan_slug?: string; plan_name?: string };
      };
    };

    if (!res.ok || !payload.status || !payload.data) {
      throw new Error(payload.message ?? "We could not confirm this payment.");
    }

    const tx = payload.data;
    let status = tx.status === "success" ? "success" : (tx.status ?? "failed");
    const amount = (tx.amount ?? 0) / 100;
    const currency = tx.currency ?? "NGN";
    const email = tx.customer?.email ?? "";
    const name = tx.metadata?.customer_name ?? "";
    const planSlug = tx.metadata?.plan_slug ?? data.planSlug;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Never trust the browser's price: look up the real price for the plan or
    // template and reject payments that charged less than expected.
    if (status === "success") {
      const NGN_PER_USD = 1600;
      let expectedUsd: number | null = null;
      if (planSlug.startsWith("template:")) {
        const { data: tpl } = await supabaseAdmin
          .from("templates")
          .select("price_usd")
          .eq("slug", planSlug.slice("template:".length))
          .maybeSingle();
        expectedUsd = tpl ? Number(tpl.price_usd) : null;
      } else {
        const { data: plan } = await supabaseAdmin
          .from("subscription_plans")
          .select("price_monthly")
          .eq("slug", planSlug)
          .maybeSingle();
        expectedUsd = plan ? Number(plan.price_monthly) : null;
      }
      if (expectedUsd === null) {
        throw new Error("We could not match this payment to a plan. Please contact support.");
      }
      const expectedNgn = Math.round(expectedUsd * NGN_PER_USD);
      if (currency !== "NGN" || amount + 1 < expectedNgn) {
        status = "underpaid";
      }
    }

    await supabaseAdmin.from("payments").upsert(
      {
        reference: data.reference,
        customer_name: name,
        customer_email: email,
        plan_slug: planSlug,
        plan_name: tx.metadata?.plan_name ?? data.planName,
        amount,
        currency,
        status,
      },
      { onConflict: "reference" },
    );

    return { status, amount, currency, email, reference: data.reference };
  });
