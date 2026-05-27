import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/home-img.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Mouje Studio — About" },
      { name: "description", content: "Mouje Studio is a premier creative hub specializing in audio works — film scoring, recording, mixing, sound design and more." },
      { property: "og:title", content: "Mouje Studio — About" },
      { property: "og:description", content: "A premier creative hub specializing in audio works." },
    ],
  }),
  component: AboutPage,
});

const slides = [
  {
    sub: "About Mouje Studio",
    title: "About",
    body:
      "Mouje Studio is a premier creative hub specializing in audio works. Our mission is to deliver world-class sound experiences through our extensive range of services. With state-of-the-art facilities and a team of skilled audio engineers and creatives, we ensure every project achieves pristine quality and professionalism. We are dedicated to pushing the boundaries of audio production, from music to film, ensuring each sound resonates with perfection.",
  },
  {
    sub: "Our Philosophy",
    title: "Philosophy",
    body:
      "We are committed to maintaining the highest industry standards, ensuring that every project we undertake meets our rigorous quality benchmarks. Our passion for sound drives us to continually explore new techniques and technologies, keeping us at the forefront of the audio production landscape.",
  },
  {
    sub: "Why Choose Us?",
    title: "Why Us",
    body:
      "Expertise: With a diverse team of professionals, we bring a wealth of experience to every project. Quality: We are dedicated to delivering top-notch audio that meets international standards. Creativity: Our innovative approach allows us to craft unique soundscapes that resonate with audiences. Client-Centric: We prioritize your vision and work closely with you to achieve your goals.",
  },
  {
    sub: "Join Us",
    title: "Join",
    body:
      "At Mouje Studio, we invite you to embark on a creative journey with us. Let's transform your ideas into sound that captivates and inspires. Whether you have a specific project in mind or need guidance on how to elevate your audio, our team is ready to collaborate and bring your vision to life.",
  },
  {
    sub: "Our Goals",
    title: "Goals",
    body:
      "At Mouje Studio, our primary goal is to deliver high-quality audio services that exceed our clients' expectations. We strive for continuous innovation by exploring new techniques and adopting advanced tools to enhance our productions. Building long-term relationships based on trust and collaboration is essential to our mission, as we believe that success is best achieved together.",
  },
];

function AboutPage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = slides[active];

  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-12 py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        {/* Slide stage */}
        <div className="relative min-h-[70vh] rounded-3xl border border-border bg-card overflow-hidden p-10 md:p-16">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute -right-10 -bottom-10 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl" />

          {/* Massive background word */}
          <p
            key={`bg-${active}`}
            className="absolute -bottom-6 -right-2 font-display font-bold uppercase text-[18vw] leading-none text-foreground/[0.05] select-none whitespace-nowrap pointer-events-none fade-up"
          >
            {slide.title}
          </p>

          <div key={active} className="relative max-w-2xl fade-up">
            <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-5">{slide.sub}</p>
            <h1 className="font-display text-6xl md:text-8xl font-bold mb-8 text-gradient">
              {slide.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {slide.body}
            </p>
          </div>

          <div className="relative mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold uppercase tracking-wider text-sm hover:glow-accent transition-all"
            >
              Work with us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Navi */}
        <aside className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              className={`text-left px-5 py-4 rounded-xl border transition-all shrink-0 lg:w-full group ${
                i === active
                  ? "border-secondary bg-secondary/10 glow-accent"
                  : "border-border hover:border-primary/60"
              }`}
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                0{i + 1}
              </div>
              <div
                className={`font-display text-2xl font-bold mt-1 ${
                  i === active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {s.title}
              </div>
            </button>
          ))}
        </aside>
      </div>

      {/* Portrait band */}
      <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/25 blur-2xl pulse-glow" />
          <img
            src={heroImg}
            alt="Mouje Studio"
            loading="lazy"
            width={1080}
            height={1080}
            className="relative rounded-3xl border border-border w-full aspect-square object-cover glow-primary"
          />
        </div>
        <div>
          <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-4">The Studio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Where every <span className="text-gradient">frequency</span> tells a story.
          </h2>
          <p className="text-muted-foreground text-lg">
            From orchestral film scores to intimate vocal sessions, Mouje Studio is built around
            one idea: sound should feel as good as it sounds. Our team blends decades of analog
            craft with cutting-edge digital workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
