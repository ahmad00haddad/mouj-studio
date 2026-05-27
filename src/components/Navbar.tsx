import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import waveLogo from "@/assets/wave.webp";

const links = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const services = [
  "Film Scoring",
  "Recording",
  "Audio Post Production",
  "ADR and Dubbing",
  "Mixing and Mastering",
  "Foley Recording",
  "Sound Design",
  "Audio Branding",
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-5">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <img src={waveLogo} alt="" className="w-10 h-10 object-contain" />
          <span className="font-display font-bold text-2xl tracking-wide">
            Mouje <span className="text-gradient">Studio</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-4 py-2 text-sm font-medium uppercase tracking-widest text-secondary" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              What We Do <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {services.map((s) => (
                <a key={s} href="#" className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-primary/15 hover:text-secondary transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <Link
            to="/contact"
            className="ml-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:glow-primary transition-all"
          >
            Contact
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-base font-medium uppercase tracking-wider text-muted-foreground"
                activeProps={{ className: "px-3 py-3 text-base font-semibold uppercase tracking-wider text-secondary" }}
              >
                {l.label}
              </Link>
            ))}
            <details className="px-3 py-2">
              <summary className="text-base font-medium uppercase tracking-wider text-muted-foreground cursor-pointer">What We Do</summary>
              <div className="mt-2 pl-3 flex flex-col gap-1">
                {services.map((s) => (
                  <a key={s} href="#" className="text-sm text-muted-foreground py-1.5">{s}</a>
                ))}
              </div>
            </details>
          </div>
        </nav>
      )}
    </header>
  );
}
