import { createServerFn } from "@tanstack/react-start";

export const ORDER_STATUSES = ["received", "in_progress", "in_review", "delivered"] as const;

export const trackOrder = createServerFn({ method: "POST" })
  .inputValidator((input: { reference: string; email: string }) => ({
    reference: String(input.reference ?? "").trim().slice(0, 60),
    email: String(input.email ?? "").trim().toLowerCase().slice(0, 254),
  }))
  .handler(async ({ data }) => {
    if (!data.reference || !data.email) return { orders: [] };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("client_orders")
      .select("reference, client_email, item_type, item_title, status, notes, delivery_url, created_at, updated_at, payment_reference")
      .or(`reference.eq.${data.reference.replace(/[^A-Za-z0-9_-]/g, "")},payment_reference.eq.${data.reference.replace(/[^A-Za-z0-9_-]/g, "")}`)
      .limit(5);
    const orders = (rows ?? [])
      .filter((r) => r.client_email.toLowerCase() === data.email)
      .map(({ client_email: _e, payment_reference: _p, ...rest }) => rest);
    return { orders };
  });
