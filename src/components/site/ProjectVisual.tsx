import { Globe2 } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

export function ProjectVisual({ project, small = false }: { project: Project; small?: boolean }) {
  const initials = project.title
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  const previewHeight = small ? "h-40" : "h-64";

  if (project.liveUrl) {
    let hostname = project.liveUrl;
    try {
      hostname = new URL(project.liveUrl).hostname.replace(/^www\./, "");
    } catch {
      // Keep the original value if a CMS URL is not fully formed yet.
    }

    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-border bg-card ${previewHeight}`}
      >
        <div className="absolute inset-x-0 top-0 flex h-8 items-center gap-2 border-b border-border bg-muted px-3 text-[10px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-destructive" />
          <span className="h-2 w-2 rounded-full bg-primary/50" />
          <span className="h-2 w-2 rounded-full bg-foreground/25" />
          <span className="ml-1 flex min-w-0 items-center gap-1 truncate rounded border border-border bg-background px-2 py-0.5">
            <Globe2 className="h-2.5 w-2.5 shrink-0" />
            <span className="truncate">{hostname}</span>
          </span>
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 top-8 bg-gradient-to-br ${project.accent} flex items-center justify-center`}
        >
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
              backgroundSize: "24px 24px, 32px 32px",
            }}
          />
          <div className="relative z-10 px-4 text-center text-white">
            <div className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {initials}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest opacity-80">
              {project.subtitle}
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold backdrop-blur">
              Live website
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent} ${previewHeight}`}
    >
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "24px 24px, 32px 32px",
        }}
      />
      <div className="relative z-10 text-center text-white">
        <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{initials}</div>
        <div className="mt-1 text-xs uppercase tracking-widest opacity-80">{project.subtitle}</div>
      </div>
    </div>
  );
}
