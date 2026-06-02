import { Link } from "@tanstack/react-router";
import { useCms, s as t } from "@/lib/useCms";

export function Footer() {
  const { content } = useCms();
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
          <p>{t(content, "site_footer", "tagline", "A creative audio house crafting music, sound design and post-production for film, brands and games.")}</p>
          <div className="footer-social">
            <a href={t(content, "site_social", "instagram", "https://www.instagram.com/moujestudio/")} aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
            <a href={t(content, "site_social", "linkedin", "https://www.linkedin.com/company/moujestudio/")} aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
            <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/works">Works</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services" hash="film-scoring">Film Scoring</Link></li>
            <li><Link to="/services" hash="recording">Recording</Link></li>
            <li><Link to="/services" hash="mixing-and-mastering">Mixing & Mastering</Link></li>
            <li><Link to="/services" hash="sound-design">Sound Design</Link></li>
            <li><Link to="/services" hash="audio-branding">Audio Branding</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>{t(content, "contact_info", "address", "Amir Ben Malek St., Khalda 11953, Amman")}</li>
            <li><a href={`mailto:${t(content, "contact_info", "email", "moujemusic@gmail.com")}`}>{t(content, "contact_info", "email", "moujemusic@gmail.com")}</a></li>
            <li><a href={`tel:${t(content, "contact_info", "phone", "+962 7 9656 8891").replace(/\s+/g, "")}`}>{t(content, "contact_info", "phone", "+962 7 9656 8891")}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">{copyright}</div>
    </footer>
  );
}
