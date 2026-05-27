import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Twitter, Mail } from "lucide-react";
import waveLogo from "@/assets/wave.webp";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <img src={waveLogo} alt="" className="w-9 h-9 object-contain" />
            <h3 className="font-display text-3xl font-bold">
              Mouje <span className="text-gradient">Studio</span>
            </h3>
          </div>
          <p className="text-muted-foreground mt-3 max-w-xs">
            A leading studio delivering world-class audio solutions with expert engineers and state-of-the-art facilities.
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
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "https://www.instagram.com/moujestudio/" },
              { Icon: Twitter, href: "#" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/moujestudio/" },
              { Icon: Mail, href: "mailto:moujemusic@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:glow-primary transition-all"
                aria-label="social link"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} Mouje Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
