import { createFileRoute, Link } from "@tanstack/react-router";
import { useCms, s as t, list } from "@/lib/useCms";

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

const pillars = [
  { n: "01", title: "Our Story", text: "Mouje Studio is a premier creative hub specializing in audio works — from music to film — built around state-of-the-art facilities and a team of skilled audio engineers and creatives." },
  { n: "02", title: "Philosophy", text: "We hold ourselves to the highest industry standards and stay obsessed with sound — continually exploring new techniques and technologies to push the craft forward." },
  { n: "03", title: "Why Us", text: "Expertise, quality, creativity and a client-centric approach. We work closely with you to translate vision into sound that resonates." },
  { n: "04", title: "Our Goals", text: "Deliver audio that exceeds expectations, innovate continuously, and build long-term relationships rooted in trust and collaboration." },
];

const values = [
  { icon: "bx-target-lock", title: "Craft over speed", text: "We optimize for the result, not the deadline — yet still ship on time." },
  { icon: "bx-bulb", title: "Creative first", text: "Sound serves story. Every decision starts from the creative brief." },
  { icon: "bx-shield-quarter", title: "Quality assured", text: "Hybrid analog/digital workflows, calibrated rooms and rigorous QC." },
  { icon: "bx-group", title: "True partnership", text: "Transparent communication, real revisions, no surprises." },
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
  { title: "Jawaker's World Cup Radio", meta: "Live Broadcast in a Game · 2023", text: "Built the live broadcast system for the Qatar World Cup tournament — server configuration, live control setup, mic setup for commentators and real-time crowd effects. Peaked at 10k concurrent listeners, 150k+ total listenership and 100k+ USD in-app revenue across the campaign." },
  { title: "Youm Jadeed", meta: "Kids Interactive Show · Sowt × Mouje · 2025", text: "An 80-episode show improving learning outcomes for the children of Palestine, executed by Sowt Podcasts in partnership with Mouje Studio, facilitated by LAPIS and funded by Education Above All. Voice direction, editing, sound design, mixing and mastering." },
  { title: "Watar Group (Watar El Sharq · Watar Pop)", meta: "Audio Director · 2025 — Present", text: "Audio direction for a Jordanian music band founded in 2021 — live sound from mic choice to mixing, technical planning per venue, and multitrack recording/mixing for digital releases." },
];

const tools = ["iZotope RX 11", "FabFilter", "Kilohearts", "Muse Sessions", "Valhalla", "Native Instruments", "MeldaProduction", "Waves", "Universal Audio", "Analog Obsession", "FL Studio", "Reaper", "Bitwig", "Wwise", "Ableton Live"];

const clients = ["Netflix", "Mawdoo3", "Rush Production House", "Sowt", "Jawaker", "Education Above All", "LAPIS", "Watar Group", "Ertidad"];

function AboutPage() {
  const { content } = useCms();
  const founderSkills = list<string>(content, "about_founder", "skills", fallbackFounderSkills);
  const founderExperience = list<{ role: string; company: string; years: string; description: string }>(
    content, "about_experience", "items",
    fallbackFounderExperience.map(e => ({ role: e.role, company: e.org, years: e.period, description: e.text })),
  );
  const founderName = t(content, "about_founder", "name", "Motaz Dababseh");
  const founderTitle = t(content, "about_founder", "title", "Senior Sound Designer & Audio Engineer · Founder of Mouje Studio");
  const founderBio = t(content, "about_founder", "bio", "Passionately working with music and audio for 13+ years — including 3 years full-time in the gaming industry leading sound design, audio engineering and music composition. A solid team player and communicator, focused on advancing interactive audio implementation for games while running Mouje Studio.");
  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">{t(content, "about_intro", "eyebrow", "About us")}</span>
        </div>
        <div className="about-hero">
          <div>
            <h1>{t(content, "about_intro", "title", "Crafting sound that tells your story.")}</h1>
            <p>{t(content, "about_intro", "description", "Mouje Studio is a creative audio house delivering scoring, recording, mixing, sound design and audio branding for film, brands and games — built on a decade of experience and a love for the craft.")}</p>
            <div className="hero-actions" style={{ marginTop: "1.75rem" }}>
              <Link to="/works" className="btn">See our works</Link>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
          </div>
          <div className="about-img">
            <img src={t(content, "about_intro", "image", "/assets/img/home-img.webp")} alt="Mouje Studio" />
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Pillars</span>
          <h2>What we <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>stand for</span></h2>
        </div>
        <div className="pillars">
          {pillars.map(p => (
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
          <span className="eyebrow">Founder</span>
          <h2>Meet <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{founderName}</span></h2>
          <p>{founderTitle}</p>
        </div>
        <div className="pillars">
          <div className="pillar" style={{ gridColumn: "span 2" }}>
            <div className="n">01</div>
            <h3>Bio</h3>
            <p>{founderBio}</p>
          </div>
          <div className="pillar">
            <div className="n">02</div>
            <h3>Skills</h3>
            <ul className="svc-features">
              {founderSkills.map(s => <li key={s}><i className="bx bx-check"></i>{s}</li>)}
            </ul>
          </div>
          <div className="pillar">
            <div className="n">03</div>
            <h3>Connect</h3>
            <ul className="svc-features">
              <li><i className="bx bx-envelope"></i><a href={`mailto:${t(content, "contact_info", "email", "moujemusic@gmail.com")}`}>{t(content, "contact_info", "email", "moujemusic@gmail.com")}</a></li>
              <li><i className="bx bx-phone"></i><a href={`tel:${t(content, "contact_info", "phone", "+962 7 9656 8891").replace(/\s+/g, "")}`}>{t(content, "contact_info", "phone", "+962 7 9656 8891")}</a></li>
              <li><i className="bx bxl-linkedin"></i><a href="https://linkedin.com/in/motazdababseh" target="_blank" rel="noreferrer">linkedin.com/in/motazdababseh</a></li>
              <li><i className="bx bxl-facebook"></i><a href="https://facebook.com/Motaz.D" target="_blank" rel="noreferrer">facebook.com/Motaz.D</a></li>
              <li><i className="bx bxl-soundcloud"></i><a href="https://soundcloud.com/motazdababseh" target="_blank" rel="noreferrer">soundcloud.com/motazdababseh</a></li>
              <li><i className="bx bxl-behance"></i><a href="https://behance.net/motazdababseh" target="_blank" rel="noreferrer">behance.net/motazdababseh</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Experience</span>
          <h2>A decade of <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sound work</span></h2>
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
          <span className="eyebrow">Highlighted projects</span>
          <h2>Selected <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>case studies</span></h2>
        </div>
        <div className="services-bento">
          {founderProjects.map(p => (
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
          <span className="eyebrow">Toolbox</span>
          <h2>Tools we <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>work with</span></h2>
        </div>
        <div className="clients">
          {tools.map(t => <div className="client-pill" key={t}>{t}</div>)}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Worked with</span>
          <h2>Trusted by <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>great teams</span></h2>
        </div>
        <div className="clients">
          {clients.map(c => <div className="client-pill" key={c}>{c}</div>)}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Values</span>
          <h2>How we <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>operate</span></h2>
        </div>
        <div className="services-bento">
          {values.map(v => (
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
          <h2>Let's build something <span className="accent">unforgettable</span>.</h2>
          <p>Whether you have a brief or just an idea, we'd love to hear it.</p>
          <Link to="/contact" className="btn">Start the conversation <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
