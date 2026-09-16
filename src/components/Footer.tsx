import { Link } from "@tanstack/react-router";
import { useCms, s as t } from "@/lib/useCms";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";

export function Footer() {
  const { content } = useCms();
  const { lang } = useI18n();
  const year = new Date().getFullYear();
  const copyright = t(content, "site_footer", "copyright", `© ${year} Mouje Studio. All rights reserved.`).replace("©", `© ${year}`);
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <Link to="/" className="brand">
            <img src={t(content, "site_brand", "logo", "/assets/img/wave.webp")} alt="" />
            Mouje<span className="accent">Studio</span>
          </Link>
          <p>{T[lang].footer_tagline}</p>
          <div className="footer-social">
            <a href={t(content, "site_social", "instagram", "https://www.instagram.com/moujestudio/")} aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
            <a href={t(content, "site_social", "linkedin", "https://www.linkedin.com/company/moujestudio/")} aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
            <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>{T[lang].footer_explore}</h4>
          <ul>
            <li><Link to="/">{T[lang].nav_home}</Link></li>
            <li><Link to="/works">{T[lang].nav_works}</Link></li>
            <li><Link to="/services">{T[lang].nav_services}</Link></li>
            <li><Link to="/about">{T[lang].nav_about}</Link></li>
            <li><Link to="/contact">{T[lang].nav_contact}</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{T[lang].footer_services}</h4>
          <ul>
            <li><Link to="/services" hash="film-scoring">Film Scoring</Link></li>
            <li><Link to="/services" hash="recording">Recording</Link></li>
            <li><Link to="/services" hash="mixing-and-mastering">Mixing & Mastering</Link></li>
            <li><Link to="/services" hash="sound-design">Sound Design</Link></li>
            <li><Link to="/services" hash="audio-branding">Audio Branding</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{T[lang].footer_contact}</h4>
          <ul>
            <li>{t(content, "contact_info", "address", "Amir Ben Malek St., Khalda 11953, Amman")}</li>
            <li><a href={`mailto:${t(content, "contact_info", "email", "moujemusic@gmail.com")}`}>{t(content, "contact_info", "email", "moujemusic@gmail.com")}</a></li>
            <li><a href={`tel:${t(content, "contact_info", "phone", "+962 7 9656 8891").replace(/\s+/g, "")}`}>{t(content, "contact_info", "phone", "+962 7 9656 8891")}</a></li>
          </ul>
        </div>
      </div>
            <div className="footer-bottom" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <div>{copyright}</div>
        <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
          Developed by <a href="https://haddad-dev.lovable.app/" target="_blank" rel="noreferrer" style={{ color: "var(--primary-glow)", textDecoration: "none", fontWeight: "bold" }}>Ahmad Haddad</a>
        </div>
      </div>
    </footer>
  );
}
