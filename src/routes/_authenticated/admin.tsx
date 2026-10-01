import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LogOut,
  Plus,
  Trash2,
  Save,
  Loader2,
  X,
  ShieldCheck,
  Layers,
  Wrench,
  MessageSquareQuote,
  DollarSign,
  FileText,
  Inbox,
  Eye,
  EyeOff,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload, GalleryUpload } from "@/components/admin/ImageUpload";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { DashboardMain } from "@/components/admin/Dashboard";
import { PaymentsView } from "@/components/admin/Payments";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Admin — Blark-walter Designs" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

type Tab =
  | "dashboard"
  | "projects"
  | "services"
  | "testimonials"
  | "plans"
  | "blog"
  | "submissions"
  | "payments";
const DASHBOARD_TAB = "dashboard" as const;
const TABS: { id: Tab; label: string; Icon: any }[] = [
  { id: DASHBOARD_TAB, label: "Dashboard", Icon: Eye },
  { id: "projects", label: "Projects", Icon: Layers },
  { id: "services", label: "Services", Icon: Wrench },
  { id: "testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { id: "plans", label: "Plans", Icon: DollarSign },
  { id: "payments", label: "Payments", Icon: DollarSign },
  { id: "blog", label: "Blog", Icon: FileText },
  { id: "submissions", label: "Contacts", Icon: Inbox },
];

function AdminPage() {
  const navigate = useNavigate();
  const routerHash = useRouterState({ select: (s) => s.location.hash });
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  const tab: Tab = useMemo(() => {
    const h = (routerHash ?? "").replace(/^#/, "") as Tab;
    return TABS.some((t) => t.id === h) ? h : DASHBOARD_TAB;
  }, [routerHash]);


  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setEmail(u.user?.email ?? "");
      if (!u.user) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from("user_roles" as never)
        .select("role")
        .eq("user_id", u.user.id);
      setIsAdmin(Array.isArray(data) && data.some((r: any) => r.role === "admin"));
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === null)
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  if (!isAdmin)
    return (
      <section className="container-x py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-xl font-bold">Not an admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {email}. Only admins can access this panel.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </section>
    );

  return (
    <section className="min-h-screen bg-surface">
      <div className="flex min-h-screen">
        <AdminSidebar onSignOut={signOut} />
        <div className="min-w-0 flex-1 px-5 py-8 md:px-8 md:py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="section-label">Admin</span>
          <h1 className="mt-2 truncate text-3xl font-bold sm:text-4xl">Content Manager</h1>
          <p className="mt-1 truncate text-sm text-muted-foreground">Signed in as {email}</p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground">
          Content is synced to the public website
        </span>
      </header>

      <main className="mt-8">
          {tab === "projects" && (
            <TableManager
              table="projects"
              title="Projects"
              fields={PROJECT_FIELDS}
              defaults={{
                slug: "",
                title: "",
                subtitle: "",
                category: "",
                tags: [],
                summary: "",
                accent: "from-violet-600 to-fuchsia-600",
                hero_image: "",
                gallery_images: [],
                is_published: true,
                sort: 0,
              }}
              orderBy="sort"
            />
          )}
          {tab === "services" && (
            <TableManager
              table="services"
              title="Services"
              fields={SERVICE_FIELDS}
              defaults={{ name: "", description: "", sort: 0 }}
              orderBy="sort"
            />
          )}
          {tab === "testimonials" && (
            <TableManager
              table="testimonials"
              title="Testimonials"
              fields={TESTIMONIAL_FIELDS}
              defaults={{ name: "", role: "", project: "", quote: "", sort: 0, is_published: true }}
              orderBy="sort"
            />
          )}
          {tab === "plans" && (
            <TableManager
              table="subscription_plans"
              title="Subscription Plans"
              fields={PLAN_FIELDS}
              defaults={{
                slug: "",
                category: "brand-identity",
                name: "",
                tagline: "",
                price_monthly: 0,
                currency: "USD",
                features: [],
                is_featured: false,
                sort: 0,
                is_published: true,
              }}
              orderBy="sort"
            />
          )}
          {tab === "blog" && (
            <TableManager
              table="blog_posts"
              title="Blog Posts"
              fields={BLOG_FIELDS}
              defaults={{
                slug: "",
                title: "",
                category: "",
                excerpt: "",
                body_md: "",
                tags: [],
                read_time: "5 min read",
                status: "draft",
                hero_image: "",
              }}
              orderBy="published_at"
              descending
            />
          )}

          {tab === "payments" && <PaymentsView />}

          {tab === "submissions" && <SubmissionsView />}

          {/* Dashboard: show when tab is dashboard (hash) or default */}
          {(tab === "dashboard" || !tab) && <DashboardMain />}
      </main>
        </div>
      </div>
    </section>
  );
}

type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "bool" | "tags" | "select" | "image" | "gallery";
  options?: string[];
  span?: number;
  folder?: string;
};

