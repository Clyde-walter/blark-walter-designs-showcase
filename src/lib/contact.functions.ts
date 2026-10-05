import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).default(""),
  message: z.string().trim().min(1).max(5000),
  planSlug: z.string().max(120).default(""),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        plan_slug: data.planSlug,
      })
      .select("id")
      .single();
    if (error) throw new Error("Could not send your message. Please try again.");

    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("contact-confirmation", data.email, {
        templateData: { name: data.name, subject: data.subject, message: data.message },
        idempotencyKey: `contact-confirm-${row.id}`,
      });
    } catch (e) {
      console.error("contact confirmation email failed", e);
    }
    return { ok: true };
  });
