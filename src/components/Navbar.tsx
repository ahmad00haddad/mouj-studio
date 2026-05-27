import { Link, useLocation } from "@tanstack/react-router";

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
  const { pathname } = useLocation();
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
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="bx bx-menu"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
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
              <li className="nav-item dropdown">
                <a
                  className="navlink dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  What We Do
                </a>
                <div className="dropdown-menu">
                  {services.map((s) => (
                    <a key={s} className="dropdown-item" href="#">
                      {s}
                    </a>
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
