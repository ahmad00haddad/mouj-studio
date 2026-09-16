import { createFileRoute, Link } from "@tanstack/react-router";
import { useCms, s as t, list } from "@/lib/useCms";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mouje Studio" },
      { name: "description", content: "Mouje Studio is a creative audio house committed to world-class sound for film, brands and games." },
      { property: "og:title", content: "About — Mouje Studio" },
      { property: "og:description", content: "Our story, philosophy and what makes Mouje Studio different." },
    ],
  }),
  component: AboutPage,
});

const getPillars = (lang: "en" | "ar") => [
  { n: "01", title: (T as any)[lang].about_pillars_story_title, text: (T as any)[lang].about_pillars_story_text },
  { n: "02", title: (T as any)[lang].about_pillars_philosophy_title, text: (T as any)[lang].about_pillars_philosophy_text },
  { n: "03", title: (T as any)[lang].about_pillars_why_title, text: (T as any)[lang].about_pillars_why_text },
  { n: "04", title: (T as any)[lang].about_pillars_goals_title, text: (T as any)[lang].about_pillars_goals_text },
];

const getValues = (lang: "en" | "ar") => [
  { icon: "bx-target-lock", title: (T as any)[lang].value_craft_title, text: (T as any)[lang].value_craft_text },
  { icon: "bx-bulb", title: (T as any)[lang].value_creative_title, text: (T as any)[lang].value_creative_text },
  { icon: "bx-shield-quarter", title: (T as any)[lang].value_quality_title, text: (T as any)[lang].value_quality_text },
  { icon: "bx-group", title: (T as any)[lang].value_partner_title, text: (T as any)[lang].value_partner_text },
];

const fallbackFounderSkills = [
  "Sound Design (Games & Film)",
  "Middleware Implementation (Wwise)",
  "Music Production & Arrangement",
  "Orchestration & Composition",
  "Mixing & Mastering",
  "Live Audio Engineering",
  "Audio Branding",
  "Onset Boom & Recording",
];

const fallbackFounderExperience = [
  { role: "Founder / Audio Specialist", org: "Mouje Studio", period: "May 2021 — Present", text: "Managing production and post-production across in-house and commissioned projects, recording live sessions, live audio engineering, and providing consultation and Audio Production Workshops." },
  { role: "Full-time Sound Designer / Head of Audio", org: "Jawaker", period: "Jun 2021 — Jan 2024", text: "Built the audio engine and pipeline from the ground up for the leading card game in the Middle East. Led music production, VO recording and localization (IQ, EG, KSA) plus regular LiveOps content." },
  { role: "Keyboardist, Producer & Audio Engineer", org: "Ertidad", period: "2019 — 2022", text: "Arabic Rock with oriental scales and Arabic-identity lyrics. Fully produced, mixed and mastered the band's debut album and performed live as keyboardist." },
  { role: "Musician — MOUJE", org: "Solo Project", period: "2015 — Present", text: "Electronic Synthpop performed and written in Arabic. Currently producing the debut LP 'Xetopia'. Acapella covers endorsed by artists like Madeon." },
];

const founderProjects = [
  { title: "Jawaker's World Cup Radio", meta: "Live Broadcast in a Game · 2023", text: "Built the live broadcast system for the Qatar World Cup tournament — server configuration, live control setup, mic setup for commentators and real-time crowd effects. Peaked at 10k concurrent listeners, 150k+ total listenership and 100k+ USD in-app revenue across the campaign. Powered by Ableton Live for real-time crowd reactions, Voicemeeter Banana for routing, Mixxx for broadcast control, and AzuraCast for stream hosting." },
  { title: "Youm Jadeed", meta: "Kids Interactive Show · Sowt × Mouje · 2025", text: "An 80-episode show improving learning outcomes for the children of Palestine, executed by Sowt Podcasts in partnership with Mouje Studio, facilitated by LAPIS and funded by Education Above All. Voice direction, editing, sound design, mixing and mastering." },
  { title: "Watar Group (Watar El Sharq · Watar Pop)", meta: "Audio Director · 2025 — Present", text: "Audio direction for a Jordanian music band founded in 2021 — live sound from mic choice to mixing, technical planning per venue, and multitrack recording/mixing for digital releases." },
  { title: "Radio 6 — Live Sessions", meta: "Lead Recording & Mix Engineer · 2025", text: "Official recording and mixing engineer for Radio 6, tracking and mixing live performances for prominent Jordanian artists including Atef Malhas and Mieralle, as well as performing original solo sessions." },
  { title: "MOUJE — 'Xetopia' (LP)", meta: "Solo Album · In Production", text: "A deeply personal electronic synthpop album featuring singles like 'Saken' (exploring the duality of character) and 'Rah Telhaqni' (exploring companionship when the world ends). Entirely produced, mixed, and mastered in-house." },
];

