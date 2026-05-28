import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <Link to="/" className="logo footer-logo">
            <img src="/assets/img/wave.webp" alt="Mouje Studio" />
            Mouje <span>Studio</span>
          </Link>
          <p>A leading studio delivering world-class audio solutions — music, post production, and sound design.</p>
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
          <h4>Contact</h4>
          <ul>
            <li>Amir Ben Malek St., Khalda 11953</li>
            <li>moujemusic@gmail.com</li>
            <li>+962 7 9656 8891</li>
          </ul>
          <div className="social-icons footer-social">
            <a href="https://www.instagram.com/moujestudio/" aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
            <a href="https://www.linkedin.com/company/moujestudio/" aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
            <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Mouje Studio. All rights reserved.
      </div>
    </footer>
  );
}