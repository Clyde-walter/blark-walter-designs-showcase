import type { Template } from "@/lib/templates";

export function TemplateCover({ t, className = "h-52" }: { t: Template; className?: string }) {
  if (t.hero_image) {
    return <img src={t.hero_image} alt={t.title} loading="lazy" className={`w-full object-cover ${className}`} />;
  }
  return (
    <div className={`grid w-full place-items-center bg-gradient-to-br from-primary/80 to-ink ${className}`}>
      <span className="font-display text-4xl font-bold text-primary-foreground">
        {t.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
      </span>
    </div>
  );
}

