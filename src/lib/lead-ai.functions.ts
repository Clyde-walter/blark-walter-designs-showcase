import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type LeadInput = { name: string; email: string; subject: string; message: string };

const INSTRUCTIONS = `You are a sales assistant for Blark-walter Designs, a studio run by Clyde Walter offering UI/UX design, brand identity, logo design, social media branding, frontend/full-stack web development and AI web apps.
Given a lead's details, reply in Markdown with exactly these sections:
## Summary of needs
(3-5 bullets: what they want, implied scope, budget/timeline hints, urgency)
## Recommended approach
(which services fit, 2-4 talking points, questions to ask)
## Follow-up email draft
(a warm, concise, personalized reply signed "Clyde Walter, Blark-walter Designs", ending with a clear next step like booking a short call)`;

export const analyzeLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: LeadInput) => ({
    name: String(i?.name ?? "").slice(0, 200),
    email: String(i?.email ?? "").slice(0, 200),
    subject: String(i?.subject ?? "").slice(0, 300),
    message: String(i?.message ?? "").slice(0, 6000),
  }))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Only admins can use this.");
    if (!data.message.trim()) throw new Error("Please add the lead's message.");

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured.");

    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system: INSTRUCTIONS,
        maxRetries: 0,
        messages: [
          {
            role: "user",
            content: `Name: ${data.name}\nEmail: ${data.email}\nSubject/service: ${data.subject}\nMessage:\n${data.message}`,
          },
        ],
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const text = await result.text;
      if (!text.trim()) throw new Error("The AI returned no answer.");
      return { text };
    } catch (e: any) {
      const status = e?.statusCode ?? e?.status;
      console.error("analyzeLead failed", status, e?.message);
      if (status === 402) throw new Error("AI credits have run out. Add credits in Settings → Plans & credits.");
      if (status === 429) throw new Error("Too many requests right now. Please try again in a minute.");
      throw new Error(e?.message?.slice(0, 200) || "AI analysis failed.");
    }
  });
