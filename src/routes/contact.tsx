import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCms, s as t } from "@/lib/useCms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mouje Studio" },
      { name: "description", content: "Get in touch with Mouje Studio to start your audio project." },
      { property: "og:title", content: "Contact — Mouje Studio" },
      { property: "og:description", content: "Tell us about your project — we'll reply within 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { content } = useCms();
  const [warn, setWarn] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWarn(""); setSuccess(false);
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) { setWarn("Please fill in name, email and message."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setWarn("Please enter a valid email address."); return; }
    setSending(true);
    try {
      const fd = new FormData();
      fd.append("name", name); fd.append("email", email); fd.append("message", `${form.subject ? "[" + form.subject + "] " : ""}${message}`);
      const res = await fetch("/api/public/send-email", { method: "POST", body: fd });
      const txt = (await res.text()).trim();
      if (txt === "success") { setSuccess(true); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setWarn("There was a problem sending your message. Please try again later.");
    } catch { setWarn("There was a problem sending your message. Please try again later."); }
    finally { setSending(false); }
  }

  return (
    <main>
      <section>
        <div className="page-head">
          <span className="eyebrow">{t(content, "contact_intro", "eyebrow", "Contact")}</span>
          <h1>{t(content, "contact_intro", "title", "Let's talk sound.")}</h1>
          <p>{t(content, "contact_intro", "description", "Tell us about your project — we'll come back within 24 hours.")}</p>
        </div>

        <div className="contact-wrap">
          <aside className="contact-info">
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: ".5rem" }}>Reach out</h2>
              <p>We work with clients worldwide — remote sessions, attended mixes and in-person tracking.</p>
            </div>
            <div className="contact-row">
              <i className="bx bx-map"></i>
              <div><strong>Studio</strong><span>{t(content, "contact_info", "address", "Amir Ben Malek St., Khalda 11953, Amman")}</span></div>
            </div>
            <div className="contact-row">
              <i className="bx bx-envelope"></i>
              <div><strong>Email</strong><span><a href={`mailto:${t(content, "contact_info", "email", "moujemusic@gmail.com")}`}>{t(content, "contact_info", "email", "moujemusic@gmail.com")}</a></span></div>
            </div>
            <div className="contact-row">
              <i className="bx bx-phone"></i>
              <div><strong>Phone</strong><span><a href={`tel:${t(content, "contact_info", "phone", "+962 7 9656 8891").replace(/\s+/g, "")}`}>{t(content, "contact_info", "phone", "+962 7 9656 8891")}</a></span></div>
            </div>
            <div className="contact-row">
              <i className="bx bx-time"></i>
              <div><strong>Hours</strong><span>{t(content, "contact_info", "hours", "Sun–Thu · 10:00 – 19:00 (GMT+3)")}</span></div>
            </div>
            <div className="footer-social" style={{ marginTop: "auto" }}>
              <a href={t(content, "site_social", "instagram", "https://www.instagram.com/moujestudio/")} aria-label="Instagram"><i className="bx bxl-instagram-alt"></i></a>
              <a href={t(content, "site_social", "linkedin", "https://www.linkedin.com/company/moujestudio/")} aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
              <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
            </div>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h2>Send a message</h2>
            {warn && <div className="alert alert-error">{warn}</div>}
            {success && <div className="alert alert-success">Your message was sent — thank you! We'll be in touch within 24 hours.</div>}

            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@studio.com" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Film score · 5 min · December delivery" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project, scope and timeline…" required />
            </div>
            <button type="submit" className="btn" disabled={sending}>
              {sending ? "Sending…" : "Send message"} <i className="bx bx-right-arrow-alt"></i>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
