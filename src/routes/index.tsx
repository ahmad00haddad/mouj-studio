import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Disc3, Film, Mic, Music2, Radio, Waves } from "lucide-react";
import heroImg from "@/assets/hero-producer.jpg";
import { Equalizer } from "@/components/Equalizer";
import { works } from "@/lib/works-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sonix — Sound Designer & Music Producer" },
      { name: "description", content: "Cinematic sound design, mixing and original scores for film, games and brands." },
      { property: "og:title", content: "Sonix — Sound Designer & Music Producer" },
      { property: "og:description", content: "Cinematic sound design, mixing and original scores." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Film, title: "Film Scoring", desc: "Original orchestral and hybrid scores tailored to picture." },
  { icon: Disc3, title: "Mixing & Mastering", desc: "Translation-ready masters with depth, clarity and punch." },
  { icon: Mic, title: "Recording", desc: "Vocal, instrument and ADR sessions in a tuned booth." },
  { icon: Waves, title: "Sound Design", desc: "Bespoke sonic textures for games, trailers and ads." },
  { icon: Music2, title: "Audio Branding", desc: "Sonic logos and brand sound identities that stick." },
  { icon: Radio, title: "Podcast Post", desc: "Editing, leveling and polish for spoken-word shows." },
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
              Sound Designer · Producer
            </p>
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-[0.95]">
              Crafting sound that <span className="text-gradient">moves</span> the picture.
            </h1>
            <div className="mt-8 text-2xl md:text-3xl font-display text-muted-foreground">
              I&apos;m&nbsp;
              <span className="text-rotator">
                <ul>
                  <li className="text-foreground">a sound designer.</li>
                  <li className="text-foreground">a mixing engineer.</li>
                  <li className="text-foreground">a film composer.</li>
                  <li className="text-foreground">a music producer.</li>
                </ul>
              </span>
            </div>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              A decade of cinematic audio for feature films, games and global brands.
              Every project is engineered to feel as good as it sounds.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/works"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:glow-primary transition-all"
              >
                View Works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full border-2 border-border text-foreground font-semibold uppercase tracking-wider text-sm hover:border-secondary hover:text-secondary transition-all"
              >
                Start a Project
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              {[
                { n: "120+", l: "Projects" },
                { n: "10y", l: "Experience" },
                { n: "45", l: "Clients" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-gradient">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 blur-2xl pulse-glow" />
            <div className="relative rounded-3xl overflow-hidden border border-border glow-primary aspect-[4/5]">
              <img
                src={heroImg}
                alt="Sound producer at mixing console"
                className="w-full h-full object-cover"
                width={1024}
                height={1280}
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
