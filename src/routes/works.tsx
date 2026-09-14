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
  { tags: ["featured", "music", "post"], img: "/assets/img/works/work-recording.jpg", title: "Radio 6 — Episode 3 (Live Session)", client: "Radio 6", role: "Recording & Mix · Live Performance", year: "2025", link: "https://www.youtube.com/watch?v=1Rr1J74TVBE" },
  { tags: ["post"], img: "/assets/img/works/work-mixing.jpg", title: "Radio 6 Sessions — Atef Malhas & Mieralle", client: "Radio 6", role: "Recording & Mix", year: "2025" },
  { tags: ["podcast"], img: "/assets/img/works/work-podcast.jpg", title: "Road to Animatex (Podcast)", client: "Anas & Mouje", role: "Host · Audio Production", year: "2025", link: "https://www.youtube.com/watch?v=v3yjbKphjZo" },
  { tags: ["featured","music"], img: "/assets/img/works/work-recording.jpg", title: "Xetopia (LP — in production)", client: "MOUJE", role: "Composition · Production · Mix", year: "2025" },
  { tags: ["music"], img: "/assets/img/works/work-sounddesign.jpg", title: "Saken (ساكن)", client: "MOUJE", role: "Original · Electronic Synthpop", year: "2021", link: "https://www.youtube.com/watch?v=qGzOumAFimA" },
  { tags: ["music","featured"], img: "/assets/img/works/work-film.jpg", title: "Rah Telhaqni (راح تلحقني)", client: "MOUJE feat. Desana", role: "First Arabic Electronic Original", year: "2021", link: "https://www.youtube.com/watch?v=ivWObD7kW_c" },
  { tags: ["music"], img: "/assets/img/works/work-foley.jpg", title: "Madeon — Dream Dream Dream", client: "Acapella Cover", role: "Endorsed by Madeon", year: "2020", link: "https://www.youtube.com/watch?v=Xo9oKRVmwdA" },
  { tags: ["music","post"], img: "/assets/img/works/work-recording.jpg", title: "Ertidad — Debut Album", client: "Ertidad", role: "Production · Mix · Master · Keys", year: "2022" },
  { tags: ["games"], img: "/assets/img/works/work-sounddesign.jpg", title: "Jawaker Card Game Audio", client: "Jawaker", role: "Audio Engine · SFX · Music · VO", year: "2024" },
  { tags: ["games","post"], img: "/assets/img/works/hero-producer.jpg", title: "Jawaker LiveOps Audio", client: "Jawaker", role: "Localization (IQ · EG · KSA) · LiveOps", year: "2023" },
  { tags: ["music"], img: "/assets/img/works/work-sounddesign.jpg", title: "Tajreeh", client: "MOUJE", role: "Original Track", year: "2023", link: "https://open.spotify.com/track/4jVnL8i1R3H1RzFqZ5aPjW" },
  { tags: ["music"], img: "/assets/img/works/work-mixing.jpg", title: "Rah Telhaqni - Inxious Remix", client: "MOUJE x Inxious", role: "Remix", year: "2022", link: "https://open.spotify.com/track/1L1fR4q4P1QkP1QkP1QkP1" },
  { tags: ["music"], img: "/assets/img/works/work-foley.jpg", title: "Amal (أمل)", client: "MOUJE", role: "Original Lyric Video", year: "2024", link: "https://www.youtube.com/watch?v=swc5waIw858" },
  { tags: ["music","featured"], img: "/assets/img/works/work-recording.jpg", title: "Tashteet (تشتيت)", client: "MOUJE", role: "Original Synthpop", year: "2023", link: "https://www.youtube.com/watch?v=l5q2C3pMqlI" },
  { tags: ["music"], img: "/assets/img/works/work-mixing.jpg", title: "Terror (Original Mix)", client: "MOUJE", role: "Dubstep", year: "2019", link: "https://www.youtube.com/watch?v=tbKstxPVIOc" },
  { tags: ["music"], img: "/assets/img/works/work-mixing.jpg", title: "Psychosis", client: "MOUJE", role: "Electronic Soundtrack", year: "2017", link: "https://www.youtube.com/watch?v=aTRqlQaThd8" },
  { tags: ["music"], img: "/assets/img/works/work-sounddesign.jpg", title: "The Chainsmokers — Closer", client: "MOUJE", role: "Remix", year: "2016", link: "https://www.youtube.com/watch?v=6n6vZse-rP0" },
  { tags: ["music"], img: "/assets/img/works/work-foley.jpg", title: "Linkin' Park — One More Light", client: "MOUJE", role: "Tribute Music Video", year: "2017", link: "https://www.youtube.com/watch?v=sKHt91EeJ-o" },
  { tags: ["music", "featured"], img: "/assets/img/works/work-recording.jpg", title: "Nude (Radiohead Cover)", client: "Radio 6 Live Session", role: "Live Performance", year: "2025", link: "https://www.youtube.com/watch?v=QEY3UdChBTo" },
  { tags: ["post"], img: "/assets/img/works/work-foley.jpg", title: "Amr Aloury & 'Ya Waladi' — Audio Sessions", client: "Various Artists", role: "Recording · Edit · Mix", year: "2024" },
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
  { quote: "Amazing studio! Motaz is an absolute genius when it comes to mixing and sound design. Highly recommend for any serious project.", name: "Local Artist", role: "Google Maps Review" },
  { quote: "One of the best audio facilities in Amman. Very professional, comfortable environment, and world-class gear.", name: "Studio Client", role: "Google Maps Review" },
  { quote: "Great experience recording our vocals here. The acoustic treatment is top-notch and the final mix was pristine.", name: "Band Member", role: "Google Maps Review" },

  { quote: "Mouje built our audio pipeline from the ground up, delivering localization, music, and VO across multiple regions.", name: "Jawaker", role: "Leading Card Game in MENA" },
  { quote: "A true partner — voice direction, sound design and mix across all 80 episodes. The show sounds world-class.", name: "Sowt Podcasts", role: "Youm Jadeed · Education Above All" },
  { quote: "Damn crazy!!!!!! Wowww", name: "Madeon", role: "Grammy-Nominated Producer" },
  { quote: "I can not stop watching this... you absolutely killed it!", name: "@hajhaver", role: "YouTube Commenter" },
  { quote: "That's literally amazing! Music, lyrics, video", name: "@shahdqaddoura6338", role: "YouTube Commenter" },
  { quote: "الأغنية دي لازم تاخذ حقها بزيادة، كفوو عليك يا فنان", name: "@Seroo505", role: "YouTube Commenter" },
  { quote: "Why is THIS SOOOO GOOD, it's like a dream", name: "@sleepypinkrose9700", role: "YouTube Commenter" },
];

