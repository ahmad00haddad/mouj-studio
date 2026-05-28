import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

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
  { slug: "film-scoring", icon: "bx-movie-play", title: "Film Scoring", text: "Original orchestral and hybrid scores tailored to picture, capturing the emotional core of every scene." },
  { slug: "recording", icon: "bx-microphone", title: "Recording", text: "Pristine multitrack recording for bands, vocalists, voice talent, and full ensembles in a treated live room." },
  { slug: "audio-post-production", icon: "bx-film", title: "Audio Post Production", text: "End-to-end post for film, TV and online — dialogue editing, sound design, mix, and final delivery." },
  { slug: "adr-and-dubbing", icon: "bx-conversation", title: "ADR & Dubbing", text: "Multilingual ADR and dubbing with experienced direction, lip-sync precision, and broadcast-ready masters." },
  { slug: "mixing-and-mastering", icon: "bx-equalizer", title: "Mixing & Mastering", text: "Hybrid analog/digital mixing and mastering that translates across every speaker, platform, and format." },
  { slug: "foley-recording", icon: "bx-walking", title: "Foley Recording", text: "Custom foley performed and recorded in-house — footsteps, props, cloth — to give your picture real texture." },
  { slug: "sound-design", icon: "bx-pulse", title: "Sound Design", text: "Bespoke sonic worlds for film, games, trailers and brands, built from field recordings and synthesis." },
  { slug: "audio-branding", icon: "bx-broadcast", title: "Audio Branding", text: "Sonic logos, brand themes, and audio identity systems that make your brand instantly recognizable." },
];

function ServicesPage() {
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
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
          </article>
        ))}
      </div>
    </section>
  );
}