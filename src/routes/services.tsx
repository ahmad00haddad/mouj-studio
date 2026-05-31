import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Mouje Studio" },
      { name: "description", content: "Film scoring, recording, mixing & mastering, ADR, foley, sound design and audio branding from Mouje Studio." },
      { property: "og:title", content: "Services — Mouje Studio" },
      { property: "og:description", content: "A complete sonic toolkit under one roof." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { slug: "film-scoring", icon: "bx-movie-play", title: "Film Scoring", text: "Original orchestral and hybrid scores tailored to picture, capturing the emotional core of every scene.", features: ["Orchestral & hybrid scoring", "Live string sessions", "Stems for re-recording", "Cue sheets included"], wide: true },
  { slug: "recording", icon: "bx-microphone", title: "Recording", text: "Pristine multitrack recording for bands, vocalists, voice talent and full ensembles.", features: ["Treated live room", "Vintage & modern mic locker", "Up to 32 tracks", "Pro Tools HDX"] },
  { slug: "audio-post-production", icon: "bx-film", title: "Audio Post Production", text: "End-to-end post for film, TV and online — dialogue editing, sound design, mix and final delivery.", features: ["Dialogue edit & clean-up", "5.1 / 7.1 mixing", "M&E stems", "Broadcast delivery"] },
  { slug: "adr-and-dubbing", icon: "bx-conversation", title: "ADR & Dubbing", text: "Multilingual ADR and dubbing with experienced direction and broadcast-ready masters.", features: ["AR / EN / FR direction", "Lip-sync editing", "Voice casting", "Final M&E mix"] },
  { slug: "mixing-and-mastering", icon: "bx-equalizer", title: "Mixing & Mastering", text: "Hybrid analog/digital mixing and mastering that translates across every speaker and platform.", features: ["Hybrid analog summing", "Stem mastering", "Streaming-loudness ready", "Vinyl / CD masters"], wide: true },
  { slug: "foley-recording", icon: "bx-walking", title: "Foley Recording", text: "Custom foley performed and recorded in-house — footsteps, props and cloth — for real texture.", features: ["Dedicated foley pit", "Hundreds of surfaces & props", "Sync-to-picture", "Stems delivered"] },
  { slug: "sound-design", icon: "bx-pulse", title: "Sound Design", text: "Bespoke sonic worlds for film, games, trailers and brands, built from field recordings and synthesis.", features: ["Trailer & cinematic SFX", "Game UI & weapon SFX", "Custom field recording", "Wwise / FMOD-ready"] },
  { slug: "audio-branding", icon: "bx-broadcast", title: "Audio Branding", text: "Sonic logos, brand themes and audio identity systems that make your brand instantly recognizable.", features: ["Sonic logo & mnemonic", "Brand theme variations", "Touchpoint adaptations", "Usage guidelines"] },
];

const processSteps = [
  { n: "01", title: "Discovery", text: "We listen first — brief, audience and the emotion you want to evoke." },
  { n: "02", title: "Pre-production", text: "Mood boards, references and a clear creative direction." },
  { n: "03", title: "Production", text: "Recording, scoring and design with award-winning engineers." },
  { n: "04", title: "Mix & Master", text: "Hybrid analog/digital mixing, broadcast-spec mastered." },
  { n: "05", title: "Delivery", text: "Every stem, format and spec you need — on time and on brief." },
];

const gear = [
  { group: "DAWs", items: ["Pro Tools HDX", "Logic Pro", "Cubase 13", "Reaper"] },
  { group: "Monitoring", items: ["Genelec 8351", "Yamaha NS-10M", "Avantone MixCubes"] },
  { group: "Mics", items: ["Neumann U87", "Sony C-800G", "AKG C414", "Shure SM7B"] },
  { group: "Outboard", items: ["Neve 1073", "API 2500", "Tube-Tech CL1B", "Bricasti M7"] },
];

const faqs = [
  { q: "How long does a typical project take?", a: "A 30-second ad usually wraps in 3-5 days. A short film score takes 2-4 weeks. We always agree on a milestone schedule up front." },
  { q: "Do you work remotely with clients abroad?", a: "Yes. We deliver via Source-Connect, Audiomovers and shared sessions, with daily review links and revision rounds built into every quote." },
  { q: "Can you license existing music too?", a: "Absolutely — our music supervision team handles licensing, clearance and original commissions across local and international catalogs." },
  { q: "What deliverables do we receive?", a: "Final mix, stems, M&E, broadcast-spec masters and a documented session archive — everything you need to re-version later." },
];

function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, []);

  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">Services</span>
          <h1>What <span className="accent">we do</span></h1>
          <p>From the first note to the final master — a complete sonic toolkit under one roof.</p>
        </div>
        <div className="services-bento">
          {services.map(s => (
            <article key={s.slug} id={s.slug} className={`svc ${s.wide ? "wide feat" : ""}`}>
              <div className="svc-ico"><i className={`bx ${s.icon}`}></i></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="svc-features">
                {s.features.map(f => <li key={f}><i className="bx bx-check"></i>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Process</span>
          <h2>How we <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>work</span></h2>
          <p>A clear, collaborative path from idea to final master.</p>
        </div>
        <div className="process">
          {processSteps.map(p => (
            <div className="process-step" key={p.n}>
              <div className="n">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">Studio</span>
          <h2>Hand-picked <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>gear</span></h2>
          <p>A curated locker of analog warmth and digital precision.</p>
        </div>
        <div className="gear">
          {gear.map(g => (
            <div className="gear-card" key={g.group}>
              <h4>{g.group}</h4>
              <ul>{g.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>questions</span></h2>
        </div>
        <div className="faq">
          {faqs.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                <i className={`bx ${openFaq === i ? "bx-minus" : "bx-plus"}`}></i>
              </button>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="cta-block">
          <h2>Ready to make some <span className="accent">noise</span>?</h2>
          <p>Tell us about your project — we'll come back within 24 hours with a creative plan.</p>
          <Link to="/contact" className="btn">Start a project <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
