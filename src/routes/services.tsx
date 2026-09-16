import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCms, s as t } from "@/lib/useCms";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";

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

const fallbackServices = [
  { slug: "film-scoring", icon: "bx-movie-play", title: "Film Scoring", text: "Original orchestral and hybrid scores tailored to picture, capturing the emotional core of every scene.", features: ["Orchestral & hybrid scoring", "Live string sessions", "Stems for re-recording", "Cue sheets included"], wide: true },
  { slug: "recording", icon: "bx-microphone", title: "Recording", text: "Pristine multitrack recording for bands, vocalists, voice talent and full ensembles.", features: ["Treated live room", "Vintage & modern mic locker", "Up to 32 tracks", "Pro Tools HDX"] },
  { slug: "audio-post-production", icon: "bx-film", title: "Audio Post Production", text: "End-to-end post for film, TV and online — dialogue editing, sound design, mix and final delivery.", features: ["Dialogue edit & clean-up", "5.1 / 7.1 mixing", "M&E stems", "Broadcast delivery"] },
  { slug: "adr-and-dubbing", icon: "bx-conversation", title: "ADR & Dubbing", text: "Multilingual ADR and dubbing with experienced direction and broadcast-ready masters.", features: ["AR / EN / FR direction", "Lip-sync editing", "Voice casting", "Final M&E mix"] },
  { slug: "mixing-and-mastering", icon: "bx-equalizer", title: "Mixing & Mastering", text: "Hybrid analog/digital mixing and mastering that translates across every speaker and platform.", features: ["Hybrid analog summing", "Stem mastering", "Streaming-loudness ready", "Vinyl / CD masters"], wide: true },
  { slug: "foley-recording", icon: "bx-walking", title: "Foley Recording", text: "Custom foley performed and recorded in-house — footsteps, props and cloth — for real texture.", features: ["Dedicated foley pit", "Hundreds of surfaces & props", "Sync-to-picture", "Stems delivered"] },
  { slug: "sound-design", icon: "bx-pulse", title: "Sound Design", text: "Bespoke sonic worlds for film, games, trailers and brands, built from field recordings and synthesis.", features: ["Trailer & cinematic SFX", "Game UI & weapon SFX", "Custom field recording", "Wwise / FMOD-ready"] },
  { slug: "workshops-and-consultation", icon: "bx-chalkboard", title: "Workshops & Consultation", text: "Private tutoring and extensive consultation for aspiring audio engineers and music producers.", features: ["DAW Workflow (FL Studio/Reaper)", "Mixing & Mastering Secrets", "Game Audio (Wwise)", "1-on-1 Mentorship"] },
  { slug: "audio-branding", icon: "bx-broadcast", title: "Audio Branding", text: "Sonic logos, brand themes and audio identity systems that make your brand instantly recognizable.", features: ["Sonic logo & mnemonic", "Brand theme variations", "Touchpoint adaptations", "Usage guidelines"] },
];

const getProcessSteps = (lang: "en" | "ar") => [
  { n: "01", title: T[lang].process_1_title, text: T[lang].process_1_text },
  { n: "02", title: T[lang].process_2_title, text: T[lang].process_2_text },
  { n: "03", title: T[lang].process_3_title, text: T[lang].process_3_text },
  { n: "04", title: T[lang].process_4_title, text: T[lang].process_4_text },
  { n: "05", title: T[lang].process_5_title, text: T[lang].process_5_text },
];

const gear = [
  { group: "DAWs", items: ["FL Studio", "Reaper", "Bitwig", "Ableton Live", "Pro Tools"] },
  { group: "Middleware", items: ["Wwise (Certified)", "FMOD", "Unity Audio", "Unreal Audio"] },
  { group: "Plugins", items: ["iZotope RX 11", "FabFilter", "Waves", "Universal Audio", "Kilohearts", "MeldaProduction", "Valhalla", "Analog Obsession"] },
  { group: "Softsynths", items: ["Serum 2", "Vital", "Phaseplant", "Native Instruments", "Analog Lab", "Harmor"] },
  { group: "Live & Routing", items: ["Ableton Live (launchpad)", "Voicemeeter Banana", "Mixx", "Azuracast", "Muse Sessions"] },
];

const getFaqs = (lang: "en" | "ar") => [
  { q: T[lang].faq_q1, a: T[lang].faq_a1 },
  { q: T[lang].faq_q2, a: T[lang].faq_a2 },
  { q: T[lang].faq_q3, a: T[lang].faq_a3 },
  { q: T[lang].faq_q4, a: T[lang].faq_a4 },
];

function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { content, services: dbServices } = useCms();
  const { lang } = useI18n();
  const faqs = getFaqs(lang);
  const services = dbServices.length
    ? dbServices.map(sv => ({ slug: sv.slug, icon: sv.icon || "bx-pulse", title: sv.title, text: sv.description || "", features: sv.features ?? [], wide: sv.wide }))
    : fallbackServices.map(s => {
        const tKeyTitle = `svc_${s.slug.replace(/-/g, "_")}_title` as keyof typeof T["en"];
        const tKeyText = `svc_${s.slug.replace(/-/g, "_")}_text` as keyof typeof T["en"];
        return {
          ...s,
          title: (T as any)[lang][tKeyTitle] || s.title,
          text: (T as any)[lang][tKeyText] || s.text
        };
      });
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, []);

  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">{T[lang].services_page_eyebrow}</span>
          <h1>{T[lang].services_page_title}</h1>
          <p>{T[lang].services_page_desc}</p>
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
          <span className="eyebrow">{T[lang].process_eyebrow}</span>
          <h2>{T[lang].process_title}</h2>
          <p>{T[lang].process_desc}</p>
        </div>
        <div className="process">
          {getProcessSteps(lang).map(p => (
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
          <span className="eyebrow">{T[lang].gear_eyebrow}</span>
          <h2>{T[lang].gear_title}</h2>
          <p>{T[lang].gear_desc}</p>
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
          <span className="eyebrow">{T[lang].faq_eyebrow}</span>
          <h2>{T[lang].faq_title}</h2>
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
          <h2>{T[lang].services_cta_title}</h2>
          <p>{T[lang].services_cta_desc}</p>
          <Link to="/contact" className="btn">{T[lang].services_cta_btn} <i className="bx bx-right-arrow-alt"></i></Link>
        </div>
      </section>
    </main>
  );
}
