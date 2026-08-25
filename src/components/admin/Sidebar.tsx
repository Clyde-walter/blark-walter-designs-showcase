import { Link, useRouterState } from "@tanstack/react-router";
import { Layers, FileText, Inbox, MessageSquareQuote, Wrench } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";

export function AdminSidebar({ className = "" }: { className?: string }) {
  const items = [
    { to: "/admin", hash: "dashboard", label: "Dashboard", icon: Layers },
    { to: "/admin", hash: "projects", label: "Projects", icon: Layers },
    { to: "/admin", hash: "services", label: "Services", icon: Wrench },
    { to: "/admin", hash: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { to: "/admin", hash: "blog", label: "Blog Posts", icon: FileText },
    { to: "/admin", hash: "submissions", label: "Contacts", icon: Inbox },
  ];

  const hash = useRouterState({ select: (s) => s.location.hash });

  return (
    <aside className={`hidden w-72 flex-col gap-4 lg:flex ${className}`}>
      <div className="sticky top-6 space-y-4">
        <Card className="p-4 rounded-2xl border border-border bg-card shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600" />
            <div>
              <div className="font-semibold">Clyde Walter</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
          </div>
        </Card>

        <nav className="space-y-1">
          <div className="text-xs font-semibold text-muted-foreground px-2">Content Management</div>
          {items.map((it) => {
            const active = hash?.replace(/^#/, '') === it.hash;
            return (
              <Link
                key={it.hash}
                to={it.to}
                hash={it.hash}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <it.icon className="h-4 w-4" />
                <span className="truncate">{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <Card className="p-4 rounded-2xl border border-border bg-card shadow-xl">
          <div className="text-xs text-muted-foreground">System Status</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between"><span>Website</span><span className="text-emerald-500">Online</span></div>
            <div className="flex items-center justify-between"><span>Database</span><span className="text-emerald-500">Online</span></div>
            <div className="flex items-center justify-between"><span>Backup</span><span className="text-amber-500">Up to date</span></div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
