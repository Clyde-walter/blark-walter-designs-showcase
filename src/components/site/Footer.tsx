import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Instagram, Dribbble, Mail, Phone, MapPin, Clock } from "lucide-react";

import { site, nav, services } from "@/lib/portfolio-data";

const socials = [
  { Icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
  { Icon: Dribbble, href: "https://dribbble.com/", label: "Dribbble" },
  { Icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
  { Icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt={site.name} className="h-10 w-10" />
            <div className="text-sm font-semibold leading-tight font-display">Blark-walter<br />Designs</div>
          </Link>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Designing digital experiences that are intuitive, functional and visually impactful.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ink-foreground transition hover:bg-primary"
                aria-label={label}
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
            {services.slice(0, 6).map((s) => (
              <li key={s.name}>
                <Link to="/services" className="text-muted-foreground transition hover:text-primary">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-5 text-base font-semibold font-display">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-primary" /><a href={`tel:${site.phone.replace(/\s+/g,"")}`} className="hover:text-primary">{site.phone}</a></li>
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-primary" /><a href={`mailto:${site.email}`} className="break-all hover:text-primary">{site.email}</a></li>
            <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 shrink-0 text-primary" />{site.location}</li>
            <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 shrink-0 text-primary" />{site.availability}</li>
          </ul>
          <Link to="/contact" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Start a Project
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Blark-walter Designs. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="hover:text-primary">Contact</Link>
            <Link to="/subscriptions" className="hover:text-primary">Pricing</Link>
            <Link to="/auth" className="hover:text-primary">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
