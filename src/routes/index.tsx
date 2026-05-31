import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mouje Studio — World-class audio production" },
      { name: "description", content: "Mouje Studio is a creative audio house delivering scoring, recording, mixing, sound design and audio branding for film, brands and games." },
      { property: "og:title", content: "Mouje Studio — World-class audio production" },
      { property: "og:description", content: "Creative audio house delivering scoring, recording, mixing, sound design and audio branding." },
    ],
  }),
  component: Index,
});

const services = [
  { slug: "film-scoring", icon: "bx-movie-play", title: "Film Scoring", text: "Original orchestral and hybrid scores written to picture." },
  { slug: "recording", icon: "bx-microphone", title: "Recording", text: "Multitrack tracking in a treated live room with a world-class mic locker." },
  { slug: "mixing-and-mastering", icon: "bx-equalizer", title: "Mixing & Mastering", text: "Hybrid analog/digital mixes that translate on every speaker." },
  { slug: "sound-design", icon: "bx-pulse", title: "Sound Design", text: "Cinematic SFX, trailers, game audio and bespoke sonic textures." },
  { slug: "adr-and-dubbing", icon: "bx-conversation", title: "ADR & Dubbing", text: "Multilingual ADR direction with lip-sync precision." },
  { slug: "audio-branding", icon: "bx-broadcast", title: "Audio Branding", text: "Sonic logos and brand themes that audiences instantly recognize." },
];

const stats = [
  { n: "10+", l: "Years on air" },
  { n: "250+", l: "Projects delivered" },
  { n: "80+", l: "Happy clients" },
  { n: "15", l: "Awards & nominations" },
];

function Index() {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div className="bento hero-main">
            <span className="eyebrow">Mouje Studio · Est. 2014</span>
            <h1>Sound that <span className="accent">moves</span> people.</h1>
            <p>We craft music, mixes and sonic worlds for film, brands and games — from the first note to the final master, all under one roof.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn">Start a project <i className="bx bx-right-arrow-alt"></i></Link>
              <Link to="/works" className="btn btn-ghost">View our works</Link>
            </div>
            <div className="hero-socials">
              <a href="https://www.instagram.com/moujestudio/" aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
              <a href="https://www.linkedin.com/company/moujestudio/" aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
              <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
            </div>
          </div>

          <div className="bento hero-portrait">
            <img src="/assets/img/home-img.webp" alt="Mouje Studio control room" />
          </div>

          <div className="bento glow hero-pill">
            <i className="bx bxs-award"></i>
            <div>
              <strong>15+ awards</strong>
              <span>Regional & international</span>
            </div>
          </div>

          <div className="bento hero-eq">
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </div>

          <div className="bento dark hero-cta">
            <div>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>Hybrid analog rig</strong>
              <p style={{ fontSize: ".85rem", margin: 0 }}>Neve · API · Tube-Tech · Bricasti</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          {stats.map(s => (
            <div className="stat-card" key={s.l}>
              <h3>{s.n}</h3>
              <p>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">What we do</span>
          <h2>A complete sonic toolkit, under <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>one roof</span></h2>
          <p>From the first creative spark to a polished master ready for broadcast and streaming.</p>
        </div>
        <div className="services-bento">
          {services.map((s, i) => (
            <Link key={s.slug} to="/services" hash={s.slug} className={`svc ${i === 0 ? "wide feat" : ""}`}>
              <div className="svc-ico"><i className={`bx ${s.icon}`}></i></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="svc-link">Learn more <i className="bx bx-right-arrow-alt"></i></span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="cta-block">
          <h2>Have a project in <span className="accent">mind</span>?</h2>
          <p>Tell us about your brief — we'll come back within 24 hours with a creative plan and a quote.</p>
          <Link to="/contact" className="btn">Start a project <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
