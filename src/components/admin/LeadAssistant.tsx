import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { Copy, Loader2, Mail, Sparkles } from "lucide-react";
import { analyzeLead } from "@/lib/lead-ai.functions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type Lead = { name: string; email: string; subject: string; message: string };

export function LeadAssistant({ initial, trigger }: { initial?: Partial<Lead>; trigger: React.ReactNode }) {
  const run = useServerFn(analyzeLead);
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<Lead>({ name: "", email: "", subject: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  function openIt() {
    setLead({ name: "", email: "", subject: "", message: "", ...initial } as Lead);
    setResult("");
    setError("");
    setOpen(true);
  }

  async function analyze() {
    setBusy(true);
    setError("");
    try {
      const r = await run({ data: lead });
      setResult(r.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const draft = result.split(/##\s*Follow-up email draft/i)[1]?.trim() ?? result;
  const field = "mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm";

  return (
    <>
      <span onClick={openIt}>{trigger}</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> AI lead assistant
            </DialogTitle>
            <DialogDescription>Summarize what this lead needs and get a personalized follow-up.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium">Name<input className={field} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} /></label>
            <label className="text-sm font-medium">Email<input className={field} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} /></label>
            <label className="text-sm font-medium sm:col-span-2">Subject / service<input className={field} value={lead.subject} onChange={(e) => setLead({ ...lead, subject: e.target.value })} /></label>
            <label className="text-sm font-medium sm:col-span-2">Message<textarea rows={5} className={field} value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} /></label>
          </div>
          <Button onClick={analyze} disabled={busy || !lead.message.trim()}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {busy ? "Analyzing…" : result ? "Analyze again" : "Analyze lead"}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {result && (
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="prose-content text-sm">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(draft)}>
                  <Copy className="h-4 w-4" /> Copy reply
                </Button>
                {lead.email && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: " + (lead.subject || "Your enquiry"))}&body=${encodeURIComponent(draft)}`}>
                      <Mail className="h-4 w-4" /> Open in email
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