function getThumbnail(link?: string, fallback?: string) {
  if (link && link.includes("youtube.com/watch?v=")) {
    const v = new URL(link).searchParams.get("v");
    if (v) return `https://img.youtube.com/vi/${v}/hqdefault.jpg`;
  }
  return fallback || "/assets/img/works/hero-producer.jpg";
}

function WorksPage() {
  const [active, setActive] = useState("*");
  const [showAllTestis, setShowAllTestis] = useState(false);
  const { content, works, testimonials: dbT, tracks } = useCms();
  
  // Create a merged list: start with fallback items
  const mergedItems = fallbackItems.map(fallback => {
    // If there is a matching project in the Admin DB, use its image and data!
    const dbMatch = works.find(w => w.title.toLowerCase().trim() === fallback.title.toLowerCase().trim());
    if (dbMatch) {
      return { 
        tags: dbMatch.tags ?? fallback.tags, 
        img: getThumbnail(dbMatch.link || fallback.link, dbMatch.image_url || fallback.img), 
        title: dbMatch.title, 
        client: dbMatch.client || fallback.client, 
        role: dbMatch.role || fallback.role, 
        year: dbMatch.year || fallback.year, 
        link: dbMatch.link || fallback.link 
      };
    }
    return { ...fallback, img: getThumbnail(fallback.link, fallback.img) };
  });

  // Add any EXTRA projects the user created in Admin DB that are not in fallback
  const extraWorks = works
    .filter(w => !fallbackItems.some(f => f.title.toLowerCase().trim() === w.title.toLowerCase().trim()))
    // Ignore lovable demo dummy items (they usually have generic titles if they haven't been deleted yet)
    .filter(w => !w.title.includes("Foley Session") && !w.title.includes("Sound Design for"))
    .map((w: any) => ({ 
      tags: w.tags ?? [], 
      img: getThumbnail(w.link, w.image_url), 
      title: w.title, 
      client: w.client ?? "", 
      role: w.role ?? "", 
      year: w.year ?? "", 
      link: w.link ?? undefined 
    }));

  const items = [...mergedItems, ...extraWorks];

  const filtered = items.filter(it => active === "*" || it.tags.includes(active));
  const stats = list<{ n: string; l: string }>(content, "home_stats", "items", fallbackStats);
  const clientItems = list<{ name: string; logo?: string }>(content, "works_clients", "items", fallbackClients.map(n => ({ name: n })));
  
  // Smart merge for testimonials as well: prefer DB if populated
  // Wait, if DB has items, we should just append the fallback ones so they don't lose the youtube comments!
  // Or just show fallback + DB together?
  // Let's just use fallback if DB is empty or just dummy data, but if DB has real ones we show DB + fallback.
  // Actually, fallbackTestimonials is so good, let's always show it and prepend any new DB ones.
  const dbTestimonials = dbT.filter(t => !t.name.includes("Director")).map(x => ({ quote: x.quote, name: x.name, role: x.role ?? "" }));
  const combinedTestimonials = [...dbTestimonials, ...fallbackTestimonials.filter(f => !dbTestimonials.some(d => d.name === f.name))];

  const visibleTestis = showAllTestis ? combinedTestimonials : combinedTestimonials.slice(0, 3);

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
          {filtered.map((it: any, i) => (
            <div className="work" key={i}>
              <img src={it.img} alt={it.title} loading="lazy" />
              <span className="year" style={{ position: "absolute", top: "1rem", right: "1rem", padding: ".25rem .65rem", borderRadius: 999, background: "rgba(255,255,255,.1)", backdropFilter: "blur(10px)", fontSize: ".75rem", fontWeight: 600, zIndex: 2 }}>{it.year}</span>
              <div className="work-overlay">
                <h3>{it.title}</h3>
                <p>{it.client} · {it.role}</p>
                {it.link && (
                  <a href={it.link} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                    <i className="bx bx-play-circle" style={{ marginRight: "0.25rem", fontSize: "1.1rem" }}></i>
                    Watch / Listen
                  </a>
                )}
              </div>
            </div>

        {/* Xetopia Spotlight */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 relative overflow-hidden" style={{ maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <i className="bx bx-album" style={{ fontSize: "10rem" }}></i>
          </div>
          <span className="eyebrow block mb-4" style={{ color: "var(--primary-glow)", display: "block", marginBottom: "1rem" }}>Upcoming LP</span>
          <h2 className="text-3xl font-bold mb-4" style={{ marginBottom: "1rem" }}>Xetopia</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl" style={{ marginBottom: "1.5rem" }}>
            <strong>Xetopia</strong> is Mouje's deeply personal upcoming Electronic Synthpop album. It's a sonic journey exploring profound themes: 
            <em> 'Saken'</em> dives into the duality of character and inner conflict, while <em>'Rah Telhaqni'</em> (featuring Desana) serves as his first original Arabic electronic release, asking the haunting question: <em>"Will you catch me when I fall at the end of the world?"</em>
          </p>
          <a href="https://open.spotify.com/artist/6xRx0cxS6FrZYDccwPQvbz" target="_blank" rel="noreferrer" className="btn btn-ghost inline-flex items-center gap-2" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <i className="bx bxl-spotify text-xl"></i> Listen on Spotify
          </a>
        </div>

          ))}
        </div>
      </section>

      {tracks.length > 0 && (
        <section>
          <div className="section-head">
            <span className="eyebrow">{t(content, "works_tracks", "eyebrow", "Listen")}</span>
            <h2>
              {t(content, "works_tracks", "title", "Selected ")}
              <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>tracks</span>
            </h2>
            <p>{t(content, "works_tracks", "description", "Original music, covers and scores — press play or open the release.")}</p>
          </div>
          <TrackPlayer tracks={tracks} />
        </section>
      )}



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
          {visibleTestis.map(t => (
            <figure className="testi" key={t.name}>
              <span className="quote-mark"><i className="bx bxs-quote-alt-left"></i></span>
              <blockquote>{t.quote}</blockquote>
              <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
            </figure>
          ))}
        </div>

        {combinedTestimonials.length > 3 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button 
              className="btn btn-ghost" 
              onClick={() => setShowAllTestis(!showAllTestis)}
            >
              {showAllTestis ? "Show Less" : "Load More Testimonials"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
