import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Mouje Studio - works" },
      { name: "description", content: "Mouje Studio works portfolio." },
      { property: "og:title", content: "Mouje Studio - works" },
    ],
    links: [{ rel: "stylesheet", href: "/css/works.css" }],
  }),
  component: WorksPage,
});

const filters = [
  { key: "*", label: "Show All", cls: "filters-list__item--active" },
  { key: "filter-featured", label: "Featured", cls: "filters-list__item--featured" },
  { key: "filter-music-for-advertising", label: "Music For Advertising", cls: "filters-list__item--music-for-advertising" },
  { key: "filter-music-supervision", label: "Music Supervision", cls: "filters-list__item--music-supervision" },
  { key: "filter-sound-and-mix", label: "Sound & Mix", cls: "filters-list__item--sound-and-mix" },
  { key: "filter-music-for-film-and-tv", label: "Music For Film & TV", cls: "filters-list__item--music-for-tv-and-film" },
  { key: "filter-radio-and-podcasts", label: "Radio & Podcasts", cls: "filters-list__item--radio-imaging" },
  { key: "filter-game-trailers", label: "Game Trailers", cls: "filters-list__item--game-trailers" },
];

const items = [
  { cls: "filter-featured filter-music-for-advertising", img: "/assets/img/works/work-mixing.jpg", title: "Brand Anthem — Featured Ad", client: "Aurora Beverages", role: "Composition · Mix", year: "2024" },
  { cls: "filter-music-supervision filter-featured", img: "/assets/img/works/work-recording.jpg", title: "Indie Film Music Supervision", client: "Nahla Pictures", role: "Music Supervision", year: "2024" },
  { cls: "filter-sound-and-mix", img: "/assets/img/works/work-sounddesign.jpg", title: "Documentary Sound & Mix", client: "Al-Madār Docs", role: "Sound Design · Mix", year: "2023" },
  { cls: "filter-music-for-film-and-tv filter-featured", img: "/assets/img/works/work-film.jpg", title: "Original Score — Short Film", client: "Sunbird Studios", role: "Original Score", year: "2024" },
  { cls: "filter-radio-and-podcasts", img: "/assets/img/works/work-podcast.jpg", title: "Weekly Podcast Production", client: "Sawt Network", role: "Edit · Mix · Mastering", year: "2024" },
  { cls: "filter-game-trailers filter-featured", img: "/assets/img/works/hero-producer.jpg", title: "AAA Game Trailer", client: "Northwind Games", role: "Trailer Score · SFX", year: "2023" },
  { cls: "filter-sound-and-mix filter-music-for-film-and-tv", img: "/assets/img/works/work-foley.jpg", title: "Foley & Re-recording Mix", client: "Cedar Films", role: "Foley · Re-recording", year: "2024" },
  { cls: "filter-music-for-advertising", img: "/assets/img/works/work-mixing.jpg", title: "TV Commercial — Beverage Brand", client: "Qura Co.", role: "Score · Mix", year: "2023" },
  { cls: "filter-radio-and-podcasts filter-music-for-advertising", img: "/assets/img/works/work-podcast.jpg", title: "Radio Imaging Package", client: "Wave FM", role: "Imaging · Sonic ID", year: "2024" },
  { cls: "filter-music-supervision filter-music-for-film-and-tv", img: "/assets/img/works/work-recording.jpg", title: "TV Series — Season 2 Score", client: "Levant TV", role: "Composition · Edit", year: "2024" },
  { cls: "filter-sound-and-mix filter-game-trailers", img: "/assets/img/works/work-sounddesign.jpg", title: "Mobile Game — Audio Pack", client: "Pixel Forge", role: "Sound Design · UI SFX", year: "2023" },
  { cls: "filter-music-for-advertising filter-featured", img: "/assets/img/works/work-film.jpg", title: "Telecom Brand Campaign", client: "Orbit Telecom", role: "Audio Branding · Mix", year: "2024" },
];

const stats = [
  { n: "250+", l: "Projects Delivered" },
  { n: "12", l: "Featured Categories" },
  { n: "60+", l: "Active Clients" },
  { n: "10+", l: "Years On Air" },
];

const clients = ["Aurora", "Nahla Pictures", "Al-Madār", "Sunbird", "Sawt", "Northwind", "Cedar", "Qura", "Wave FM", "Levant TV", "Pixel Forge", "Orbit"];

const testimonials = [
  { quote: "Mouje Studio elevated our film to a whole new sonic level. The score still gives me chills.", name: "Layla H.", role: "Director, Nahla Pictures" },
  { quote: "Fast, precise, and genuinely creative. Our podcast finally sounds like the show I always heard in my head.", name: "Omar K.", role: "Showrunner, Sawt Network" },
  { quote: "The trailer score they delivered helped us close a publishing deal. That's how good it was.", name: "Rami D.", role: "Producer, Northwind Games" },
];

function WorksPage() {
  const [active, setActive] = useState("*");
  return (
    <>
      <section className="works" id="works">
        <h1>Our <span>Works</span></h1>
        <p className="works-sub">A selection of recent projects across film, advertising, games and podcasts.</p>
        <div className="works-stats">
          {stats.map((s) => (
            <div className="works-stat" key={s.l}><h3>{s.n}</h3><p>{s.l}</p></div>
          ))}
        </div>
      </section>
      <section className="work-filters">
        <div className="wrap">
          <ul className="filters-list">
            {filters.map((f) => (
              <li
                key={f.key}
                className={`filters-list__item ${f.cls} ${active === f.key ? "filters-list__item--active" : ""}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="content-grid">
          {items
            .filter((it) => active === "*" || it.cls.includes(active))
            .map((it, i) => (
              <div key={i} className={`content-item ${it.cls}`}>
                <img src={it.img} alt={it.title} loading="lazy" />
                <div className="content-item__overlay">
                  <div>
                    <h3>{it.title}</h3>
                    <p className="content-item__meta">{it.client} · {it.role}</p>
                  </div>
                  <span>{it.year}</span>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="clients-strip">
        <h2>Trusted by teams across the region</h2>
        <div className="clients-row">
          {clients.map((c) => (<div className="client-pill" key={c}>{c}</div>))}
        </div>
      </section>

      <section className="testimonials">
        <div className="services-header">
          <h2>What clients <span>say</span></h2>
          <p>A few words from teams we've shipped sound for.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <figure className="testimonial-card" key={t.name}>
              <i className="bx bxs-quote-alt-left"></i>
              <blockquote>{t.quote}</blockquote>
              <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
