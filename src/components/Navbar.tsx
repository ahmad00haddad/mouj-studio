import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
] as const;

const services = [
  { slug: "film-scoring", label: "Film Scoring" },
  { slug: "recording", label: "Recording" },
  { slug: "audio-post-production", label: "Audio Post Production" },
  { slug: "adr-and-dubbing", label: "ADR & Dubbing" },
  { slug: "mixing-and-mastering", label: "Mixing & Mastering" },
  { slug: "foley-recording", label: "Foley Recording" },
  { slug: "sound-design", label: "Sound Design" },
  { slug: "audio-branding", label: "Audio Branding" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  useEffect(() => { setOpen(false); setDrop(false); }, [pathname]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" to="/">
          <img src="/assets/img/wave.webp" alt="" />
          Mouje<span className="accent">Studio</span>
        </Link>

        <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>
          <i className={`bx ${open ? "bx-x" : "bx-menu"}`}></i>
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`nav-link ${pathname === l.to ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
          <div
            className={`nav-dropdown ${drop ? "open" : ""}`}
            onMouseLeave={() => setDrop(false)}
          >
            <button
              className={`nav-link ${pathname.startsWith("/services") ? "active" : ""}`}
              onClick={() => setDrop(d => !d)}
              onMouseEnter={() => setDrop(true)}
            >
              What We Do <i className="bx bx-chevron-down"></i>
            </button>
            <div className="nav-dropdown-menu">
              {services.map(s => (
                <Link key={s.slug} to="/services" hash={s.slug}>{s.label}</Link>
              ))}
            </div>
          </div>
          <Link to="/contact" className="nav-cta">Start Project</Link>
        </nav>
      </div>
    </header>
  );
}
