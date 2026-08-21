import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCms, s as t, list } from "@/lib/useCms";
import TrackPlayer from "@/components/TrackPlayer";


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

const fallbackItems = [
  { tags: ["featured","games"], img: "/assets/img/works/hero-producer.jpg", title: "Jawaker's World Cup Radio", client: "Jawaker", role: "Live Broadcast · Audio Direction", year: "2023" },
  { tags: ["featured","podcast"], img: "/assets/img/works/work-podcast.jpg", title: "Youm Jadeed (يوم جديد)", client: "Sowt × Mouje · Education Above All", role: "Voice Direction · Sound Design · Mix", year: "2025" },
  { tags: ["featured","post"], img: "/assets/img/works/work-mixing.jpg", title: "Watar Group — Live Audio", client: "Watar El Sharq · Watar Pop", role: "Audio Director · Live Mix", year: "2025" },
  { tags: ["featured","music"], img: "/assets/img/works/work-recording.jpg", title: "Xetopia (LP — in production)", client: "MOUJE", role: "Composition · Production · Mix", year: "2025" },
  { tags: ["music"], img: "/assets/img/works/work-sounddesign.jpg", title: "Saken (ساكن)", client: "MOUJE", role: "Original · Electronic Synthpop", year: "2021" },
  { tags: ["music","featured"], img: "/assets/img/works/work-film.jpg", title: "Rah Telhaqni (راح تلحقني)", client: "MOUJE feat. Desana", role: "First Arabic Electronic Original · 5.2k+ views", year: "2021" },
  { tags: ["music"], img: "/assets/img/works/work-foley.jpg", title: "Madeon — Dream Dream Dream", client: "Acapella Cover", role: "Endorsed by Madeon", year: "2020" },
  { tags: ["music","post"], img: "/assets/img/works/work-recording.jpg", title: "Ertidad — Debut Album", client: "Ertidad", role: "Production · Mix · Master · Keys", year: "2022" },
  { tags: ["games"], img: "/assets/img/works/work-sounddesign.jpg", title: "Jawaker Card Game Audio", client: "Jawaker", role: "Audio Engine · SFX · Music · VO", year: "2024" },
  { tags: ["games","post"], img: "/assets/img/works/hero-producer.jpg", title: "Jawaker LiveOps Audio", client: "Jawaker", role: "Localization (IQ · EG · KSA) · LiveOps", year: "2023" },
  { tags: ["post"], img: "/assets/img/works/work-foley.jpg", title: "Mawdoo3 — Audio Sessions", client: "Mawdoo3.com", role: "Recording · Edit · Mix", year: "2024" },
  { tags: ["ads","post"], img: "/assets/img/works/work-mixing.jpg", title: "Netflix · Rush Production Sessions", client: "Netflix / Rush Production House", role: "Recording · Audio Post", year: "2024" },
];

const fallbackStats = [
  { n: "13+", l: "Years in audio" },
  { n: "10k", l: "Peak live listeners" },
  { n: "150k+", l: "World Cup Radio reach" },
  { n: "80", l: "Episodes — Youm Jadeed" },
];

const fallbackClients = ["Netflix", "Mawdoo3", "Rush Production", "Sowt", "Jawaker", "Education Above All", "LAPIS", "Watar Group", "Ertidad", "MOUJE"];

const fallbackTestimonials = [
  { quote: "Damn crazy!!!!!! Wowww", name: "Madeon", role: "On Mouje's acapella cover of 'Dream Dream Dream'" },
  { quote: "Motaz built our entire audio pipeline from scratch and led the World Cup Radio that drove our biggest LiveOps month ever.", name: "Jawaker Team", role: "Card Game · Middle East" },
  { quote: "A true partner — voice direction, sound design and mix across all 80 episodes. The show sounds world-class.", name: "Sowt Podcasts", role: "Youm Jadeed · Education Above All" },
];

function WorksPage() {
  const [active, setActive] = useState("*");
  const { content, works, testimonials: dbT } = useCms();
  const items = works.length
    ? works.map((w) => ({ tags: w.tags ?? [], img: w.image_url || "/assets/img/works/hero-producer.jpg", title: w.title, client: w.client ?? "", role: w.role ?? "", year: w.year ?? "" }))
    : fallbackItems;
  const filtered = items.filter(it => active === "*" || it.tags.includes(active));
  const stats = list<{ n: string; l: string }>(content, "home_stats", "items", fallbackStats);
  const clientItems = list<{ name: string; logo?: string }>(content, "works_clients", "items", fallbackClients.map(n => ({ name: n })));
  const testimonials = dbT.length ? dbT.map(x => ({ quote: x.quote, name: x.name, role: x.role ?? "" })) : fallbackTestimonials;

  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">{t(content, "works_intro", "eyebrow", "Portfolio")}</span>
          <h1>{t(content, "works_intro", "title", "Our works")}</h1>
          <p>{t(content, "works_intro", "description", "A selection of recent projects across film, advertising, games and podcasts.")}</p>
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
          {clientItems.map((c, i) => <div className="client-pill" key={c.name || i}>{c.name}</div>)}
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
