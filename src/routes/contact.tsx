import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Mouje Studio - contact" },
      { name: "description", content: "Get in touch with Mouje Studio." },
      { property: "og:title", content: "Mouje Studio - contact" },
    ],
    links: [{ rel: "stylesheet", href: "/css/contact.css" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [warn, setWarn] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSend() {
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const message = (document.getElementById("message") as HTMLTextAreaElement).value.trim();
    if (!name || !email || !message) { setWarn("All fields are required."); setSuccess(false); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setWarn("Please enter a valid email address."); setSuccess(false); return; }
    try {
      const fd = new FormData();
      fd.append("name", name); fd.append("email", email); fd.append("message", message);
      const res = await fetch("/api/public/send-email", { method: "POST", body: fd });
      const txt = (await res.text()).trim();
      if (txt === "success") {
        setSuccess(true); setWarn("");
        (document.getElementById("contactForm") as HTMLFormElement).reset();
      } else {
        setWarn("There was a problem with your form. Please try again later."); setSuccess(false);
      }
    } catch {
      setWarn("There was a problem with your form. Please try again later."); setSuccess(false);
    }
  }

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h1>Get In <span>Touch</span></h1>
        <p><span>Address:</span> Amir Ben Malek St., Khalda 11953</p>
        <p><span>Email:</span> moujemusic@gmail.com</p>
        <p><span>Phone:</span> 0962796568891</p>
      </div>
      <div className="contact-wrap home-content w-100 p-md-5 p-4">
        <h1 className="mb-4">Contact us</h1>
        {warn && <div className="mb-4 message" style={{ color: "var(--color-text)" }}>{warn}</div>}
        {success && <div className="mb-4 message" style={{ color: "white" }}>Your message was sent, thank you!</div>}
        <form id="contactForm" noValidate onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" name="name" id="name" placeholder="Name" required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="email" className="form-control" name="email" id="email" placeholder="Email" required />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <textarea name="message" className="form-control" id="message" cols={30} rows={7} placeholder="Message" required></textarea>
              </div>
            </div>
          </div>
          <div className="form-group mt-4">
            <input type="button" value="Send Message" className="btn" onClick={handleSend} />
          </div>
        </form>
      </div>
    </section>
  );
}
