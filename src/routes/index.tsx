import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Disc3, Film, Mic, Music2, Radio, Waves, Headphones, Volume2, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import heroImg from "@/assets/home-img.webp";
import { Equalizer } from "@/components/Equalizer";
import { works } from "@/lib/works-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mouje Studio" },
      { name: "description", content: "A leading studio delivering world-class audio solutions with a team of expert engineers and state-of-the-art facilities." },
      { property: "og:title", content: "Mouje Studio" },
      { property: "og:description", content: "World-class audio solutions for every project." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Film, title: "Film Scoring", desc: "Original orchestral and hybrid scores tailored to picture." },
  { icon: Mic, title: "Recording", desc: "Vocal, instrument and live tracking in a tuned booth." },
  { icon: Volume2, title: "Audio Post Production", desc: "End-to-end audio finishing for film and TV." },
  { icon: Headphones, title: "ADR and Dubbing", desc: "Clean dialogue replacement and multi-language dubbing." },
  { icon: Disc3, title: "Mixing and Mastering", desc: "Translation-ready masters with depth, clarity and punch." },
  { icon: Radio, title: "Foley Recording", desc: "Layered, frame-accurate foley that brings scenes to life." },
  { icon: Waves, title: "Sound Design", desc: "Bespoke sonic textures for games, trailers and ads." },
  { icon: Music2, title: "Audio Branding", desc: "Sonic logos and brand sound identities that stick." },
];

function Index() {
  const featured = works.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          <div className="fade-up">
            <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-6 flex items-center gap-3">
              <span className="inline-block w-10 h-px bg-secondary" />
              Welcome to
            </p>
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-[0.95]">
              Hi, It&apos;s <span className="text-gradient">Mouje</span> Studio
            </h1>
            <div className="mt-8 text-2xl md:text-3xl font-display text-muted-foreground">
              We Are&nbsp;
              <span className="text-rotator">
                <ul>
                  <li className="text-foreground">The Place For You</li>
                  <li className="text-foreground">Household For Audio Works</li>
                  <li className="text-foreground">Your Favorite Recording Studio</li>
                  <li className="text-foreground">Your Perfect Sound</li>
                </ul>
              </span>
            </div>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              We are a leading studio delivering world-class audio solutions with a team of expert engineers
              and state-of-the-art facilities, ensuring exceptional sound quality for every project.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:glow-primary transition-all"
              >
                About
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full border-2 border-border text-foreground font-semibold uppercase tracking-wider text-sm hover:border-secondary hover:text-secondary transition-all"
              >
                Contact
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "https://www.instagram.com/moujestudio/" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/moujestudio/" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                   className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:glow-primary transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/40 via-transparent to-secondary/30 blur-2xl pulse-glow" />
            <div className="relative rounded-3xl overflow-hidden border border-border glow-primary aspect-square">
              <img
                src={heroImg}
                alt="Mouje Studio"
                className="w-full h-full object-cover"
                width={1080}
                height={1080}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background via-background/70 to-transparent">
                <Equalizer bars={40} className="h-16 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-3">What I Do</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold max-w-2xl">
              Full-stack audio for any moving picture.
            </h2>
          </div>
          <Link to="/about" className="text-secondary hover:text-glow inline-flex items-center gap-2 uppercase tracking-widest text-sm">
            About me <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/60 transition-all overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/30 transition-all" />
              <s.icon className="w-9 h-9 text-secondary mb-5 relative" />
              <h3 className="font-display text-2xl font-bold mb-2 relative">{s.title}</h3>
              <p className="text-muted-foreground relative">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-3">Selected Work</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Recent projects.</h2>
          </div>
          <Link to="/works" className="text-secondary hover:text-glow inline-flex items-center gap-2 uppercase tracking-widest text-sm">
            All works <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((w, i) => (
            <article
              key={w.id}
              className="group relative overflow-hidden rounded-2xl border border-border aspect-[4/5] cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={w.image}
                alt={w.title}
                loading="lazy"
                width={1024}
                height={768}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <p className="text-xs uppercase tracking-widest text-secondary mb-2">
                  {w.category.replace("-", " ")} · {w.year}
                </p>
                <h3 className="font-display text-2xl font-bold">{w.title}</h3>
                <p className="text-muted-foreground text-sm">{w.client}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="relative rounded-3xl border border-border bg-card overflow-hidden p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <Equalizer bars={20} className="h-12 mx-auto opacity-70 mb-8 justify-center" />
            <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl mx-auto">
              Got a story that needs <span className="text-gradient">sound?</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg">
              From a single mix to a full original score — let&apos;s shape something unforgettable.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-bold uppercase tracking-wider text-sm hover:glow-accent transition-all"
            >
              Let&apos;s talk <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
