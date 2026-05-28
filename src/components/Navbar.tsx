import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const services = [
  { slug: "film-scoring", label: "Film Scoring" },
  { slug: "recording", label: "Recording" },
  { slug: "audio-post-production", label: "Audio Post Production" },
  { slug: "adr-and-dubbing", label: "ADR and Dubbing" },
  { slug: "mixing-and-mastering", label: "Mixing and Mastering" },
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
    <header className="header">
      <Link className="navbar-brand logo" to="/">
        <img src="/assets/img/wave.webp" alt="" />
        Mouje <span>Studio</span>
      </Link>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="navbar-toggler-icon">
              <i className="bx bx-menu"></i>
            </span>
          </button>
          <div className={`${open ? "" : "collapse"} navbar-collapse`} id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map((l) => (
                <li className="nav-item" key={l.to}>
                  <Link
                    className={`navlink ${pathname === l.to ? "active-nav" : ""}`}
                    to={l.to}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li
                className={`nav-item dropdown ${drop ? "show" : ""}`}
                onMouseEnter={() => setDrop(true)}
                onMouseLeave={() => setDrop(false)}
              >
                <a
                  className={`navlink dropdown-toggle ${pathname.startsWith("/services") ? "active-nav" : ""}`}
                  href="#"
                  role="button"
                  aria-expanded={drop}
                  onClick={(e) => { e.preventDefault(); setDrop((d) => !d); }}
                >
                  What We Do
                </a>
                <div className="dropdown-menu" style={drop ? { display: "block", opacity: 1, visibility: "visible", maxHeight: 999, transform: "translate3d(0,0,0)", marginTop: 5, backgroundColor: "var(--color-background)", borderRadius: 20 } : undefined}>
                  {services.map((s) => (
                    <Link key={s.slug} className="dropdown-item" to="/services" hash={s.slug}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
