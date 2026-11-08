import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const STATUS_LABELS: Record<string, string> = {
  received: "Received",
  in_progress: "In progress",
  in_review: "In review",
  delivered: "Delivered",
};

type Order = {
  id: string;
  reference: string;
  client_name: string;
  client_email: string;
  item_type: string;
  item_title: string;
  status: string;
  notes: string;
  delivery_url: string;
  created_at: string;
};

const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

export function OrdersView() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["client_orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
  });
  const [draft, setDraft] = useState({ client_name: "", client_email: "", item_type: "project", item_title: "" });
  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("client_orders").insert(draft);
      if (error) throw error;
    },
    onSuccess: () => {
      setDraft({ client_name: "", client_email: "", item_type: "project", item_title: "" });
      qc.invalidateQueries({ queryKey: ["client_orders"] });
    },
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Client orders</h2>
        <p className="text-sm text-muted-foreground">
          Set a status for each project or template. Clients track progress at /track with their order code and email.
        </p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); create.mutate(); }}
        className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <input required placeholder="Client name" className={input} value={draft.client_name} onChange={(e) => setDraft({ ...draft, client_name: e.target.value })} />
        <input required type="email" placeholder="Client email" className={input} value={draft.client_email} onChange={(e) => setDraft({ ...draft, client_email: e.target.value })} />
        <select className={input} value={draft.item_type} onChange={(e) => setDraft({ ...draft, item_type: e.target.value })}>
          <option value="project">Project</option>
          <option value="template">Template</option>
          <option value="subscription">Subscription</option>
        </select>
        <input required placeholder="Project / template name" className={input} value={draft.item_title} onChange={(e) => setDraft({ ...draft, item_title: e.target.value })} />
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add order
        </Button>
        {create.error && <p className="text-sm text-destructive sm:col-span-full">{(create.error as Error).message}</p>}
      </form>

      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders yet. Template purchases appear here automatically.</p>
      ) : (
        <div className="grid gap-4">{data.map((o) => <OrderCard key={o.id} order={o} />)}</div>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const qc = useQueryClient();
  const [status, setStatus] = useState(order.status);
  const [notes, setNotes] = useState(order.notes);
  const [url, setUrl] = useState(order.delivery_url);
  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("client_orders").update({ status, notes, delivery_url: url }).eq("id", order.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["client_orders"] }),
  });
  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("client_orders").delete().eq("id", order.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["client_orders"] }),
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-semibold">{order.item_title}</div>
          <div className="text-xs text-muted-foreground">
            {order.client_name} · {order.client_email} · <span className="uppercase">{order.item_type}</span>
          </div>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 font-mono text-xs">{order.reference}</span>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <select className={input} value={status} onChange={(e) => setStatus(e.target.value)}>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <input placeholder="Preview / delivery link" className={`${input} md:col-span-2`} value={url} onChange={(e) => setUrl(e.target.value)} />
        <textarea placeholder="Update note for the client" className={`${input} md:col-span-3`} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => confirm("Delete this order?") && del.mutate()}>
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </Button>
      </div>
    </div>
  );
}
