import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Blark-walter Designs" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/_authenticated/admin" as any });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const fn = mode === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
    const { error } = await fn;
    setLoading(false);
    if (error) { setError(error.message); return; }
    navigate({ to: "/_authenticated/admin" as any });
  }

  return (
    <section className="container-x flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary"><ShieldCheck className="h-5 w-5" /></span>
          <div>
            <h1 className="text-xl font-bold">Admin access</h1>
            <p className="text-xs text-muted-foreground">{mode === "signin" ? "Sign in to manage the site" : "First signup becomes admin"}</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4">
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Email</span>
            <input name="email" type="email" required className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Password</span>
            <input name="password" type="password" required minLength={6} className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }} className="text-xs text-muted-foreground hover:text-primary">
            {mode === "signin" ? "No account yet? Create one" : "Have an account? Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
