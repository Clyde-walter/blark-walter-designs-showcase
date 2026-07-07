import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Mail, MapPin, Phone, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/portfolio-data";

const contactSearchSchema = z.object({ plan: z.string().optional() });

export const Route = createFileRoute("/contact")({
  validateSearch: contactSearchSchema,
  head: () => ({
    meta: [
      { title: "Contact — Blark-walter Designs" },
      { name: "description", content: "Get in touch with Clyde Walter to start your UI/UX, brand, or frontend project." },
      { property: "og:title", content: "Contact — Blark-walter Designs" },
      { property: "og:description", content: "Let's talk about your next project." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Valid email required").max(254),
  subject: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10, "Tell me a bit more").max(4000),
});

function ContactPage() {
  const { plan } = useSearch({ from: "/contact" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending"); setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"), email: fd.get("email"),
      subject: fd.get("subject") ?? "", message: fd.get("message"),
    });
    if (!parsed.success) {
      setStatus("error"); setErrorMsg(parsed.error.issues[0]?.message ?? "Invalid input"); return;
    }
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name, email: parsed.data.email,
      subject: parsed.data.subject, message: parsed.data.message,
      plan_slug: plan ?? "",
    });
    if (error) { setStatus("error"); setErrorMsg(error.message); return; }
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="section-label">Get In Touch</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Let's Build Something<br />
              <span className="text-primary">Together</span>
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              Tell me about your project. I'll get back to you within 24 hours with next steps.
            </p>
            {plan && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary">
                Selected plan: {plan}
              </div>
            )}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <InfoCard Icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
              <InfoCard Icon={Phone} label="Phone" value={site.phone} href={`tel:${site.phone.replace(/\s+/g,"")}`} />
              <InfoCard Icon={MapPin} label="Location" value={site.location} />
              <InfoCard Icon={Clock} label="Availability" value={site.availability} />
            </div>
          </div>
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fill out the form and I'll be in touch.</p>
            <div className="mt-6 grid gap-4">
              <Field name="name" label="Your name" placeholder="Jane Doe" required />
              <Field name="email" type="email" label="Email" placeholder="jane@example.com" required />
              <Field name="subject" label="Subject" placeholder="Project inquiry" />
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Project details <span className="text-primary">*</span></span>
                <textarea name="message" required rows={5} maxLength={4000} placeholder="Tell me about your project, timeline and budget…" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              </label>
              {status === "error" && <p className="text-sm text-destructive">{errorMsg}</p>}
              {status === "sent" && (
                <p className="flex items-center gap-2 rounded-xl bg-accent p-3 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" /> Thanks — I'll reply within 24 hours.
                </p>
              )}
              <button disabled={status === "sending"} type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 pl-6 pr-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send message <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span></>}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label} {required && <span className="text-primary">*</span>}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
    </label>
  );
}

function InfoCard({ Icon, label, value, href }: { Icon: any; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="h-5 w-5" /></div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="hover:text-primary">{inner}</a> : inner;
}
