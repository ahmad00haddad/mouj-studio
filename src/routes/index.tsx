import { createFileRoute, Link } from "@tanstack/react-router";
import { useCms, s as t, list } from "@/lib/useCms";

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

const fallbackServices = [
  { slug: "film-scoring", icon: "bx-movie-play", title: "Film Scoring", text: "Original orchestral and hybrid scores written to picture." },
  { slug: "recording", icon: "bx-microphone", title: "Recording", text: "Multitrack tracking in a treated live room with a world-class mic locker." },
  { slug: "mixing-and-mastering", icon: "bx-equalizer", title: "Mixing & Mastering", text: "Hybrid analog/digital mixes that translate on every speaker." },
  { slug: "sound-design", icon: "bx-pulse", title: "Sound Design", text: "Cinematic SFX, trailers, game audio and bespoke sonic textures." },
  { slug: "adr-and-dubbing", icon: "bx-conversation", title: "ADR & Dubbing", text: "Multilingual ADR direction with lip-sync precision." },
  { slug: "audio-branding", icon: "bx-broadcast", title: "Audio Branding", text: "Sonic logos and brand themes that audiences instantly recognize." },
];

const fallbackStats = [
  { n: "10+", l: "Years on air" },
  { n: "250+", l: "Projects delivered" },
  { n: "80+", l: "Happy clients" },
  { n: "15", l: "Awards & nominations" },
];

function Index() {
  const { content, services: dbServices } = useCms();
  const stats = list<{ n: string; l: string }>(content, "home_stats", "items", fallbackStats);
  const services = (dbServices.length ? dbServices.map((sv) => ({
    slug: sv.slug, icon: sv.icon || "bx-pulse", title: sv.title, text: sv.description || "",
  })) : fallbackServices).slice(0, 6);
  const heroTitle = t(content, "home_hero", "title", "Sound that moves people.");
  const heroAccent = t(content, "home_hero", "accent", "moves");
  const hp = heroTitle.split(heroAccent);
  const sTitle = t(content, "home_services_intro", "title", "A complete sonic toolkit, under one roof");
  const sAccent = t(content, "home_services_intro", "accent", "one roof");
  const sp = sTitle.split(sAccent);
  const cTitle = t(content, "home_cta", "title", "Have a project in mind?");
  const cAccent = t(content, "home_cta", "accent", "mind");
  const cp = cTitle.split(cAccent);
  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div className="bento hero-main">
            <span className="eyebrow">{t(content, "home_hero", "eyebrow", "Mouje Studio · Est. 2014")}</span>
            <h1>{hp[0]}<span className="accent">{heroAccent}</span>{hp[1] ?? ""}</h1>
            <p>{t(content, "home_hero", "subtitle", "We craft music, mixes and sonic worlds for film, brands and games — from the first note to the final master, all under one roof.")}</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn">{t(content, "home_hero", "ctaPrimaryLabel", "Start a project")} <i className="bx bx-right-arrow-alt"></i></Link>
              <Link to="/works" className="btn btn-ghost">{t(content, "home_hero", "ctaSecondaryLabel", "View our works")}</Link>
            </div>
            <div className="hero-socials">
              <a href={t(content, "site_social", "instagram", "https://www.instagram.com/moujestudio/")} aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
              <a href={t(content, "site_social", "linkedin", "https://www.linkedin.com/company/moujestudio/")} aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
              <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
            </div>
          </div>

          <div className="bento hero-portrait">
            <img src={t(content, "home_hero", "image", "/assets/img/home-img.webp")} alt="Mouje Studio control room" />
          </div>

          <div className="bento glow hero-pill">
            <i className="bx bxs-award"></i>
            <div>
              <strong>{t(content, "home_hero", "pillTitle", "15+ awards")}</strong>
              <span>{t(content, "home_hero", "pillSub", "Regional & international")}</span>
            </div>
          </div>

          <div className="bento hero-eq">
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </div>

          <div className="bento dark hero-cta">
            <div>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{t(content, "home_hero", "rigTitle", "Hybrid analog rig")}</strong>
              <p style={{ fontSize: ".85rem", margin: 0 }}>{t(content, "home_hero", "rigDescription", "Neve · API · Tube-Tech · Bricasti")}</p>
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
          <span className="eyebrow">{t(content, "home_services_intro", "eyebrow", "What we do")}</span>
          <h2>{sp[0]}<span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{sAccent}</span>{sp[1] ?? ""}</h2>
          <p>{t(content, "home_services_intro", "description", "From the first creative spark to a polished master ready for broadcast and streaming.")}</p>
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
          <h2>{cp[0]}<span className="accent">{cAccent}</span>{cp[1] ?? ""}</h2>
          <p>{t(content, "home_cta", "description", "Tell us about your brief — we'll come back within 24 hours with a creative plan and a quote.")}</p>
          <Link to="/contact" className="btn">{t(content, "home_cta", "buttonLabel", "Start a project")} <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
