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
  const [services Open, setServicesOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-5">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <AudioWaveform className="w-7 h-7 text-secondary group-hover:text-glow transition-all" />
          <span className="font-display font-bold text-2xl tracking-wide">
            Son<span className="text-gradient">ix</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative"
              activeProps={{ className: "px-4 py-2 text-sm font-medium uppercase tracking-widest text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:glow-primary transition-all"
          >
            Hire Me
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
                className="px-3 py-3 text-base font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                activeProps={{ className: "px-3 py-3 text-base font-semibold uppercase tracking-wider text-secondary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
