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
  { cls: "filter-featured filter-music-for-advertising", img: "/assets/img/works/work-mixing.jpg", title: "Brand Anthem — Featured Ad", year: "2024" },
  { cls: "filter-music-supervision filter-featured", img: "/assets/img/works/work-recording.jpg", title: "Indie Film Music Supervision", year: "2024" },
  { cls: "filter-sound-and-mix", img: "/assets/img/works/work-sounddesign.jpg", title: "Documentary Sound & Mix", year: "2023" },
  { cls: "filter-music-for-film-and-tv filter-featured", img: "/assets/img/works/work-film.jpg", title: "Original Score — Short Film", year: "2024" },
  { cls: "filter-radio-and-podcasts", img: "/assets/img/works/work-podcast.jpg", title: "Weekly Podcast Production", year: "2024" },
  { cls: "filter-game-trailers", img: "/assets/img/works/hero-producer.jpg", title: "AAA Game Trailer", year: "2023" },
  { cls: "filter-sound-and-mix filter-music-for-film-and-tv", img: "/assets/img/works/work-foley.jpg", title: "Foley & Re-recording Mix", year: "2024" },
  { cls: "filter-music-for-advertising", img: "/assets/img/works/work-mixing.jpg", title: "TV Commercial — Beverage Brand", year: "2023" },
  { cls: "filter-radio-and-podcasts filter-music-for-advertising", img: "/assets/img/works/work-podcast.jpg", title: "Radio Imaging Package", year: "2024" },
];

function WorksPage() {
  const [active, setActive] = useState("*");
  return (
    <>
      <section className="works" id="works">
        <h1>Our <span>Works</span></h1>
        <p className="works-sub">A selection of recent projects across film, advertising, games and podcasts.</p>
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
                  <h3>{it.title}</h3>
                  <span>{it.year}</span>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
