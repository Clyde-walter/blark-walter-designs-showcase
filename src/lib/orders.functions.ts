import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: string; notes: string; deliveryUrl: string; notify: boolean }) => {
    if (!(ORDER_STATUSES as readonly string[]).includes(input.status)) throw new Error("Invalid status");
    return {
      id: String(input.id),
      status: input.status,
      notes: String(input.notes ?? "").slice(0, 4000),
      deliveryUrl: String(input.deliveryUrl ?? "").slice(0, 1000),
      notify: Boolean(input.notify),
    };
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const { data: before } = await context.supabase.from("client_orders").select("status").eq("id", data.id).single();
    const { data: order, error } = await context.supabase
      .from("client_orders")
      .update({ status: data.status, notes: data.notes, delivery_url: data.deliveryUrl })
      .eq("id", data.id)
      .select("reference, client_name, client_email, item_title, status, notes, delivery_url, updated_at")
      .single();
    if (error || !order) throw new Error("Could not update order");
    let emailed = false;
    if (data.notify && before?.status !== order.status && order.client_email) {
      try {
        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        const r = await sendTemplateEmail("order-status-update", order.client_email, {
          templateData: {
            name: order.client_name,
            item: order.item_title,
            status: order.status,
            notes: order.notes,
            deliveryUrl: order.delivery_url,
            orderCode: order.reference,
          },
          idempotencyKey: `order-status-${data.id}-${order.status}-${order.updated_at}`,
        });
        emailed = r.sent;
      } catch (e) {
        console.error("status email failed", e);
      }
    }
    return { emailed };
  });
