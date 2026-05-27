import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Instagram, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Mouje Studio — Contact" },
      { name: "description", content: "Get in touch with Mouje Studio for film scoring, recording, mixing, sound design and audio post." },
      { property: "og:title", content: "Mouje Studio — Contact" },
      { property: "og:description", content: "Get in touch with Mouje Studio." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 900);
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <Toaster theme="dark" position="top-center" richColors />
      <div className="text-center mb-16 fade-up">
        <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-4">Contact</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold">
          Get In <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mt-5 text-lg">
          Tell us about your project and we&apos;ll bring it to life.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Info card */}
        <div className="lg:col-span-2 p-10 rounded-3xl border border-border bg-card relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative space-y-8">
            <h2 className="font-display text-3xl font-bold">Get in touch</h2>
            {[
              { Icon: MapPin, label: "Address", value: "Amir Ben Malek St., Khalda 11953" },
              { Icon: Mail, label: "Email", value: "moujemusic@gmail.com" },
              { Icon: Phone, label: "Phone", value: "+962 796 568 891" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="uppercase tracking-widest text-xs text-muted-foreground">{label}</p>
                  <p className="font-medium mt-1">{value}</p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-border">
              <p className="uppercase text-xs tracking-widest text-muted-foreground mb-4">Follow</p>
              <div className="flex gap-3">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
                    aria-label="social"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="lg:col-span-3 p-10 rounded-3xl border border-border bg-card space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                placeholder="you@studio.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              About the project
            </label>
            <textarea
              id="message"
              rows={7}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all resize-none"
              placeholder="Tell me about the picture, the vibe, the deadline…"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:glow-primary transition-all disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Message"}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
