import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCms, s as t, list } from "@/lib/useCms";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";
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

const getFilters = (lang: "en" | "ar") => [
  { key: "*", label: T[lang].works_filter_all },
  { key: "featured", label: T[lang].works_filter_featured },
  { key: "ads", label: T[lang].works_filter_advertising },
  { key: "film", label: T[lang].works_filter_film },
  { key: "games", label: T[lang].works_filter_games },
  { key: "podcast", label: T[lang].works_filter_podcasts },
  { key: "post", label: T[lang].works_filter_sound_mix },
];

const fallbackItems = [
  { tags: ["featured","games"], img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80", title: "Jawaker's World Cup Radio", client: "Jawaker", role: "Live Broadcast · Audio Direction", year: "2023" },
  { tags: ["featured","podcast"], img: "https://images.unsplash.com/photo-1581368129680-e380fb147748?w=800&q=80", title: "Youm Jadeed (يوم جديد)", client: "Sowt × Mouje · Education Above All", role: "Voice Direction · Sound Design · Mix", year: "2025" },
  { tags: ["featured","post"], img: "https://images.unsplash.com/photo-1621360841013-c76831f13b63?w=800&q=80", title: "Watar Group — Live Audio", client: "Watar El Sharq · Watar Pop", role: "Audio Director · Live Mix", year: "2025" },
  { tags: ["featured", "music", "post"], img: "https://images.unsplash.com/photo-1516280440502-3c27ce052c92?w=800&q=80", title: "Radio 6 — Episode 3 (Live Session)", client: "Radio 6", role: "Recording & Mix · Live Performance", year: "2025", link: "https://www.youtube.com/watch?v=1Rr1J74TVBE" },
  { tags: ["post"], img: "https://images.unsplash.com/photo-1621360841013-c76831f13b63?w=800&q=80", title: "Radio 6 Sessions — Atef Malhas & Mieralle", client: "Radio 6", role: "Recording & Mix", year: "2025" },
  { tags: ["podcast"], img: "https://images.unsplash.com/photo-1581368129680-e380fb147748?w=800&q=80", title: "Road to Animatex (Podcast)", client: "Anas & Mouje", role: "Host · Audio Production", year: "2025", link: "https://www.youtube.com/watch?v=v3yjbKphjZo" },
  { tags: ["featured","music"], img: "https://images.unsplash.com/photo-1516280440502-3c27ce052c92?w=800&q=80", title: "Xetopia (LP — in production)", client: "MOUJE", role: "Composition · Production · Mix", year: "2025" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1550204360-179374092b77?w=800&q=80", title: "Saken (ساكن)", client: "MOUJE", role: "Original · Electronic Synthpop", year: "2021", link: "https://www.youtube.com/watch?v=qGzOumAFimA" },
  { tags: ["music","featured"], img: "/assets/img/works/work-film.jpg", title: "Rah Telhaqni (راح تلحقني)", client: "MOUJE feat. Desana", role: "First Arabic Electronic Original", year: "2021", link: "https://www.youtube.com/watch?v=ivWObD7kW_c" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80", title: "Madeon — Dream Dream Dream", client: "Acapella Cover", role: "Endorsed by Madeon", year: "2020", link: "https://www.youtube.com/watch?v=Xo9oKRVmwdA" },
  { tags: ["music","post"], img: "https://images.unsplash.com/photo-1516280440502-3c27ce052c92?w=800&q=80", title: "Ertidad — Debut Album", client: "Ertidad", role: "Production · Mix · Master · Keys", year: "2022" },
  { tags: ["games"], img: "https://images.unsplash.com/photo-1550204360-179374092b77?w=800&q=80", title: "Jawaker Card Game Audio", client: "Jawaker", role: "Audio Engine · SFX · Music · VO", year: "2024" },
  { tags: ["games","post"], img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80", title: "Jawaker LiveOps Audio", client: "Jawaker", role: "Localization (IQ · EG · KSA) · LiveOps", year: "2023" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1550204360-179374092b77?w=800&q=80", title: "Tajreeh", client: "MOUJE", role: "Original Track", year: "2023", link: "https://open.spotify.com/track/4jVnL8i1R3H1RzFqZ5aPjW" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1621360841013-c76831f13b63?w=800&q=80", title: "Rah Telhaqni - Inxious Remix", client: "MOUJE x Inxious", role: "Remix", year: "2022", link: "https://open.spotify.com/track/1L1fR4q4P1QkP1QkP1QkP1" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80", title: "Amal (أمل)", client: "MOUJE", role: "Original Lyric Video", year: "2024", link: "https://www.youtube.com/watch?v=swc5waIw858" },
  { tags: ["music","featured"], img: "https://images.unsplash.com/photo-1516280440502-3c27ce052c92?w=800&q=80", title: "Tashteet (تشتيت)", client: "MOUJE", role: "Original Synthpop", year: "2023", link: "https://www.youtube.com/watch?v=l5q2C3pMqlI" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1621360841013-c76831f13b63?w=800&q=80", title: "Terror (Original Mix)", client: "MOUJE", role: "Dubstep", year: "2019", link: "https://www.youtube.com/watch?v=tbKstxPVIOc" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1621360841013-c76831f13b63?w=800&q=80", title: "Psychosis", client: "MOUJE", role: "Electronic Soundtrack", year: "2017", link: "https://www.youtube.com/watch?v=aTRqlQaThd8" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1550204360-179374092b77?w=800&q=80", title: "The Chainsmokers — Closer", client: "MOUJE", role: "Remix", year: "2016", link: "https://www.youtube.com/watch?v=6n6vZse-rP0" },
  { tags: ["music"], img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80", title: "Linkin' Park — One More Light", client: "MOUJE", role: "Tribute Music Video", year: "2017", link: "https://www.youtube.com/watch?v=sKHt91EeJ-o" },
  { tags: ["music", "featured"], img: "https://images.unsplash.com/photo-1516280440502-3c27ce052c92?w=800&q=80", title: "Nude (Radiohead Cover)", client: "Radio 6 Live Session", role: "Live Performance", year: "2025", link: "https://www.youtube.com/watch?v=QEY3UdChBTo" },
  { tags: ["post"], img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80", title: "Amr Aloury & 'Ya Waladi' — Audio Sessions", client: "Various Artists", role: "Recording · Edit · Mix", year: "2024" },
  { tags: ["post"], img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80", title: "Mawdoo3 — Audio Sessions", client: "Mawdoo3.com", role: "Recording · Edit · Mix", year: "2024" },
  { tags: ["ads","post"], img: "https://images.unsplash.com/photo-1621360841013-c76831f13b63?w=800&q=80", title: "Netflix · Rush Production Sessions", client: "Netflix / Rush Production House", role: "Recording · Audio Post", year: "2024" },
];

const fallbackStats = [
  { n: "13+", l: "stat_years" },
  { n: "10k", l: "stat_listeners" },
  { n: "150k+", l: "stat_radio" },
  { n: "80", l: "stat_episodes" },
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
  return fallback || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80";
}

function WorksPage() {
  const [active, setActive] = useState("*");
  const [showAllTestis, setShowAllTestis] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const { content, works, testimonials: dbT, tracks } = useCms();
  const { lang } = useI18n();
  
  // Create a merged list: start with fallback items
  const mergedItems = fallbackItems.map(fallback => {
    // Inject Arabic translations for known fallback items
    if (lang === "ar") {
        if (fallback.title === "Xetopia Spotlight") {
            fallback = { ...fallback, title: "Xetopia", client: "موج", role: "ألبوم منفرد" };
        } else if (fallback.title === "Youm Jadeed") {
            fallback = { ...fallback, title: "يوم جديد", client: "صوت بودكاست", role: "تصميم صوتي ومكساج" };
        } else if (fallback.title === "Jawaker World Cup") {
            fallback = { ...fallback, title: "جواكر - كأس العالم", client: "جواكر", role: "بث صوتي مباشر داخل اللعبة" };
        } else if (fallback.title === "Sound Design for Films") {
            fallback = { ...fallback, title: "تصميم صوتي للأفلام", client: "أفلام مستقلة", role: "صوت" };
        }
    }

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
  const arTestimonials = [
  { quote: "استوديو مذهل! معتز عبقري في المكساج وتصميم الصوت. أنصح به بشدة لأي مشروع جاد.", name: "فنان محلي", role: "مراجعة خرائط جوجل" },
  { quote: "من أفضل المرافق الصوتية في عمان. احترافية عالية، بيئة مريحة، ومعدات عالمية.", name: "عميل استوديو", role: "مراجعة خرائط جوجل" },
  { quote: "تجربة رائعة في تسجيل أصواتنا هنا. المعالجة الصوتية ممتازة والمكساج النهائي كان نقياً جداً.", name: "عضو فرقة", role: "مراجعة خرائط جوجل" },
  { quote: "قام موج ببناء خط الإنتاج الصوتي لدينا من الصفر، وقدم توطيناً وموسيقى وتعليقاً صوتياً عبر عدة مناطق.", name: "جواكر", role: "لعبة الورق الرائدة في الشرق الأوسط" },
  { quote: "شريك حقيقي — إخراج صوتي وتصميم صوتي ومكساج عبر 80 حلقة. البرنامج يبدو بمستوى عالمي.", name: "صوت بودكاست", role: "يوم جديد" },
  { quote: "مجنون جداً!!!!!! واووو", name: "Madeon", role: "منتج مرشح للجرامي" },
];
  const combinedTestimonials = lang === "ar" ? arTestimonials : [...dbTestimonials, ...fallbackTestimonials.filter(f => !dbTestimonials.some(d => d.name === f.name))];

  const visibleTestis = showAllTestis ? combinedTestimonials : combinedTestimonials.slice(0, 3);

  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">{T[lang].works_eyebrow}</span>
          <h1>{T[lang].works_title}</h1>
          <p>{T[lang].works_desc}</p>
        </div>

        <div className="stats-grid" style={{ marginBottom: "3rem", maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          {stats.map(s => (
            <div className="stat-card" key={s.l}><h3>{s.n}</h3><p>{(T[lang] as any)[s.l] ?? s.l}</p></div>
          ))}
        </div>

        {/* Xetopia Spotlight */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "3rem", marginBottom: "4rem", position: "relative", overflow: "hidden", maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", opacity: 0.05, pointerEvents: "none" }}>
            <i className="bx bx-album" style={{ fontSize: "24rem" }}></i>
          </div>
          <span className="eyebrow" style={{ display: "block", marginBottom: "1rem", color: "var(--primary-glow)" }}>{T[lang].xetopia_eyebrow}</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Xetopia</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "800px", fontSize: "1.1rem" }}>
            {lang === "ar" ? (
              <><strong>Xetopia</strong> هو ألبوم موج القادم والعميق في موسيقى السينث بوب الإلكترونية. إنها رحلة صوتية تستكشف موضوعات عميقة: <em>'ساكن'</em> يغوص في ازدواجية الشخصية والصراع الداخلي، بينما <em>'رح تلحقني'</em> يعتبر أول إصدار إلكتروني عربي أصلي له، يطرح السؤال المخيف: <em>"هل ستمسك بي عندما أسقط في نهاية العالم؟"</em></>
            ) : (
              <><strong>Xetopia</strong> is Mouje's deeply personal upcoming Electronic Synthpop album. It's a sonic journey exploring profound themes: <em> 'Saken'</em> dives into the duality of character and inner conflict, while <em>'Rah Telhaqni'</em> serves as his first original Arabic electronic release, asking the haunting question: <em>"Will you catch me when I fall at the end of the world?"</em></>
            )}
          </p>
          <a href="https://open.spotify.com/artist/6xRx0cxS6FrZYDccwPQvbz" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem" }}>
            <i className="bx bxl-spotify" style={{ fontSize: "1.25rem" }}></i> {T[lang].xetopia_listen}
          </a>
        </div>


        <div className="works-filters">
          {getFilters(lang).map(f => (
            <button key={f.key} className={active === f.key ? "on" : ""} onClick={() => setActive(f.key)}>{f.label}</button>
          ))}
        </div>

        <div className="works-grid">
          {filtered.map((it: any, i) => (
              <div 
                className="work" 
                key={i} 
                onClick={() => {
                  if (it.link) window.open(it.link, "_blank");
                  else setSelectedWork(it);
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={it.img} alt={it.title} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                <div className="work-hover-indicator" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "1rem", borderRadius: "50%", opacity: 0, transition: "opacity 0.3s", zIndex: 10 }}>
                  <i className={it.link ? "bx bx-link-external" : "bx bx-expand-alt"} style={{ fontSize: "1.5rem" }}></i>
                </div>
                <span className="year" style={{ position: "absolute", top: "1rem", right: "1rem", padding: ".25rem .65rem", borderRadius: 999, background: "rgba(255,255,255,.1)", backdropFilter: "blur(10px)", fontSize: ".75rem", fontWeight: 600, zIndex: 2 }}>{it.year}</span>
              <div className="work-overlay">
                <h3>{it.title}</h3>
                <p>{it.client} · {it.role}</p>
                
              </div>
              </div>
            ))}
        </div>
      </section>

      {tracks.length > 0 && (
        <section>
          <div className="section-head">
            <span className="eyebrow">{T[lang].works_listen_eyebrow}</span>
            <h2>{T[lang].works_listen_title}</h2>
            <p>{T[lang].works_listen_desc}</p>
          </div>
          <TrackPlayer tracks={tracks} />
        </section>
      )}



      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].works_trusted_eyebrow}</span>
          <h2>{T[lang].works_trusted_title}</h2>
        </div>
        <div className="clients">
          {clientItems.map((c, i) => <div className="client-pill" key={c.name || i}>{c.name}</div>)}
        </div>
      </section>

      
      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].vault_eyebrow}</span>
          <h2>{T[lang].hidden_gems_pre} <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{T[lang].hidden_gems_accent}</span></h2>
          <p>{T[lang].hidden_gems_desc}</p>
        </div>
        <div className="works-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          
          <div className="work">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" alt="Early Days" loading="lazy" style={{ filter: "grayscale(80%) sepia(20%)" }} />
            <div className="work-overlay">
              <h3>{lang === "ar" ? "2016 عصر الدبستيب" : "2016 Dubstep Era"}</h3>
              <p>{lang === "ar" ? "البدايات الحقيقية. قطرات بيس ثقيلة، سينثات عنيفة، وإصدار 'Terror' الذي بدأ الرحلة الإلكترونية." : "The very beginnings. Heavy bass drops, aggressive synths, and the release of 'Terror' that started the electronic journey."}</p>
            </div>
          </div>

          <div className="work">
            <img src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80" alt="First Studio" loading="lazy" style={{ filter: "grayscale(50%)" }} />
            <div className="work-overlay">
              <h3>{lang === "ar" ? "الاستوديو الأول" : "The First Setup"}</h3>
              <p>{lang === "ar" ? "قبل منصات HDX والصوتيات النقية. شهادة على حقيقة أن المعدات لا تصنع المهندس؛ بل الأذن هي من تفعل." : "Before the HDX rigs and pristine acoustics. A testament to the fact that gear doesn't make the engineer; the ear does."}</p>
            </div>
          </div>
          
          <div className="work">
            <img src="https://images.unsplash.com/photo-1621360841013-c76831f13b63?w=800&q=80" alt="Local Gigs" loading="lazy" style={{ filter: "grayscale(30%)" }} />
            <div className="work-overlay">
              <h3>{lang === "ar" ? "حفلات الأندرجراوند" : "Underground Sessions"}</h3>
              <p>{lang === "ar" ? "مكساج وتسجيل للفرق المحلية في عمان. الطاقة الخام وغير المفلترة لمشهد الموسيقى الأردنية." : "Mixing and recording local bands in Amman. The raw, unfiltered energy of the Jordanian music scene."}</p>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].testimonials_eyebrow}</span>
          <h2>{T[lang].testimonials_title}</h2>
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
              {showAllTestis ? T[lang].works_testimonials_show_less : T[lang].works_testimonials_show_more}
            </button>
          </div>
        )}
      </section>
    
      {selectedWork && (
        <div className="modal-backdrop" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setSelectedWork(null)}>
          <div className="modal-content bento" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "2rem", maxWidth: "500px", width: "100%", position: "relative" }} onClick={e => e.stopPropagation()}>
            <button style={{ position: "absolute", top: "1rem", right: "1rem", background: "transparent", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }} onClick={() => setSelectedWork(null)}><i className="bx bx-x"></i></button>
            <span className="eyebrow" style={{ color: "var(--primary-glow)", marginBottom: "0.5rem", display: "block" }}>{selectedWork.client}</span>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{selectedWork.title}</h2>
            <p style={{ opacity: 0.7, marginBottom: "1.5rem" }}>{selectedWork.role} • {selectedWork.year}</p>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "0.5rem", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
              <i className="bx bx-time-five" style={{ fontSize: "2rem", color: "var(--primary-glow)", marginBottom: "0.5rem" }}></i>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>{lang === "ar" ? "تفاصيل المشروع والوسائط ستتوفر قريباً." : "Project details and media coming soon."}</p>
            </div>
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: "1rem" }} onClick={() => setSelectedWork(null)}>
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
