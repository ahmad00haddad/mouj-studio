import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mouje Studio" },
      { name: "description", content: "A leading studio delivering world-class audio solutions with a team of expert engineers and state-of-the-art facilities, ensuring exceptional sound quality for every project." },
      { property: "og:title", content: "Mouje Studio" },
      { property: "og:description", content: "A leading studio delivering world-class audio solutions with a team of expert engineers and state-of-the-art facilities, ensuring exceptional sound quality for every project." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
    <section className="home" id="home">
      <div className="home-content">
        <h1>Hi, It's <span>Mouje</span>Studio</h1>

        <div className="content text-animation">
          <div className="content__container">
            <h3 className="content__container__text">We Are</h3>
            <ul className="content__container__list">
              <li className="content__container__list__item">The Place For You</li>
              <li className="content__container__list__item">Household For Audio Works</li>
              <li className="content__container__list__item">Your Favorite Recording Studio</li>
              <li className="content__container__list__item">Your Perfect Sound</li>
            </ul>
          </div>
        </div>

        <p>
          We are a leading studio delivering world-class audio solutions with a team of expert engineers and state-of-the-art facilities, ensuring exceptional sound quality for every project.
        </p>

        <div className="social-icons">
          <a href="#"><i className="bx bxl-facebook"></i></a>
          <a href="https://www.instagram.com/moujestudio/"><i className="bx bxl-instagram-alt"></i></a>
          <a href="#"><i className="bx bxl-twitter"></i></a>
          <a href="https://www.linkedin.com/company/moujestudio/"><i className="bx bxl-linkedin"></i></a>
        </div>

        <div className="btn-group">
          <Link to="/about" className="btn">About</Link>
          <Link to="/contact" className="btn">contact</Link>
        </div>
      </div>
      <div className="home-img blur-border">
        <img src="/assets/img/home-img.webp" alt="home-img" />
      </div>
    </section>

    <section className="stats-section">
      <div className="stat"><h2>10+</h2><p>Years of Experience</p></div>
      <div className="stat"><h2>250+</h2><p>Projects Delivered</p></div>
      <div className="stat"><h2>80+</h2><p>Happy Clients</p></div>
      <div className="stat"><h2>15</h2><p>Awards & Nominations</p></div>
    </section>

    <section className="home-services">
      <div className="home-services__header">
        <h2>What <span>We Do</span></h2>
        <p>A complete sonic toolkit — from the first note to the final master.</p>
      </div>
      <div className="home-services__grid">
        {[
          { icon: "bx-movie-play", title: "Film Scoring" },
          { icon: "bx-microphone", title: "Recording" },
          { icon: "bx-film", title: "Audio Post Production" },
          { icon: "bx-conversation", title: "ADR & Dubbing" },
          { icon: "bx-equalizer", title: "Mixing & Mastering" },
          { icon: "bx-walking", title: "Foley Recording" },
          { icon: "bx-pulse", title: "Sound Design" },
          { icon: "bx-broadcast", title: "Audio Branding" },
        ].map((s) => (
          <Link key={s.title} to="/services" className="home-service-card">
            <i className={`bx ${s.icon}`}></i>
            <h3>{s.title}</h3>
          </Link>
        ))}
      </div>
      <div className="home-services__cta">
        <Link to="/services" className="btn">Explore All Services</Link>
      </div>
    </section>

    <section className="home-cta">
      <h2>Have a project in mind?</h2>
      <p>Let's craft sound that moves people. Get in touch and let's make it happen.</p>
      <Link to="/contact" className="btn">Start a Project</Link>
    </section>
    </>
  );
}