const PROJECT_FIELDS: Field[] = [
  { key: "slug", label: "Slug", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "subtitle", label: "Subtitle", type: "text" },
  { key: "category", label: "Category", type: "text" },
  { key: "client", label: "Client", type: "text" },
  { key: "industry", label: "Industry", type: "text" },
  { key: "role", label: "Role", type: "text" },
  { key: "duration", label: "Duration", type: "text" },
  { key: "year", label: "Year", type: "text" },
  { key: "platforms", label: "Platforms", type: "text" },
  { key: "tags", label: "Tags (comma-separated)", type: "tags" },
  { key: "accent", label: "Accent gradient", type: "text" },
  { key: "hero_image", label: "Hero image", type: "image", span: 2, folder: "projects/hero" },
  {
    key: "gallery_images",
    label: "Project gallery",
    type: "gallery",
    span: 2,
    folder: "projects/gallery",
  },
  { key: "summary", label: "Summary", type: "textarea", span: 2 },
  { key: "problem", label: "Problem", type: "textarea", span: 2 },
  { key: "solution", label: "Solution", type: "textarea", span: 2 },
  { key: "sort", label: "Sort", type: "number" },
  { key: "is_published", label: "Published", type: "bool" },
];
const SERVICE_FIELDS: Field[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "description", label: "Description", type: "textarea", span: 2 },
  { key: "sort", label: "Sort", type: "number" },
];
const TESTIMONIAL_FIELDS: Field[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "role", label: "Role", type: "text" },
  { key: "project", label: "Project", type: "text" },
  { key: "sort", label: "Sort", type: "number" },
  { key: "quote", label: "Quote", type: "textarea", span: 2 },
  { key: "is_published", label: "Published", type: "bool" },
];
const PLAN_FIELDS: Field[] = [
  { key: "slug", label: "Slug", type: "text" },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: ["brand-identity", "social-media"],
  },
  { key: "name", label: "Name", type: "text" },
  { key: "tagline", label: "Tagline", type: "text" },
  { key: "price_monthly", label: "Price (monthly)", type: "number" },
  { key: "currency", label: "Currency", type: "text" },
  { key: "features", label: "Features (comma-separated)", type: "tags", span: 2 },
  { key: "sort", label: "Sort", type: "number" },
  { key: "is_featured", label: "Featured", type: "bool" },
  { key: "is_published", label: "Published", type: "bool" },
];
const BLOG_FIELDS: Field[] = [
  { key: "slug", label: "Slug", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "category", label: "Category", type: "text" },
  { key: "read_time", label: "Read time", type: "text" },
  { key: "status", label: "Status", type: "select", options: ["draft", "published"] },
  { key: "hero_image", label: "Hero image", type: "image", span: 2, folder: "blog/hero" },
  { key: "tags", label: "Tags", type: "tags", span: 2 },
  { key: "excerpt", label: "Excerpt", type: "textarea", span: 2 },
  { key: "body_md", label: "Body (markdown)", type: "textarea", span: 2 },
];

