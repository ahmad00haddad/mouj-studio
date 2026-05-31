import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — Mouje Studio" },
      { name: "description", content: "Selected projects from Mouje Studio across film, advertising, games and podcasts." },
      { property: "og:title", content: "Works — Mouje Studio" },
      { property: "og:description", content: "Selected sonic works across film, ads, games and podcasts." },
    ],
  }),
  component: WorksPage,
});

const filters = [
  { key: "*", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "ads", label: "Advertising" },
  { key: "film", label: "Film & TV" },
  { key: "games", label: "Games" },
  { key: "podcast", label: "Podcasts" },
  { key: "post", label: "Sound & Mix" },
];

const items = [
  { tags: ["featured","ads"], img: "/assets/img/works/work-mixing.jpg", title: "Brand Anthem", client: "Aurora Beverages", role: "Composition · Mix", year: "2024" },
  { tags: ["featured","film"], img: "/assets/img/works/work-recording.jpg", title: "Indie Film Score", client: "Nahla Pictures", role: "Music Supervision", year: "2024" },
  { tags: ["post"], img: "/assets/img/works/work-sounddesign.jpg", title: "Documentary Mix", client: "Al-Madār Docs", role: "Sound Design · Mix", year: "2023" },
  { tags: ["featured","film"], img: "/assets/img/works/work-film.jpg", title: "Original Short Film Score", client: "Sunbird Studios", role: "Original Score", year: "2024" },
  { tags: ["podcast"], img: "/assets/img/works/work-podcast.jpg", title: "Weekly Podcast Production", client: "Sawt Network", role: "Edit · Mix · Mastering", year: "2024" },
  { tags: ["featured","games"], img: "/assets/img/works/hero-producer.jpg", title: "AAA Game Trailer", client: "Northwind Games", role: "Trailer Score · SFX", year: "2023" },
  { tags: ["post","film"], img: "/assets/img/works/work-foley.jpg", title: "Foley & Re-recording", client: "Cedar Films", role: "Foley · Re-recording", year: "2024" },
  { tags: ["ads"], img: "/assets/img/works/work-mixing.jpg", title: "TV Commercial", client: "Qura Co.", role: "Score · Mix", year: "2023" },
  { tags: ["podcast","ads"], img: "/assets/img/works/work-podcast.jpg", title: "Radio Imaging Package", client: "Wave FM", role: "Imaging · Sonic ID", year: "2024" },
  { tags: ["film"], img: "/assets/img/works/work-recording.jpg", title: "TV Series — Season 2", client: "Levant TV", role: "Composition · Edit", year: "2024" },
  { tags: ["games","post"], img: "/assets/img/works/work-sounddesign.jpg", title: "Mobile Game Audio Pack", client: "Pixel Forge", role: "Sound Design · UI SFX", year: "2023" },
  { tags: ["featured","ads"], img: "/assets/img/works/work-film.jpg", title: "Telecom Brand Campaign", client: "Orbit Telecom", role: "Audio Branding · Mix", year: "2024" },
];

const stats = [
  { n: "250+", l: "Projects delivered" },
  { n: "12", l: "Categories covered" },
  { n: "60+", l: "Active clients" },
  { n: "10+", l: "Years on air" },
];

const clients = ["Aurora", "Nahla Pictures", "Al-Madār", "Sunbird", "Sawt", "Northwind", "Cedar", "Qura", "Wave FM", "Levant TV", "Pixel Forge", "Orbit"];

const testimonials = [
  { quote: "Mouje Studio elevated our film to a whole new sonic level. The score still gives me chills.", name: "Layla H.", role: "Director, Nahla Pictures" },
  { quote: "Fast, precise, and genuinely creative. Our podcast finally sounds like the show I always heard in my head.", name: "Omar K.", role: "Showrunner, Sawt Network" },
  { quote: "The trailer score helped us close a publishing deal. That's how good it was.", name: "Rami D.", role: "Producer, Northwind Games" },
];

function WorksPage() {
  const [active, setActive] = useState("*");
  const filtered = items.filter(it => active === "*" || it.tags.includes(active));

  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">Portfolio</span>
          <h1>Our <span className="accent">works</span></h1>
          <p>A selection of recent projects across film, advertising, games and podcasts.</p>
        </div>

        <div className="stats-grid" style={{ marginBottom: "3rem", maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          {stats.map(s => (
            <div className="stat-card" key={s.l}><h3>{s.n}</h3><p>{s.l}</p></div>
          ))}
        </div>

        <div className="works-filters">
          {filters.map(f => (
            <button key={f.key} className={active === f.key ? "on" : ""} onClick={() => setActive(f.key)}>{f.label}</button>
          ))}
        </div>

        <div className="works-grid">
          {filtered.map((it, i) => (
            <div className="work" key={i}>
              <img src={it.img} alt={it.title} loading="lazy" />
              <span className="year" style={{ position: "absolute", top: "1rem", right: "1rem", padding: ".25rem .65rem", borderRadius: 999, background: "rgba(255,255,255,.1)", backdropFilter: "blur(10px)", fontSize: ".75rem", fontWeight: 600, zIndex: 2 }}>{it.year}</span>
              <div className="work-overlay">
                <h3>{it.title}</h3>
                <p>{it.client} · {it.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Trusted by</span>
          <h2>Teams across the <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>region</span></h2>
        </div>
        <div className="clients">
          {clients.map(c => <div className="client-pill" key={c}>{c}</div>)}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Testimonials</span>
          <h2>What clients <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>say</span></h2>
        </div>
        <div className="testis">
          {testimonials.map(t => (
            <figure className="testi" key={t.name}>
              <span className="quote-mark"><i className="bx bxs-quote-alt-left"></i></span>
              <blockquote>{t.quote}</blockquote>
              <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
