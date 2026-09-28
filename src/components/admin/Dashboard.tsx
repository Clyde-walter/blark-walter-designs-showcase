import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardMain() {
  const { data: traffic } = useQuery({
    queryKey: ["site_page_views"],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - 6);
      const { data, error } = await supabase
        .from("site_page_views")
        .select("path,visitor_id,viewed_at")
        .gte("viewed_at", since.toISOString())
        .order("viewed_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
  const totalVisitors = new Set((traffic ?? []).map((row) => row.visitor_id)).size;
  const totalPageViews = traffic?.length ?? 0;
  const trafficData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    const rows = (traffic ?? []).filter((row) => row.viewed_at.slice(0, 10) === key);
    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      visitors: new Set(rows.map((row) => row.visitor_id)).size,
      pageViews: rows.length,
    };
  });
  const { data: counts, isLoading: countsLoading } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const tables = ["projects", "blog_posts", "testimonials", "subscription_plans"];
      const results: Record<string, number> = {};
      for (const t of tables) {
        try {
          const res = await supabase.from(t as any).select("id", { head: true, count: "exact" });
          results[t] = typeof res.count === "number" ? res.count : 0;
        } catch (e) {
          results[t] = 0;
        }
      }
      return results;
    },
  });

  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ["recentActivity"],
    queryFn: async () => {
      const { data: posts } = await supabase
        .from("blog_posts")
        .select("id,title,updated_at")
        .order("updated_at", { ascending: false })
        .limit(5);
      const { data: projects } = await supabase
        .from("projects")
        .select("id,title,updated_at")
        .order("updated_at", { ascending: false })
        .limit(5);
      return { posts: posts ?? [], projects: projects ?? [] };
    },
  });

  const { data: topPosts, isLoading: topLoading } = useQuery({
    queryKey: ["topPosts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id,title,published_at")
        .order("published_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  const { data: drafts, isLoading: draftsLoading } = useQuery({
    queryKey: ["drafts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id,title,updated_at,status")
        .eq("status", "draft")
        .order("updated_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-surface">
          <div className="text-sm text-muted-foreground">Total Visitors</div>
          <div className="mt-2 text-2xl font-semibold">{totalVisitors.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Unique visitors, last 7 days</div>
        </Card>
        <Card className="p-4 bg-surface">
          <div className="text-sm text-muted-foreground">Page Views</div>
          <div className="mt-2 text-2xl font-semibold">{totalPageViews.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Recorded page views</div>
        </Card>
        <Card className="p-4 bg-surface">
          <div className="text-sm text-muted-foreground">Blog Posts</div>
          <div className="mt-2 text-2xl font-semibold">
            {countsLoading ? "—" : (counts?.blog_posts ?? 0)}
          </div>
          <div className="text-xs text-emerald-500">{countsLoading ? "" : "+2 new this week"}</div>
        </Card>
        <Card className="p-4 bg-surface">
          <div className="text-sm text-muted-foreground">Projects</div>
          <div className="mt-2 text-2xl font-semibold">
            {countsLoading ? "—" : (counts?.projects ?? 0)}
          </div>
          <div className="text-xs text-emerald-500">{countsLoading ? "" : "+1 new this week"}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="col-span-2 bg-surface">
          <CardHeader>
            <CardTitle>Website Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              id="visitors"
              config={{
                visitors: { label: "Visitors", color: "hsl(var(--primary))" },
                pageViews: { label: "Page Views", color: "hsl(var(--primary))" },
              }}
            >
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trafficData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="pvGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#pvGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#visGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="p-4 bg-surface">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Quick Actions</div>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" /> Create
              </Button>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <Button variant="outline" size="sm">
                Add New Post
              </Button>
              <Button variant="outline" size="sm">
                Add New Project
              </Button>
              <Button variant="outline" size="sm">
                Upload Media
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-surface">
            <div className="text-sm text-muted-foreground">Recent Activity</div>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              {activityLoading && (
                <>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </>
              )}
              {!activityLoading && (
                <>
                  {(activity?.posts ?? []).slice(0, 3).map((p: any) => (
                    <div key={p.id}>
                      {p.title} — {new Date(p.updated_at).toLocaleString()}
                    </div>
                  ))}
                  {(activity?.projects ?? []).slice(0, 3).map((p: any) => (
                    <div key={p.id}>
                      {p.title} — {new Date(p.updated_at).toLocaleString()}
                    </div>
                  ))}
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="col-span-2 p-4 bg-surface">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Top Blog Posts</div>
          </div>
          <div className="mt-3 space-y-2">
            {topLoading && (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </>
            )}
            {!topLoading &&
              (topPosts ?? []).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="text-sm">{p.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(p.published_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-4 bg-surface">
          <div className="text-sm font-semibold">Recent Drafts</div>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {draftsLoading && (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </>
            )}
            {!draftsLoading &&
              (drafts ?? []).map((d: any) => (
                <div key={d.id} className="flex items-center justify-between">
                  <div className="truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(d.updated_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
