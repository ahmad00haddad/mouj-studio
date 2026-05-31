import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <Link to="/" className="brand">
            <img src="/assets/img/wave.webp" alt="" />
            Mouje<span className="accent">Studio</span>
          </Link>
          <p>A creative audio house crafting music, sound design and post-production for film, brands and games.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/moujestudio/" aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
            <a href="https://www.linkedin.com/company/moujestudio/" aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
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
            <li>Amir Ben Malek St.</li>
            <li>Khalda 11953, Amman</li>
            <li><a href="mailto:moujemusic@gmail.com">moujemusic@gmail.com</a></li>
            <li><a href="tel:+962796568891">+962 7 9656 8891</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Mouje Studio. All rights reserved.</div>
    </footer>
  );
}
