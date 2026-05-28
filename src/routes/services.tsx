import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Mouje Studio - Services" },
      { name: "description", content: "Professional audio services: Film Scoring, Recording, Mixing, Mastering, Foley, ADR, Sound Design, and Audio Branding." },
      { property: "og:title", content: "Mouje Studio - Services" },
      { property: "og:description", content: "Professional audio services from Mouje Studio." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { slug: "film-scoring", icon: "bx-movie-play", title: "Film Scoring", text: "Original orchestral and hybrid scores tailored to picture, capturing the emotional core of every scene.", features: ["Orchestral & hybrid scoring", "Live string sessions", "Stems for re-recording", "Cue sheets included"] },
  { slug: "recording", icon: "bx-microphone", title: "Recording", text: "Pristine multitrack recording for bands, vocalists, voice talent, and full ensembles in a treated live room.", features: ["Treated live room", "Vintage & modern mic locker", "Up to 32 tracks", "Pro Tools HDX"] },
  { slug: "audio-post-production", icon: "bx-film", title: "Audio Post Production", text: "End-to-end post for film, TV and online — dialogue editing, sound design, mix, and final delivery.", features: ["Dialogue edit & clean-up", "5.1 / 7.1 mixing", "M&E stems", "Broadcast delivery specs"] },
  { slug: "adr-and-dubbing", icon: "bx-conversation", title: "ADR & Dubbing", text: "Multilingual ADR and dubbing with experienced direction, lip-sync precision, and broadcast-ready masters.", features: ["AR / EN / FR direction", "Lip-sync editing", "Voice casting", "Final M&E mix"] },
  { slug: "mixing-and-mastering", icon: "bx-equalizer", title: "Mixing & Mastering", text: "Hybrid analog/digital mixing and mastering that translates across every speaker, platform, and format.", features: ["Hybrid analog summing", "Stem mastering", "Streaming-loudness ready", "Vinyl / CD masters"] },
  { slug: "foley-recording", icon: "bx-walking", title: "Foley Recording", text: "Custom foley performed and recorded in-house — footsteps, props, cloth — to give your picture real texture.", features: ["Dedicated foley pit", "Hundreds of surfaces & props", "Sync-to-picture", "Stems delivered"] },
  { slug: "sound-design", icon: "bx-pulse", title: "Sound Design", text: "Bespoke sonic worlds for film, games, trailers and brands, built from field recordings and synthesis.", features: ["Trailer & cinematic SFX", "Game UI & weapon SFX", "Custom field recording", "Wwise / FMOD-ready"] },
  { slug: "audio-branding", icon: "bx-broadcast", title: "Audio Branding", text: "Sonic logos, brand themes, and audio identity systems that make your brand instantly recognizable.", features: ["Sonic logo & mnemonic", "Brand theme variations", "Touchpoint adaptations", "Usage guidelines"] },
];

const process = [
  { n: "01", title: "Discovery", text: "We listen first — understand the brief, the audience, and the emotion you want to evoke." },
  { n: "02", title: "Pre-production", text: "Mood boards, references, tempo, and a clear creative direction before a single mic goes up." },
  { n: "03", title: "Production", text: "Recording, scoring, and sound design with award-winning engineers and session players." },
  { n: "04", title: "Mix & Master", text: "Hybrid analog/digital mixing, mastered to broadcast and streaming standards." },
  { n: "05", title: "Delivery", text: "Every stem, format, and spec you need — on time, on brief, on every speaker." },
];

const gear = [
  { group: "DAWs", items: ["Pro Tools HDX", "Logic Pro", "Cubase 13", "Reaper"] },
  { group: "Monitoring", items: ["Genelec 8351", "Yamaha NS-10M", "Avantone MixCubes"] },
  { group: "Mics", items: ["Neumann U87", "Sony C-800G", "AKG C414", "Shure SM7B"] },
  { group: "Outboard", items: ["Neve 1073 pre", "API 2500", "Tube-Tech CL1B", "Bricasti M7"] },
];

const faqs = [
  { q: "How long does a typical project take?", a: "A 30-second ad usually wraps in 3-5 days. A short film score takes 2-4 weeks. We always agree on a milestone schedule up front." },
  { q: "Do you work remotely with clients abroad?", a: "Yes. We deliver via Source-Connect, Audiomovers and shared sessions, with daily review links and revision rounds built into every quote." },
  { q: "Can you license existing music too?", a: "Absolutely — our music supervision team handles licensing, clearance and original commissions across local and international catalogs." },
  { q: "What deliverables do we receive?", a: "Final mix, stems, M&E, broadcast-spec masters, and a documented session archive — everything you need to re-version later." },
];

function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
    <>
    <section className="services-section">
      <div className="services-header">
        <h1>What <span>We Do</span></h1>
        <p>From the first note to the final master — a complete sonic toolkit under one roof.</p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <article key={s.slug} id={s.slug} className="service-card">
            <div className="service-icon"><i className={`bx ${s.icon}`}></i></div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul className="service-features">
              {s.features.map((f) => (<li key={f}><i className="bx bx-check"></i>{f}</li>))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="process-section">
      <div className="services-header">
        <h2>Our <span>Process</span></h2>
        <p>A clear, collaborative path from idea to final master.</p>
      </div>
      <div className="process-grid">
        {process.map((p) => (
          <div className="process-step" key={p.n}>
            <div className="process-step__n">{p.n}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="gear-section">
      <div className="services-header">
        <h2>Studio <span>Gear</span></h2>
        <p>A carefully curated locker of analog warmth and digital precision.</p>
      </div>
      <div className="gear-grid">
        {gear.map((g) => (
          <div className="gear-card" key={g.group}>
            <h4>{g.group}</h4>
            <ul>{g.items.map((i) => (<li key={i}>{i}</li>))}</ul>
          </div>
        ))}
      </div>
    </section>

    <section className="faq-section">
      <div className="services-header">
        <h2>Frequently asked <span>questions</span></h2>
        <p>Everything you need to know before starting a project with us.</p>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
            <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
              <span>{f.q}</span>
              <i className={`bx ${openFaq === i ? "bx-minus" : "bx-plus"}`}></i>
            </button>
            {openFaq === i && <div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>

    <section className="home-cta">
      <h2>Ready to make some <span>noise</span>?</h2>
      <p>Tell us about your project — we'll come back within 24 hours with a creative plan.</p>
      <Link to="/contact" className="btn">Start a Project</Link>
    </section>
    </>
  );
}