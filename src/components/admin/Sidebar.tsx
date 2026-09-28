import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, DollarSign, FileText, Inbox, Layers, LogOut, MessageSquareQuote, Wrench } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";

export function AdminSidebar({ className = "", onSignOut }: { className?: string; onSignOut?: () => void }) {
  const items = [
    { to: "/admin", hash: "dashboard", label: "Dashboard", icon: Layers },
    { to: "/admin", hash: "projects", label: "Projects", icon: Layers },
    { to: "/admin", hash: "services", label: "Services", icon: Wrench },
    { to: "/admin", hash: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { to: "/admin", hash: "plans", label: "Plans", icon: DollarSign },
    { to: "/admin", hash: "blog", label: "Blog Posts", icon: FileText },
    { to: "/admin", hash: "submissions", label: "Contacts", icon: Inbox },
  ];

  const hash = useRouterState({ select: (s) => s.location.hash });

  return (
    <aside className={`hidden w-72 shrink-0 flex-col border-r border-border bg-card lg:flex ${className}`}>
      <div className="sticky top-0 flex min-h-screen flex-col gap-6 p-5">
        <Card className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Blark-walter Designs" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <div className="font-display text-sm font-bold">Blark-walter</div>
              <div className="text-xs text-muted-foreground">Admin workspace</div>
            </div>
          </div>
        </Card>

        <nav className="space-y-1">
          <div className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Workspace</div>
          {items.map((it) => {
            const active = hash?.replace(/^#/, "") === it.hash;
            return (
              <Link
                key={it.hash}
                to={it.to}
                hash={it.hash}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <it.icon className="h-4 w-4" />
                <span className="truncate">{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <Card className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="text-xs text-muted-foreground">System Status</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Website</span>
              <span className="text-emerald-500">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Database</span>
              <span className="text-emerald-500">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Backup</span>
              <span className="text-amber-500">Up to date</span>
            </div>
          </div>
        </Card>
        <div className="mt-auto space-y-2 border-t border-border pt-4">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-muted">
            <BarChart3 className="h-4 w-4" /> View website
          </Link>
          <button onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