function TableManager({
  table,
  title,
  fields,
  defaults,
  orderBy,
  descending,
}: {
  table: string;
  title: string;
  fields: Field[];
  defaults: Record<string, any>;
  orderBy: string;
  descending?: boolean;
}) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await (supabase.from(table as never) as any)
        .select("*")
        .order(orderBy, { ascending: !descending });
      if (error) throw error;
      return data as any[];
    },
  });

  const save = useMutation({
    mutationFn: async (row: any) => {
      const clean = { ...row };
      delete clean.created_at;
      delete clean.updated_at;
      if (clean.id) {
        const { error } = await (supabase.from(table as never) as any)
          .update(clean)
          .eq("id", clean.id);
        if (error) throw error;
      } else {
        delete clean.id;
        const { error } = await (supabase.from(table as never) as any).insert(clean);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      setEditing(null);
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from(table as never) as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [table] }),
  });

  return (
    <div>
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="min-w-0 truncate text-xl font-bold">
          {title}{" "}
          <span className="text-sm font-normal text-muted-foreground">({data?.length ?? 0})</span>
        </h2>
        <Button className="shrink-0" onClick={() => setEditing({ ...defaults })}>
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <div className="space-y-3">
          {(data ?? []).map((row: any) => {
            const isDraft = row.status === "draft" || row.is_published === false;
            const meta = [
              row.category ?? row.role ?? row.slug ?? "",
              typeof row.price_monthly === "number" ? `$${row.price_monthly}/mo` : "",
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <div
                key={row.id}
                className="rounded-2xl border border-border bg-card p-4 md:flex md:items-center md:gap-4"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  {row.hero_image && (
                    <img
                      src={row.hero_image}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="break-words font-semibold">
                        {row.title ?? row.name ?? row.slug}
                      </span>
                      {isDraft ? (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-600">
                          Draft
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-600">
                          Published
                        </span>
                      )}
                    </div>
                    {meta && (
                      <div className="mt-1 break-words text-xs text-muted-foreground">{meta}</div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0 md:shrink-0 md:justify-end">
                  {"status" in row || "is_published" in row ? (
                    <Button
                      variant="outline"
                      size="sm"
                      title={isDraft ? "Publish" : "Unpublish"}
                      onClick={() =>
                        save.mutate({
                          ...row,
                          ...("status" in row
                            ? { status: isDraft ? "published" : "draft" }
                            : { is_published: isDraft }),
                        })
                      }
                    >
                      {isDraft ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                      <span className="ml-1">{isDraft ? "Publish" : "Unpublish"}</span>
                    </Button>
                  ) : null}
                  <Button variant="outline" size="sm" onClick={() => setEditing(row)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => confirm("Delete?") && del.mutate(row.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="ml-1">Delete</span>
                  </Button>
                </div>
              </div>
            );
          })}
          {(data ?? []).length === 0 && (
            <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No entries yet.
            </p>
          )}
        </div>
      )}


      {editing && (
        <EditorModal
          fields={fields}
          row={editing}
          onChange={setEditing}
          onCancel={() => setEditing(null)}
          onSave={() => save.mutate(editing)}
          saving={save.isPending}
          error={save.error as any}
        />
      )}
    </div>
  );
}

function EditorModal({ fields, row, onChange, onCancel, onSave, saving, error }: any) {
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{row.id ? "Edit" : "Create"}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Edit fields for the entry
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2 sm:grid-cols-2">
          {fields.map((f: Field) => (
            <div key={f.key} className={f.span === 2 ? "sm:col-span-2" : ""}>
              <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  rows={4}
                  value={row[f.key] ?? ""}
                  onChange={(e) => onChange({ ...row, [f.key]: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              ) : f.type === "bool" ? (
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!row[f.key]}
                    onChange={(e) => onChange({ ...row, [f.key]: e.target.checked })}
                  />{" "}
                  Enabled
                </label>
              ) : f.type === "number" ? (
                <input
                  type="number"
                  value={row[f.key] ?? 0}
                  onChange={(e) => onChange({ ...row, [f.key]: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              ) : f.type === "tags" ? (
                <input
                  value={(row[f.key] ?? []).join(", ")}
                  onChange={(e) =>
                    onChange({
                      ...row,
                      [f.key]: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="a, b, c"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              ) : f.type === "select" ? (
                <select
                  value={row[f.key] ?? ""}
                  onChange={(e) => onChange({ ...row, [f.key]: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.type === "image" ? (
                <ImageUpload
                  value={row[f.key] ?? ""}
                  onChange={(url) => onChange({ ...row, [f.key]: url })}
                  folder={f.folder}
                  label={f.label}
                />
              ) : f.type === "gallery" ? (
                <GalleryUpload
                  value={row[f.key] ?? []}
                  onChange={(urls) => onChange({ ...row, [f.key]: urls })}
                  folder={f.folder}
                />
              ) : (
                <input
                  value={row[f.key] ?? ""}
                  onChange={(e) => onChange({ ...row, [f.key]: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="px-2 pb-2 text-sm text-destructive">{String(error.message ?? error)}</p>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{" "}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SubmissionsView() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["contact_submissions"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("contact_submissions" as never) as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });
  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from("contact_submissions" as never) as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact_submissions"] }),
  });
  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">
        Contact submissions{" "}
        <span className="text-sm font-normal text-muted-foreground">({data?.length ?? 0})</span>
      </h2>
      {(data ?? []).map((r: any) => (
        <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold">
                {r.name}{" "}
                <span className="text-sm font-normal text-muted-foreground">· {r.email}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleString()} {r.plan_slug && `· plan: ${r.plan_slug}`}
              </div>
            </div>
            <button
              onClick={() => confirm("Delete?") && del.mutate(r.id)}
              className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive"
            >
              <Trash2 className="inline h-3 w-3" />
            </button>
          </div>
          {r.subject && <div className="mt-2 text-sm font-semibold">{r.subject}</div>}
          <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{r.message}</p>
        </div>
      ))}
      {(data ?? []).length === 0 && (
        <p className="text-sm text-muted-foreground">No submissions yet.</p>
      )}
    </div>
  );
}
