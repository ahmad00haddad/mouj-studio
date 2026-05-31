import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mouje Studio" },
      { name: "description", content: "Mouje Studio is a creative audio house committed to world-class sound for film, brands and games." },
      { property: "og:title", content: "About — Mouje Studio" },
      { property: "og:description", content: "Our story, philosophy and what makes Mouje Studio different." },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { n: "01", title: "Our Story", text: "Mouje Studio is a premier creative hub specializing in audio works — from music to film — built around state-of-the-art facilities and a team of skilled audio engineers and creatives." },
  { n: "02", title: "Philosophy", text: "We hold ourselves to the highest industry standards and stay obsessed with sound — continually exploring new techniques and technologies to push the craft forward." },
  { n: "03", title: "Why Us", text: "Expertise, quality, creativity and a client-centric approach. We work closely with you to translate vision into sound that resonates." },
  { n: "04", title: "Our Goals", text: "Deliver audio that exceeds expectations, innovate continuously, and build long-term relationships rooted in trust and collaboration." },
];

const values = [
  { icon: "bx-target-lock", title: "Craft over speed", text: "We optimize for the result, not the deadline — yet still ship on time." },
  { icon: "bx-bulb", title: "Creative first", text: "Sound serves story. Every decision starts from the creative brief." },
  { icon: "bx-shield-quarter", title: "Quality assured", text: "Hybrid analog/digital workflows, calibrated rooms and rigorous QC." },
  { icon: "bx-group", title: "True partnership", text: "Transparent communication, real revisions, no surprises." },
];

function AboutPage() {
  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">About us</span>
        </div>
        <div className="about-hero">
          <div>
            <h1>Crafting <span className="accent">sound</span> that tells your story.</h1>
            <p>Mouje Studio is a creative audio house delivering scoring, recording, mixing, sound design and audio branding for film, brands and games — built on a decade of experience and a love for the craft.</p>
            <p>We work as an extension of your team: listening, iterating and shipping audio that elevates the work.</p>
            <div className="hero-actions" style={{ marginTop: "1.75rem" }}>
              <Link to="/works" className="btn">See our works</Link>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
          </div>
          <div className="about-img">
            <img src="/assets/img/home-img.webp" alt="Mouje Studio" />
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Pillars</span>
          <h2>What we <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>stand for</span></h2>
        </div>
        <div className="pillars">
          {pillars.map(p => (
            <div className="pillar" key={p.n}>
              <div className="n">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Values</span>
          <h2>How we <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>operate</span></h2>
        </div>
        <div className="services-bento">
          {values.map(v => (
            <div className="svc" key={v.title}>
              <div className="svc-ico"><i className={`bx ${v.icon}`}></i></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="cta-block">
          <h2>Let's build something <span className="accent">unforgettable</span>.</h2>
          <p>Whether you have a brief or just an idea, we'd love to hear it.</p>
          <Link to="/contact" className="btn">Start the conversation <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
