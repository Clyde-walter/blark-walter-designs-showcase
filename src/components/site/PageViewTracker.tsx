import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

function getVisitorId() {
  const key = "bwd_visitor_id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.localStorage.setItem(key, id);
  return id;
}

export function PageViewTracker() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return;

    let visitorId: string | null = null;
    try {
      visitorId = getVisitorId();
    } catch {
      visitorId = null;
    }
    supabase
      .from("site_page_views" as never)
      .insert({ path: pathname, visitor_id: visitorId } as never)
      .then(({ error }) => {
        if (error) console.error("Page view tracking failed:", error.message);
      });
  }, [pathname]);

  return null;
}