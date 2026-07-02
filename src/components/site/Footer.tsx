import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Instagram, Dribbble, Mail, Phone, MapPin, Clock } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";
import { site, nav, services } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoAsset.url} alt={site.name} className="h-10 w-10" />
            <div className="text-sm font-semibold leading-tight font-display">Blark-walter<br />Designs</div>
          </Link>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Designing digital experiences that are intuitive, functional and visually impactful.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            {[Linkedin, Dribbble, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ink-foreground transition hover:bg-primary"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-base font-semibold font-display">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-muted-foreground transition hover:text-primary data-[status=active]:text-primary">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-5 text-base font-semibold font-display">Services</h4>
          <ul className="space-y-3 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.name} className="text-muted-foreground">{s.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-5 text-base font-semibold font-display">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-primary" />{site.phone}</li>
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-primary" />{site.email}</li>
            <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-primary" />{site.location}</li>
            <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-primary" />{site.availability}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Blark-walter Designs. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
