import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Headphones, Heart, Sparkles, Users, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-producer.jpg";
import { Equalizer } from "@/components/Equalizer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sonix" },
      { name: "description", content: "About the sound designer behind Sonix — story, philosophy and skills." },
      { property: "og:title", content: "About — Sonix" },
      { property: "og:description", content: "About the sound designer behind Sonix." },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: Sparkles, title: "Philosophy", body: "Sound is half the picture. I treat every frequency as a storytelling choice — not decoration." },
  { icon: Award, title: "Craft", body: "A decade of cinematic work shipped to festivals, theaters, streaming platforms and global brands." },
  { icon: Heart, title: "Why Me", body: "Direct collaboration, fast iterations, and a deep respect for your creative vision." },
  { icon: Users, title: "Clients", body: "Independent filmmakers, ad agencies, AAA games studios and recording artists across three continents." },
];

const skills = [
  { name: "Mixing & Mastering", value: 95 },
  { name: "Sound Design", value: 92 },
  { name: "Film Scoring", value: 88 },
  { name: "Recording / Tracking", value: 90 },
  { name: "Foley & ADR", value: 80 },
  { name: "Audio Branding", value: 85 },
];

function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-14 items-center">
        <div className="fade-up">
          <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-5">About</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05]">
            Behind the <span className="text-gradient">console.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            I&apos;m a sound designer and music producer based out of a tuned home-studio.
            For over ten years I&apos;ve been shaping audio for film, advertising,
            podcasts and games — chasing the moment where the picture and the
            sound finally lock in.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            My setup pairs analog warmth with modern in-the-box precision, so
            every project lands with depth, clarity and emotion.
          </p>
          <div className="mt-8 flex items-center gap-3 text-secondary">
            <Headphones className="w-5 h-5" />
            <Equalizer bars={18} className="h-8" />
          </div>
        </div>
        <div className="relative fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-secondary/25 to-primary/35 blur-3xl pulse-glow" />
          <img
            src={heroImg}
            alt="Sonix at work"
            className="relative rounded-3xl border border-border w-full aspect-square object-cover glow-primary"
            loading="lazy"
            width={1024}
            height={1024}
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {pillars.map((p) => (
            <div key={p.title} className="p-8 rounded-2xl border border-border bg-card relative overflow-hidden group hover:border-primary/60 transition-all">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl group-hover:bg-secondary/25 transition-all" />
              <p.icon className="w-9 h-9 text-secondary mb-4 relative" />
              <h3 className="font-display text-2xl font-bold mb-2 relative">{p.title}</h3>
              <p className="text-muted-foreground relative">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-3">Skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Technical fluency.</h2>
        </div>
        <div className="space-y-6">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium uppercase tracking-wider">{s.name}</span>
                <span className="text-secondary font-bold">{s.value}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${s.value}%`,
                    background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                    boxShadow: "var(--shadow-accent-glow)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Ready to <span className="text-gradient">collaborate?</span>
        </h2>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:glow-primary transition-all"
        >
          Get in touch <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
}
