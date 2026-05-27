import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-3xl font-bold">
            Son<span className="text-gradient">ix</span>
          </h3>
          <p className="text-muted-foreground mt-3 max-w-xs">
            Sound designer, mixing engineer and composer crafting cinematic audio for film, games and brands.
          </p>
        </div>
        <div>
          <h4 className="uppercase text-sm tracking-widest text-muted-foreground mb-4">Navigate</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/works" className="hover:text-secondary transition-colors">Works</Link></li>
            <li><Link to="/about" className="hover:text-secondary transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase text-sm tracking-widest text-muted-foreground mb-4">Connect</h4>
          <div className="flex gap-3">
            {[Instagram, Linkedin, Twitter, Youtube, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:glow-primary transition-all"
                aria-label="social link"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} Sonix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