const tools = ["iZotope RX 11", "FabFilter", "Kilohearts", "Muse Sessions", "Valhalla", "Native Instruments", "MeldaProduction", "Waves", "Universal Audio", "Analog Obsession", "FL Studio", "Reaper", "Bitwig", "Wwise", "Ableton Live"];

const clients = ["Netflix", "Mawdoo3", "Rush Production House", "Sowt", "Jawaker", "Education Above All", "LAPIS", "Watar Group", "Ertidad", "Radio 6", "Sixtreet Production"];

function AboutPage() {
  const { content } = useCms();
  const { lang } = useI18n();
  const founderSkills = list<string>(content, "about_founder", "skills", fallbackFounderSkills);
  const founderExperience = lang === "ar" ? [
  { role: "مؤسس / متخصص صوتيات", company: "ستوديو موج", years: "مايو 2021 — الآن", description: "إدارة الإنتاج وما بعد الإنتاج عبر المشاريع الداخلية والمكلفة، وتسجيل الجلسات المباشرة، وهندسة الصوت المباشرة، وتقديم الاستشارات وورش عمل الإنتاج الصوتي." },
  { role: "مصمم صوت رئيسي / مدير قسم الصوت", company: "جواكر", years: "يونيو 2021 — يناير 2024", description: "بناء محرك الصوت وسير العمل من الصفر للعبة الورق الرائدة في الشرق الأوسط. قيادة الإنتاج الموسيقي وتسجيل التعليق الصوتي وتوطين اللغات والمحتوى المباشر." },
  { role: "عازف كيبورد، منتج ومهندس صوت", company: "ارتداد", years: "2019 — 2022", description: "موسيقى روك عربية بمقامات شرقية وكلمات بهوية عربية. إنتاج ومكساج وماسترينج كامل للألبوم الأول للفرقة." },
  { role: "موسيقي — MOUJE", company: "مشروع منفرد", years: "2015 — الآن", description: "سينث بوب إلكتروني باللغة العربية. حالياً في مرحلة إنتاج الألبوم الأول Xetopia. أغاني الكوڤر الخاص به حظيت بإشادة من فنانين مثل Madeon." }
] : list<{ role: string; company: string; years: string; description: string }>( 
    content, "about_experience", "items",
    fallbackFounderExperience.map(e => ({ role: e.role, company: e.org, years: e.period, description: e.text })),
  );
  const founderName = t(content, "about_founder", "name", "Motaz Dababseh");
  const founderTitle = t(content, "about_founder", "title", "Senior Sound Designer & Audio Engineer · Founder of Mouje Studio");
  const founderBio = lang === "ar" ? "شغف وعمل مستمر في الموسيقى والصوت لأكثر من 13 عاماً. كفنان منفرد (موج)، يستكشف موسيقى السينث بوب الإلكترونية والروك، ويُنتج حالياً ألبومه Xetopia. كما يقود ستوديو موج لتقديم تصميم صوتي وهندسة وتلحين على مستوى عالمي، بما في ذلك 3 سنوات بدوام كامل في صناعة الألعاب." : t(content, "about_founder", "bio", "Passionately working with music and audio for 13+ years. As a Solo Artist (Mouje), exploring Electronic Synthpop, Pop and Rock, and currently producing the LP 'Xetopia'. Also leading Mouje Studio for world-class sound design, audio engineering, and music composition, including 3 years full-time in the gaming industry.");
  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">{T[lang].about_eyebrow}</span>
        </div>
        <div className="about-hero">
          <div>
            <h1>{T[lang].about_title}</h1>
            <p>{T[lang].about_desc}</p>
            <div className="hero-actions" style={{ marginTop: "1.75rem" }}>
              <Link to="/works" className="btn">{T[lang].about_btn_works}</Link>
              <Link to="/contact" className="btn btn-ghost">{T[lang].about_btn_contact}</Link>
            </div>
          </div>
          <div className="about-img">
            <img src={t(content, "about_intro", "image", "/assets/img/home-img.webp")} alt="Mouje Studio" />
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].pillars_eyebrow}</span>
          <h2>{T[lang].pillars_title}</h2>
        </div>
        <div className="pillars">
          {getPillars(lang).map(p => (
            <div className="pillar" key={p.n}>
              <div className="n">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="founder">
        <div className="section-head">
          <span className="eyebrow">{T[lang].founder_eyebrow}</span>
          <h2>{T[lang].founder_prefix} <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{founderName}</span></h2>
          <p>{founderTitle}</p>
        </div>
        <div className="pillars">
          <div className="pillar" style={{ gridColumn: "span 2" }}>
            <div className="n">01</div>
            <h3>{T[lang].founder_bio_label}</h3>
            <p>{founderBio}</p>
            <a href="/assets/mouje_cv.pdf" download="Motaz_Dababseh_CV.pdf" className="btn btn-ghost" style={{marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: ".5rem"}}>
              <i className="bx bx-download"></i> Download Full Resume
            </a>
          </div>
          <div className="pillar">
            <div className="n">02</div>
            <h3>{T[lang].founder_skills_label}</h3>
            <ul className="svc-features">
              {founderSkills.map(s => <li key={s}><i className="bx bx-check"></i>{s}</li>)}
            </ul>
          </div>
          <div className="pillar">
            <div className="n">03</div>
            <h3>{T[lang].founder_connect_label}</h3>
            <ul className="svc-features">
              <li><i className="bx bx-envelope"></i><a href={`mailto:${t(content, "contact_info", "email", "moujemusic@gmail.com")}`}>{t(content, "contact_info", "email", "moujemusic@gmail.com")}</a></li>
              <li><i className="bx bx-phone"></i><a href={`tel:${t(content, "contact_info", "phone", "+962 7 9656 8891").replace(/\s+/g, "")}`}>{t(content, "contact_info", "phone", "+962 7 9656 8891")}</a></li>
              <li><i className="bx bxl-instagram"></i><a href="https://instagram.com/moujemusic" target="_blank" rel="noreferrer">instagram.com/moujemusic</a></li>
              <li><i className="bx bxl-youtube"></i><a href="https://youtube.com/@moujemusic" target="_blank" rel="noreferrer">youtube.com/@moujemusic</a></li>
              <li><i className="bx bxl-spotify"></i><a href="https://open.spotify.com/artist/6xRx0cxS6FrZYDccwPQvbz" target="_blank" rel="noreferrer">spotify.com/Mouje</a></li>
              <li><i className="bx bxl-apple"></i><a href="https://tinyurl.com/25cjab2s" target="_blank" rel="noreferrer">Apple Music</a></li>
              <li><i className="bx bx-music"></i><a href="https://play.anghami.com/artist/4178162" target="_blank" rel="noreferrer">Anghami</a></li>
              <li><i className="bx bxl-tiktok"></i><a href="https://tiktok.com/@moujemusic" target="_blank" rel="noreferrer">tiktok.com/@moujemusic</a></li>
              <li><i className="bx bx-envelope"></i><a href="mailto:moujemusic@gmail.com">moujemusic@gmail.com</a></li>
              <li><i className="bx bx-phone"></i><a href="tel:+962796568891">+962 79 656 8891</a></li>
              <li><i className="bx bxl-behance"></i><a href="https://behance.net/motazdababseh" target="_blank" rel="noreferrer">Behance</a></li>
              <li><i className="bx bxl-twitch"></i><a href="https://www.twitch.tv/moujestream" target="_blank" rel="noreferrer">twitch.tv/moujestream</a></li>
              <li><i className="bx bx-map"></i><a href="https://maps.app.goo.gl/26VcJefWEGD3Uu9KA" target="_blank" rel="noreferrer">Mouje Studio on Maps</a></li>
              <li><i className="bx bx-coffee"></i><a href="https://www.buymeacoffee.com/mouje" target="_blank" rel="noreferrer">Buy me a Coffee</a></li>
              <li><i className="bx bxl-linkedin"></i><a href="https://linkedin.com/in/motazdababseh" target="_blank" rel="noreferrer">linkedin.com/in/motazdababseh</a></li>
              <li><i className="bx bxl-facebook"></i><a href="https://facebook.com/moujemusic" target="_blank" rel="noreferrer">facebook.com/moujemusic</a></li>
              <li><i className="bx bxl-soundcloud"></i><a href="https://soundcloud.com/moujemusic" target="_blank" rel="noreferrer">soundcloud.com/moujemusic</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].about_insights_eyebrow}</span>
          <h2>{T[lang].about_insights_title}</h2>
          <p>{T[lang].about_insights_desc}</p>
        </div>
        <div className="pillars">
          <div className="pillar">
            <div className="n"><i className="bx bxs-quote-right" style={{ fontSize: "1.5rem" }}></i></div>
            <h3 style={{ color: "var(--primary-glow)" }}>{T[lang].about_insights_bts_title}</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "800px", fontSize: "1.1rem" }}>{T[lang].bts_project_desc}</p>
            <a href="https://www.youtube.com/watch?v=ivWObD7kW_c" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem" }}>
              <i className="bx bxl-youtube" style={{ fontSize: "1.25rem" }}></i> {T[lang].bts_watch_btn}
            </a>
          </div>
        </div>
      </section>


      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].experience_eyebrow}</span>
          <h2>{T[lang].experience_title}</h2>
        </div>
        <div className="pillars">
          {founderExperience.map((e, i) => (
            <div className="pillar" key={`${e.role}-${i}`}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <h3>{e.role}</h3>
              <p style={{ color: "var(--primary-glow)", fontWeight: 600, marginBottom: ".25rem" }}>{e.company}</p>
              <p style={{ fontSize: ".85rem", marginBottom: ".75rem" }}>{e.years}</p>
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].projects_eyebrow}</span>
          <h2>{T[lang].projects_title}</h2>
        </div>
        <div className="services-bento">
          {(lang === "ar" ? [
  { title: "راديو كأس العالم في جواكر", meta: "بث مباشر داخل لعبة · 2023", text: "بناء نظام البث المباشر لبطولة كأس العالم في قطر داخل اللعبة — تكوين الخوادم وإعداد التحكم المباشر والميكروفونات للمعلقين ومؤثرات الجماهير الحية. تجاوز عدد المستمعين 150 ألفاً وحقق إيرادات تزيد عن 100 ألف دولار." },
  { title: "يوم جديد", meta: "برنامج تفاعلي للأطفال · صوت وموج · 2025", text: "برنامج من 80 حلقة لتحسين مخرجات التعلم لأطفال فلسطين، نفذته بودكاست صوت بالتعاون مع ستوديو موج، بتمويل من مؤسسة التعليم فوق الجميع. إخراج صوتي، تحرير، تصميم صوتي، مكساج وماسترينج." },
  { title: "مجموعة وتر (وتر الشرق · وتر بوب)", meta: "مدير صوت · 2025 — الآن", text: "الإدارة الصوتية لفرقة موسيقية أردنية تأسست عام 2021 — الصوت المباشر من اختيار الميكروفونات إلى المكساج، والتخطيط التقني لكل موقع، والتسجيل/المكساج متعدد المسارات للإصدارات الرقمية." },
  { title: "راديو 6 — جلسات حية", meta: "مهندس تسجيل ومكساج رئيسي · 2025", text: "المهندس الرسمي للتسجيل والمكساج لراديو 6، تتبع ومزج العروض الحية لفنانين أردنيين بارزين بالإضافة إلى أداء جلسات منفردة أصلية." },
  { title: "موج — Xetopia (ألبوم)", meta: "ألبوم منفرد · قيد الإنتاج", text: "ألبوم سينث بوب إلكتروني شخصي للغاية يضم أغاني مثل ساكن ورح تلحقني. تم إنتاجه ومكساجه وماسترينج بالكامل في الاستوديو." }
] : founderProjects).map(p => (
            <article className="svc wide feat" key={p.title}>
              <div className="svc-ico"><i className="bx bx-award"></i></div>
              <h3>{p.title}</h3>
              <p style={{ color: "var(--primary-glow)", fontWeight: 600, fontSize: ".85rem", marginBottom: ".5rem" }}>{p.meta}</p>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].toolbox_eyebrow}</span>
          <h2>{T[lang].toolbox_title}</h2>
        </div>
        <div className="clients">
          {tools.map(t => <div className="client-pill" key={t}>{t}</div>)}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].clients_eyebrow}</span>
          <h2>{T[lang].clients_title}</h2>
        </div>
        <div className="clients">
          {clients.map(c => <div className="client-pill" key={c}>{c}</div>)}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">{T[lang].values_eyebrow}</span>
          <h2>{T[lang].values_title}</h2>
        </div>
        <div className="services-bento">
          {getValues(lang).map(v => (
            <div className="svc" key={v.title}>
              <div className="svc-ico"><i className={`bx ${v.icon}`}></i></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="cta-block">
          <h2>{T[lang].about_cta_title}</h2>
          <p>{T[lang].about_cta_desc}</p>
          <Link to="/contact" className="btn">{T[lang].about_cta_btn} <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
