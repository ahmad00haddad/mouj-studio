import { createFileRoute, Link } from "@tanstack/react-router";
import { useCms, s as t, list } from "@/lib/useCms";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";

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
  { n: "13+", l: "stat_years" },
  { n: "10k", l: "stat_listeners" },
  { n: "150k+", l: "stat_radio" },
  { n: "80", l: "stat_episodes" },
];

function Index() {
  const { content, services: dbServices } = useCms();
  const { lang } = useI18n();
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
            <span className="eyebrow">{T[lang].hero_eyebrow}</span>
            <h1>{T[lang].hero_title}</h1>
            <p>{T[lang].hero_desc}</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn">{T[lang].hero_btn_contact} <i className="bx bx-right-arrow-alt"></i></Link>
              <Link to="/works" className="btn btn-ghost">{T[lang].hero_btn_works}</Link>
            </div>
            <div className="hero-socials">
              <a href={t(content, "site_social", "instagram", "https://www.instagram.com/moujestudio/")} aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
              <a href={t(content, "site_social", "linkedin", "https://www.linkedin.com/company/moujestudio/")} aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
              <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
            </div>
          </div>

          <div className="bento hero-portrait" data-parallax="-0.05">
            <img src={t(content, "home_hero", "image", "/assets/img/home-img.webp")} alt="Mouje Studio control room" />
          </div>

          <div className="bento glow hero-pill">
            <i className="bx bxs-award"></i>
            <div>
              <strong>{T[lang].hero_pill_title}</strong>
              <span>{T[lang].hero_pill_sub}</span>
            </div>
          </div>

          <div className="bento hero-eq" data-parallax="0.1">
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </div>

          <div className="bento dark hero-cta">
            <div>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{T[lang].hero_rig_title}</strong>
              <p style={{ fontSize: ".85rem", margin: 0 }}>{T[lang].hero_rig_desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          {stats.map(s => (
            <div className="stat-card" key={s.l}>
              <h3>{s.n}</h3>
              <p>{T[lang][s.l as keyof typeof T["en"]]}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].home_svc_eyebrow}</span>
          <h2>{T[lang].home_svc_title}</h2>
          <p>{T[lang].home_svc_desc}</p>
        </div>
        <div className="services-bento">
          {services.map((s, i) => (
            <Link key={s.slug} to="/services" hash={s.slug} className={`svc ${i === 0 ? "wide feat" : ""}`}>
              <div className="svc-ico"><i className={`bx ${s.icon}`}></i></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="svc-link">{T[lang].svc_learn_more} <i className="bx bx-right-arrow-alt"></i></span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="cta-block">
          <h2>{T[lang].home_cta_title}</h2>
          <p>{T[lang].home_cta_desc}</p>
          <Link to="/contact" className="btn">{T[lang].home_cta_btn} <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
