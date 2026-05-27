import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Mouje Studio - about" },
      { name: "description", content: "About Mouje Studio." },
      { property: "og:title", content: "Mouje Studio - about" },
    ],
    links: [{ rel: "stylesheet", href: "/css/works.css" }],
  }),
  component: AboutPage,
});

const slides = [
  { id: 1, sub: "About Mouje Studio", big: "About", flex: "flex--pikachu", text: "Mouje Studio is a premier creative hub specializing in audio works. Our mission is to deliver world-class sound experiences through our extensive range of services. With state-of-the-art facilities and a team of skilled audio engineers and creatives, we ensure every project achieves pristine quality and professionalism. We are dedicated to pushing the boundaries of audio production, from music to film, ensuring each sound resonates with perfection." },
  { id: 2, sub: "Our Philosophy", big: "Philosophy", flex: "flex--piplup", text: "We are committed to maintaining the highest industry standards, ensuring that every project we undertake meets our rigorous quality benchmarks. Our passion for sound drives us to continually explore new techniques and technologies, keeping us at the forefront of the audio production landscape." },
  { id: 3, sub: "Why Choose Us?", big: "Why Us", flex: "flex--blaziken", textHtml: "Expertise: With a diverse team of professionals, we bring a wealth of experience to every project. <br>Quality: We are dedicated to delivering top-notch audio that meets international standards. <br>Creativity: Our innovative approach allows us to craft unique soundscapes that resonate with audiences. <br>Client-Centric: We prioritize your vision and work closely with you to achieve your goals." },
  { id: 4, sub: "Join Us", big: "Join", flex: "flex--dialga", text: "At Mouje Studio, we invite you to embark on a creative journey with us. Let's transform your ideas into sound that captivates and inspires. Whether you have a specific project in mind or need guidance on how to elevate your audio, our team is ready to collaborate and bring your vision to life." },
  { id: 5, sub: "Our Goals", big: "Goals", flex: "flex--zekrom", text: "At Mouje Studio, our primary goal is to deliver high-quality audio services that exceed our clients' expectations. We strive for continuous innovation by exploring new techniques and adopting advanced tools to enhance our productions. Building long-term relationships based on trust and collaboration is essential to our mission, as we believe that success is best achieved together." },
];

function AboutPage() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a % slides.length) + 1);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div className="slider__warpper">
        {slides.map((s) => (
          <div
            key={s.id}
            className={`flex__container ${s.flex} ${active === s.id ? "flex--active" : "animate--start"}`}
            data-slide={s.id}
          >
            <div className="flex__item flex__item--left">
              <div className="flex__content">
                <p className="text--sub">{s.sub}</p>
                <h1 className="text--big">{s.big}</h1>
                {s.textHtml ? (
                  <p className="text--normal" dangerouslySetInnerHTML={{ __html: s.textHtml }} />
                ) : (
                  <p className="text--normal">{s.text}</p>
                )}
              </div>
              <p className="text__background">{s.big}</p>
            </div>
            <div className="flex__item flex__item--right"></div>
          </div>
        ))}
      </div>

      <div className="slider__navi">
        {slides.map((s) => (
          <div className="d-flex" key={s.id}>
            <h4 className="label-Slider" style={s.id === 1 ? { color: "white" } : undefined}>{s.big}</h4>
            <a
              href="#"
              className={`slide-nav ${active === s.id ? "active" : ""}`}
              data-slide={s.id}
              onClick={(e) => { e.preventDefault(); setActive(s.id); }}
            >
              {s.big}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
