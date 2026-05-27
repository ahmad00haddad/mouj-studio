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
  { cls: "filter-featured filter-music-for-advertising", img: "https://via.placeholder.com/300x200.png?text=Featured+Ad+1", alt: "Featured Ad 1" },
  { cls: "filter-music-supervision", img: "https://via.placeholder.com/300x200.png?text=Music+Supervision+1", alt: "Music Supervision 1" },
  { cls: "filter-sound-and-mix", img: "https://via.placeholder.com/300x200.png?text=Sound+Mix+1", alt: "Sound Mix 1" },
  { cls: "filter-music-for-film-and-tv", img: "https://via.placeholder.com/300x200.png?text=Film+TV+1", alt: "Film TV 1" },
  { cls: "filter-radio-and-podcasts", img: "https://via.placeholder.com/300x200.png?text=Radio+Podcast+1", alt: "Radio Podcast 1" },
  { cls: "filter-game-trailers", img: "https://via.placeholder.com/300x200.png?text=Game+Trailer+1", alt: "Game Trailer 1" },
];

function WorksPage() {
  const [active, setActive] = useState("*");
  return (
    <>
      <section className="works" id="works">
        <h1>Works Lezgo</h1>
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
                <img src={it.img} alt={it.alt} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
