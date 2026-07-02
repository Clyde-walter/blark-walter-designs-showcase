import type { Project } from "@/lib/portfolio-data";

export function ProjectVisual({ project, small = false }: { project: Project; small?: boolean }) {
  const initials = project.title
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent} ${
        small ? "h-40" : "h-64"
      }`}
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
