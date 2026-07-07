import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import { nav, site } from "@/lib/portfolio-data";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-6">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <img src={logoAsset.url} alt={site.name} className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
          <div className="hidden truncate text-sm font-semibold leading-tight text-foreground sm:block font-display">
            Blark-walter<br />Designs
          </div>
        </Link>
        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:after:absolute data-[status=active]:after:-bottom-1.5 data-[status=active]:after:left-1/2 data-[status=active]:after:h-0.5 data-[status=active]:after:w-6 data-[status=active]:after:-translate-x-1/2 data-[status=active]:after:bg-primary"
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-4 pr-1 text-sm font-semibold text-ink-foreground transition hover:bg-primary sm:inline-flex sm:py-3 sm:pl-5 sm:pr-1.5"
          >
            Let's Talk
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground sm:h-9 sm:w-9">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-border p-2.5 xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border xl:hidden">
          <div className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground data-[status=active]:text-primary"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-between gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ink-foreground sm:hidden"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
