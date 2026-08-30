import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const mockData = [
  { date: "May 12", visitors: 2400, pageViews: 2000 },
  { date: "May 13", visitors: 3200, pageViews: 3500 },
  { date: "May 14", visitors: 4300, pageViews: 4200 },
  { date: "May 15", visitors: 5400, pageViews: 6000 },
  { date: "May 16", visitors: 4200, pageViews: 5200 },
  { date: "May 17", visitors: 3600, pageViews: 4100 },
  { date: "May 18", visitors: 4800, pageViews: 5300 },
];

export function DashboardMain() {
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
          <div className="mt-2 text-2xl font-semibold">12,458</div>
          <div className="text-xs text-emerald-500">+18.2% from last 7 days</div>
        </Card>
        <Card className="p-4 bg-surface">
          <div className="text-sm text-muted-foreground">Page Views</div>
          <div className="mt-2 text-2xl font-semibold">28,596</div>
          <div className="text-xs text-emerald-500">+15.7% from last 7 days</div>
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
                visitors: { label: "Visitors", color: "#ef4444" },
                pageViews: { label: "Page Views", color: "#6366f1" },
              }}
            >
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={mockData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#f97316" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="pvGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#pvGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#ef4444"
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
