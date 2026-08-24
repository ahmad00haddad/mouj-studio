import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchAllWorks, fetchAllServices, fetchAllTestimonials, fetchSiteContent, fetchAllTracks,
  type Work, type Service, type Testimonial, type Track,
} from "@/lib/cms";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Mouje Studio" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const ADMIN_EMAIL = "admin@mouje.local";

function AdminPage() {
  const [session, setSession] = useState<{ user: { id: string; email?: string } } | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as never);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s as never));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) return <main style={{ padding: "8rem 2rem", textAlign: "center" }}>Loading…</main>;
  return (
    <main style={{ padding: "7rem 1.5rem 4rem", maxWidth: 1280, margin: "0 auto" }}>
      <Toaster theme="dark" position="top-right" richColors />
      {session ? <Dashboard onLogout={() => supabase.auth.signOut()} /> : <Login />}
    </main>
  );
}

function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setBusy(true);
    const email = username.includes("@") ? username : ADMIN_EMAIL;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr("Invalid username or password.");
  }

  return (
    <div style={{ maxWidth: 420, margin: "4rem auto", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "2.5rem" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: ".5rem" }}>Admin Login</h1>
      <p style={{ marginBottom: "1.5rem" }}>Sign in to manage the website.</p>
      <form onSubmit={submit} className="contact-form" style={{ background: "transparent", border: 0, padding: 0 }}>
        {err && <div className="alert alert-error">{err}</div>}
        <div className="field">
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} autoFocus />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
}

type Tab = "pages" | "works" | "tracks" | "services" | "testimonials" | "messages" | "content";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("pages");

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="eyebrow">Admin</span>
          <h1 style={{ fontSize: "2.25rem", marginTop: ".25rem" }}>Mouje Studio CMS</h1>
        </div>
        <button className="btn btn-ghost" onClick={onLogout}>Sign out</button>
      </header>

      <nav style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: ".75rem" }}>
        {(["pages","works","tracks","services","testimonials","messages","content"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: ".6rem 1.1rem", borderRadius: 999, fontWeight: 600, textTransform: "capitalize",
              background: tab === t ? "var(--gradient-primary)" : "var(--surface)",
              color: tab === t ? "white" : "var(--text-muted)",
              border: "1px solid var(--border)",
            }}>{t === "content" ? "Raw JSON" : t === "pages" ? "Pages & Sections" : t === "messages" ? "Inbox" : t}</button>
        ))}
      </nav>

      {tab === "pages" && <PagesAdmin />}
      {tab === "works" && <WorksAdmin />}
      {tab === "tracks" && <TracksAdmin />}
      {tab === "services" && <ServicesAdmin />}
      {tab === "testimonials" && <TestimonialsAdmin />}
      {tab === "messages" && <MessagesAdmin />}
      {tab === "content" && <ContentAdmin />}
    </div>
  );
}

type ContactMessage = {
  id: string; name: string; email: string; subject: string | null;
  message: string; handled: boolean; created_at: string;
};

function MessagesAdmin() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new">("all");

  const reload = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages" as never)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data ?? []) as unknown as ContactMessage[]);
    setLoading(false);
  };
  useEffect(() => { reload(); }, []);

  async function setHandled(id: string, handled: boolean) {
    const { error } = await supabase.from("contact_messages" as never).update({ handled } as never).eq("id", id);
    if (error) return toast.error(error.message);
    setItems(x => x.map(m => (m.id === id ? { ...m, handled } : m)));
  }
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages" as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    setItems(x => x.filter(m => m.id !== id));
    toast.success("Deleted");
  }

  const shown = filter === "new" ? items.filter(m => !m.handled) : items;
  const unread = items.filter(m => !m.handled).length;

  if (loading) return <p>Loading…</p>;
  return (
    <div>
      <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
        <strong>{items.length} messages</strong>
        <span style={{ color: "var(--text-muted)" }}>· {unread} unhandled</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: ".5rem" }}>
          {(["all", "new"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: ".4rem .9rem", borderRadius: 999, border: "1px solid var(--border)",
              background: filter === f ? "var(--gradient-primary)" : "transparent",
              color: filter === f ? "white" : "var(--text-muted)", fontWeight: 600,
            }}>{f === "all" ? "All" : "Unhandled"}</button>
          ))}
          <button className="btn btn-ghost" onClick={reload}>Refresh</button>
        </div>
      </div>

      {shown.length === 0 && <p style={{ color: "var(--text-muted)" }}>No messages yet.</p>}

      {shown.map(m => (
        <div key={m.id} style={{ ...cardStyle, opacity: m.handled ? 0.6 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: ".5rem" }}>
            <div>
              <strong>{m.name}</strong>{" "}
              <a href={`mailto:${m.email}`} style={{ color: "var(--accent, #7dd3a0)" }}>{m.email}</a>
              {m.subject && <div style={{ fontSize: ".85rem", color: "var(--text-muted)" }}>Subject: {m.subject}</div>}
            </div>
            <span style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>
              {new Date(m.created_at).toLocaleString()}
            </span>
          </div>
          <p style={{ whiteSpace: "pre-wrap", margin: "0 0 .85rem" }}>{m.message}</p>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <button className="btn btn-ghost" onClick={() => setHandled(m.id, !m.handled)}>
              {m.handled ? "Mark unhandled" : "Mark handled"}
            </button>
            <a className="btn btn-ghost" href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "Your message to Mouje Studio"))}`}>Reply</a>
            <button className="btn btn-ghost" onClick={() => remove(m.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}


// ===== shared styles =====
const cardStyle: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem", marginBottom: "1rem" };
const inputStyle: React.CSSProperties = { width: "100%", padding: ".65rem .85rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-2)", color: "var(--text)", fontFamily: "inherit", fontSize: ".9rem" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: ".75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--text-muted)", marginBottom: ".35rem" };
const rowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: ".75rem" };

// ===== WORKS =====
function WorksAdmin() {
  const [items, setItems] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => { setLoading(true); try { setItems(await fetchAllWorks()); } finally { setLoading(false); } };
  useEffect(() => { reload(); }, []);

  const blank: Partial<Work> = { title: "", client: "", role: "", year: "", image_url: "", tags: [], sort_order: (items.at(-1)?.sort_order ?? 0) + 10, published: true };

  async function save(w: Partial<Work>) {
    const payload = { ...w, tags: w.tags ?? [] } as never;
    const { error } = w.id
      ? await supabase.from("works" as never).update(payload).eq("id", w.id)
      : await supabase.from("works" as never).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); reload();
  }
  async function remove(id: string) {
    if (!confirm("Delete this work?")) return;
    const { error } = await supabase.from("works" as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); reload();
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Add new work</h2>
      <WorkForm key="new" initial={blank} onSubmit={save} submitLabel="Add work" />
      <h2 style={{ margin: "2rem 0 1rem" }}>All works ({items.length})</h2>
      {loading ? <p>Loading…</p> : items.map(w => (
        <WorkForm key={w.id} initial={w} onSubmit={save} onDelete={() => remove(w.id)} submitLabel="Save" />
      ))}
    </div>
  );
}

function WorkForm({ initial, onSubmit, onDelete, submitLabel }: { initial: Partial<Work>; onSubmit: (w: Partial<Work>) => void; onDelete?: () => void; submitLabel: string }) {
  const [w, setW] = useState<Partial<Work>>(initial);
  return (
    <div style={cardStyle}>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Title</label><input style={inputStyle} value={w.title ?? ""} onChange={e => setW({ ...w, title: e.target.value })} /></div>
        <div><label style={labelStyle}>Client</label><input style={inputStyle} value={w.client ?? ""} onChange={e => setW({ ...w, client: e.target.value })} /></div>
      </div>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Role</label><input style={inputStyle} value={w.role ?? ""} onChange={e => setW({ ...w, role: e.target.value })} /></div>
        <div><label style={labelStyle}>Year</label><input style={inputStyle} value={w.year ?? ""} onChange={e => setW({ ...w, year: e.target.value })} /></div>
      </div>
      <ImagePicker label="Image" value={w.image_url ?? ""} onChange={(url) => setW({ ...w, image_url: url })} />
      <div style={rowStyle}>
        <div><label style={labelStyle}>Tags (comma-separated)</label><input style={inputStyle} value={(w.tags ?? []).join(", ")} onChange={e => setW({ ...w, tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} placeholder="featured, ads, film, games, podcast, post, music" /></div>
        <div><label style={labelStyle}>Sort order</label><input type="number" style={inputStyle} value={w.sort_order ?? 0} onChange={e => setW({ ...w, sort_order: Number(e.target.value) })} /></div>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
        <input type="checkbox" checked={w.published ?? true} onChange={e => setW({ ...w, published: e.target.checked })} /> Published
      </label>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <button className="btn" onClick={() => onSubmit(w)}>{submitLabel}</button>
        {onDelete && <button className="btn btn-ghost" onClick={onDelete} style={{ color: "#ff6b6b" }}>Delete</button>}
      </div>
    </div>
  );
}

// ===== TRACKS =====
function TracksAdmin() {
  const [items, setItems] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const reload = async () => { setLoading(true); try { setItems(await fetchAllTracks()); } finally { setLoading(false); } };
  useEffect(() => { reload(); }, []);

  const blank: Partial<Track> = { title: "", artist: "", role: "", cover_url: "", audio_url: "", external_url: "", tags: [], sort_order: (items.at(-1)?.sort_order ?? 0) + 10, published: true };

  async function save(tr: Partial<Track>) {
    if (!tr.title?.trim()) return toast.error("Title is required");
    const payload = { ...tr, tags: tr.tags ?? [] } as never;
    const { error } = tr.id
      ? await supabase.from("tracks" as never).update(payload).eq("id", tr.id)
      : await supabase.from("tracks" as never).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); reload();
  }
  async function remove(id: string) {
    if (!confirm("Delete this track?")) return;
    const { error } = await supabase.from("tracks" as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); reload();
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Add new track</h2>
      <TrackForm key="new" initial={blank} onSubmit={save} submitLabel="Add track" />
      <h2 style={{ margin: "2rem 0 1rem" }}>All tracks ({items.length})</h2>
      {loading ? <p>Loading…</p> : items.map(tr => (
        <TrackForm key={tr.id} initial={tr} onSubmit={save} onDelete={() => remove(tr.id)} submitLabel="Save" />
      ))}
    </div>
  );
}

function TrackForm({ initial, onSubmit, onDelete, submitLabel }: { initial: Partial<Track>; onSubmit: (t: Partial<Track>) => void; onDelete?: () => void; submitLabel: string }) {
  const [tr, setTr] = useState<Partial<Track>>(initial);
  return (
    <div style={cardStyle}>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Title</label><input style={inputStyle} value={tr.title ?? ""} onChange={e => setTr({ ...tr, title: e.target.value })} /></div>
        <div><label style={labelStyle}>Artist</label><input style={inputStyle} value={tr.artist ?? ""} onChange={e => setTr({ ...tr, artist: e.target.value })} /></div>
      </div>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Role / credits</label><input style={inputStyle} value={tr.role ?? ""} onChange={e => setTr({ ...tr, role: e.target.value })} placeholder="Composition · Mix" /></div>
        <div><label style={labelStyle}>External link (YouTube, Spotify…)</label><input style={inputStyle} value={tr.external_url ?? ""} onChange={e => setTr({ ...tr, external_url: e.target.value })} /></div>
      </div>
      <ImagePicker label="Cover art" value={tr.cover_url ?? ""} onChange={(url) => setTr({ ...tr, cover_url: url })} />
      <div style={rowStyle}>
        <div><label style={labelStyle}>Audio file URL (mp3/wav — enables the player)</label><input style={inputStyle} value={tr.audio_url ?? ""} onChange={e => setTr({ ...tr, audio_url: e.target.value })} /></div>
        <div><label style={labelStyle}>Sort order</label><input type="number" style={inputStyle} value={tr.sort_order ?? 0} onChange={e => setTr({ ...tr, sort_order: Number(e.target.value) })} /></div>
      </div>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Tags (comma-separated)</label><input style={inputStyle} value={(tr.tags ?? []).join(", ")} onChange={e => setTr({ ...tr, tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} placeholder="original, cover, score" /></div>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
        <input type="checkbox" checked={tr.published ?? true} onChange={e => setTr({ ...tr, published: e.target.checked })} /> Published
      </label>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <button className="btn" onClick={() => onSubmit(tr)}>{submitLabel}</button>
        {onDelete && <button className="btn btn-ghost" onClick={onDelete} style={{ color: "#ff6b6b" }}>Delete</button>}
      </div>
    </div>
  );
}

// ===== SERVICES =====
function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const reload = async () => { setLoading(true); try { setItems(await fetchAllServices()); } finally { setLoading(false); } };
  useEffect(() => { reload(); }, []);

  const blank: Partial<Service> = { slug: "", title: "", icon: "bx-pulse", description: "", features: [], wide: false, sort_order: (items.at(-1)?.sort_order ?? 0) + 10, published: true };

  async function save(s: Partial<Service>) {
    const payload = { ...s, features: s.features ?? [] } as never;
    const { error } = s.id
      ? await supabase.from("services" as never).update(payload).eq("id", s.id)
      : await supabase.from("services" as never).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); reload();
  }
  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services" as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); reload();
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Add new service</h2>
      <ServiceForm key="new" initial={blank} onSubmit={save} submitLabel="Add service" />
      <h2 style={{ margin: "2rem 0 1rem" }}>All services ({items.length})</h2>
      {loading ? <p>Loading…</p> : items.map(s => (
        <ServiceForm key={s.id} initial={s} onSubmit={save} onDelete={() => remove(s.id)} submitLabel="Save" />
      ))}
    </div>
  );
}

function ServiceForm({ initial, onSubmit, onDelete, submitLabel }: { initial: Partial<Service>; onSubmit: (s: Partial<Service>) => void; onDelete?: () => void; submitLabel: string }) {
  const [s, setS] = useState<Partial<Service>>(initial);
  return (
    <div style={cardStyle}>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Title</label><input style={inputStyle} value={s.title ?? ""} onChange={e => setS({ ...s, title: e.target.value })} /></div>
        <div><label style={labelStyle}>Slug</label><input style={inputStyle} value={s.slug ?? ""} onChange={e => setS({ ...s, slug: e.target.value })} /></div>
      </div>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Icon (boxicons class)</label><input style={inputStyle} value={s.icon ?? ""} onChange={e => setS({ ...s, icon: e.target.value })} placeholder="bx-pulse" /></div>
        <div><label style={labelStyle}>Sort order</label><input type="number" style={inputStyle} value={s.sort_order ?? 0} onChange={e => setS({ ...s, sort_order: Number(e.target.value) })} /></div>
      </div>
      <div style={{ marginBottom: ".75rem" }}>
        <label style={labelStyle}>Description</label>
        <textarea style={{ ...inputStyle, minHeight: 80 }} value={s.description ?? ""} onChange={e => setS({ ...s, description: e.target.value })} />
      </div>
      <div style={{ marginBottom: ".75rem" }}>
        <label style={labelStyle}>Features (one per line)</label>
        <textarea style={{ ...inputStyle, minHeight: 100 }} value={(s.features ?? []).join("\n")} onChange={e => setS({ ...s, features: e.target.value.split("\n").map(x => x.trim()).filter(Boolean) })} />
      </div>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <input type="checkbox" checked={s.wide ?? false} onChange={e => setS({ ...s, wide: e.target.checked })} /> Wide / featured card
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <input type="checkbox" checked={s.published ?? true} onChange={e => setS({ ...s, published: e.target.checked })} /> Published
        </label>
      </div>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <button className="btn" onClick={() => onSubmit(s)}>{submitLabel}</button>
        {onDelete && <button className="btn btn-ghost" onClick={onDelete} style={{ color: "#ff6b6b" }}>Delete</button>}
      </div>
    </div>
  );
}

// ===== TESTIMONIALS =====
function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const reload = async () => { setLoading(true); try { setItems(await fetchAllTestimonials()); } finally { setLoading(false); } };
  useEffect(() => { reload(); }, []);

  const blank: Partial<Testimonial> = { quote: "", name: "", role: "", sort_order: (items.at(-1)?.sort_order ?? 0) + 10, published: true };

  async function save(t: Partial<Testimonial>) {
    const payload = { ...t } as never;
    const { error } = t.id
      ? await supabase.from("testimonials" as never).update(payload).eq("id", t.id)
      : await supabase.from("testimonials" as never).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); reload();
  }
  async function remove(id: string) {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("testimonials" as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); reload();
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Add testimonial</h2>
      <TestimonialForm key="new" initial={blank} onSubmit={save} submitLabel="Add" />
      <h2 style={{ margin: "2rem 0 1rem" }}>All testimonials ({items.length})</h2>
      {loading ? <p>Loading…</p> : items.map(t => (
        <TestimonialForm key={t.id} initial={t} onSubmit={save} onDelete={() => remove(t.id)} submitLabel="Save" />
      ))}
    </div>
  );
}

function TestimonialForm({ initial, onSubmit, onDelete, submitLabel }: { initial: Partial<Testimonial>; onSubmit: (t: Partial<Testimonial>) => void; onDelete?: () => void; submitLabel: string }) {
  const [t, setT] = useState<Partial<Testimonial>>(initial);
  return (
    <div style={cardStyle}>
      <div style={{ marginBottom: ".75rem" }}>
        <label style={labelStyle}>Quote</label>
        <textarea style={{ ...inputStyle, minHeight: 80 }} value={t.quote ?? ""} onChange={e => setT({ ...t, quote: e.target.value })} />
      </div>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Name</label><input style={inputStyle} value={t.name ?? ""} onChange={e => setT({ ...t, name: e.target.value })} /></div>
        <div><label style={labelStyle}>Role / company</label><input style={inputStyle} value={t.role ?? ""} onChange={e => setT({ ...t, role: e.target.value })} /></div>
      </div>
      <div style={rowStyle}>
        <div><label style={labelStyle}>Sort order</label><input type="number" style={inputStyle} value={t.sort_order ?? 0} onChange={e => setT({ ...t, sort_order: Number(e.target.value) })} /></div>
        <label style={{ display: "flex", alignItems: "center", gap: ".5rem", alignSelf: "end", paddingBottom: ".65rem" }}>
          <input type="checkbox" checked={t.published ?? true} onChange={e => setT({ ...t, published: e.target.checked })} /> Published
        </label>
      </div>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <button className="btn" onClick={() => onSubmit(t)}>{submitLabel}</button>
        {onDelete && <button className="btn btn-ghost" onClick={onDelete} style={{ color: "#ff6b6b" }}>Delete</button>}
      </div>
    </div>
  );
}

// ===== SITE CONTENT (key/value JSON) =====
function ContentAdmin() {
  const [rows, setRows] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const data = await fetchSiteContent();
      setRows(Object.entries(data).sort(([a],[b]) => a.localeCompare(b)).map(([k, v]) => ({ key: k, value: JSON.stringify(v, null, 2) })));
    } finally { setLoading(false); }
  };
  useEffect(() => { reload(); }, []);

  async function save(key: string, valueStr: string) {
    let value: unknown;
    try { value = JSON.parse(valueStr); } catch { return toast.error("Invalid JSON"); }
    const { error } = await supabase.from("site_content" as never).upsert({ key, value } as never);
    if (error) return toast.error(error.message);
    toast.success(`Saved "${key}"`);
  }
  async function remove(key: string) {
    if (!confirm(`Delete content key "${key}"?`)) return;
    const { error } = await supabase.from("site_content" as never).delete().eq("key", key);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); reload();
  }

  const [newKey, setNewKey] = useState("");
  const [newVal, setNewVal] = useState('{}');

  return (
    <div>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: ".75rem" }}>Add new content key</h2>
        <p style={{ fontSize: ".85rem", marginBottom: ".75rem" }}>Keys store JSON used by pages (hero, contact, about, social, stats…). Edit values as JSON.</p>
        <div style={rowStyle}>
          <div><label style={labelStyle}>Key</label><input style={inputStyle} value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="e.g. footer_tagline" /></div>
        </div>
        <div style={{ marginBottom: ".75rem" }}>
          <label style={labelStyle}>JSON value</label>
          <textarea style={{ ...inputStyle, minHeight: 100, fontFamily: "monospace" }} value={newVal} onChange={e => setNewVal(e.target.value)} />
        </div>
        <button className="btn" onClick={async () => { if (!newKey.trim()) return toast.error("Key required"); await save(newKey.trim(), newVal); setNewKey(""); setNewVal("{}"); reload(); }}>Add key</button>
      </div>

      <h2 style={{ margin: "2rem 0 1rem" }}>All content keys ({rows.length})</h2>
      {loading ? <p>Loading…</p> : rows.map(r => <ContentRow key={r.key} row={r} onSave={save} onDelete={() => remove(r.key)} />)}
    </div>
  );
}

function ContentRow({ row, onSave, onDelete }: { row: { key: string; value: string }; onSave: (k: string, v: string) => void; onDelete: () => void }) {
  const [val, setVal] = useState(row.value);
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
        <strong style={{ fontSize: "1rem", color: "var(--primary-glow)" }}>{row.key}</strong>
      </div>
      <textarea style={{ ...inputStyle, minHeight: 140, fontFamily: "monospace", fontSize: ".82rem" }} value={val} onChange={e => setVal(e.target.value)} />
      <div style={{ display: "flex", gap: ".5rem", marginTop: ".75rem" }}>
        <button className="btn" onClick={() => onSave(row.key, val)}>Save</button>
        <button className="btn btn-ghost" onClick={onDelete} style={{ color: "#ff6b6b" }}>Delete</button>
      </div>
    </div>
  );
}
// ===== IMAGE PICKER (upload to "media" bucket, served via /api/public/media) =====
function ImagePicker({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  async function upload(file: File) {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      // The bucket is private, so assets are streamed through our public media route
      onChange(`/api/public/media/${path}`);
      toast.success("Image uploaded");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      toast.error(msg);
    } finally { setBusy(false); }
  }
  return (
    <div style={{ marginBottom: ".75rem" }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", gap: ".5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        {value && <img src={value} alt="" style={{ width: 96, height: 72, objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }} />}
        <div style={{ flex: 1, minWidth: 240 }}>
          <input style={inputStyle} value={value} onChange={e => onChange(e.target.value)} placeholder="Paste URL or upload below" />
          <label style={{ display: "inline-block", marginTop: ".5rem", padding: ".4rem .8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-2)", cursor: "pointer", fontSize: ".85rem" }}>
            {busy ? "Uploading…" : "📁 Upload image"}
            <input type="file" accept="image/*" style={{ display: "none" }} disabled={busy}
              onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
          </label>
          {value && <button type="button" className="btn btn-ghost" style={{ marginLeft: ".5rem", padding: ".4rem .8rem", fontSize: ".85rem" }} onClick={() => onChange("")}>Clear</button>}
        </div>
      </div>
    </div>
  );
}

// ===== PAGES & SECTIONS (structured editor for site_content keys) =====
type FieldType = "text" | "textarea" | "image" | "list" | "objectList";
type SubField = { name: string; label: string; type: "text" | "textarea" | "image" };
type Field = {
  name: string; label: string; type: FieldType;
  placeholder?: string;
  fields?: SubField[]; // for objectList
};
type SectionSchema = { key: string; title: string; description?: string; fields: Field[] };

const PAGE_SCHEMAS: { page: string; sections: SectionSchema[] }[] = [
  {
    page: "Home",
    sections: [
      { key: "home_hero", title: "Hero", fields: [
        { name: "eyebrow", label: "Eyebrow (top label)", type: "text" },
        { name: "title", label: "Main headline", type: "text" },
        { name: "accent", label: "Accented word (highlighted in title)", type: "text" },
        { name: "subtitle", label: "Subtitle / paragraph", type: "textarea" },
        { name: "ctaPrimaryLabel", label: "Primary button label", type: "text" },
        { name: "ctaSecondaryLabel", label: "Secondary button label", type: "text" },
        { name: "image", label: "Hero image", type: "image" },
        { name: "pillTitle", label: "Award pill title", type: "text" },
        { name: "pillSub", label: "Award pill subtitle", type: "text" },
        { name: "rigTitle", label: "Equipment card title", type: "text" },
        { name: "rigDescription", label: "Equipment card description", type: "text" },
      ] },
      { key: "home_stats", title: "Stats strip", fields: [
        { name: "items", label: "Stats", type: "objectList", fields: [
          { name: "n", label: "Number", type: "text" },
          { name: "l", label: "Label", type: "text" },
        ] },
      ] },
      { key: "home_services_intro", title: "Services section intro", fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text" },
        { name: "title", label: "Headline", type: "text" },
        { name: "accent", label: "Accent word", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ] },
      { key: "home_cta", title: "Bottom CTA block", fields: [
        { name: "title", label: "Title", type: "text" },
        { name: "accent", label: "Accent word", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "buttonLabel", label: "Button label", type: "text" },
      ] },
    ],
  },
  {
    page: "About",
    sections: [
      { key: "about_intro", title: "Page intro", fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text" },
        { name: "title", label: "Headline", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Studio image", type: "image" },
      ] },
      { key: "about_founder", title: "Founder block", fields: [
        { name: "name", label: "Founder name", type: "text" },
        { name: "title", label: "Role / title", type: "text" },
        { name: "bio", label: "Biography", type: "textarea" },
        { name: "photo", label: "Founder photo", type: "image" },
        { name: "skills", label: "Skills", type: "list" },
        { name: "certifications", label: "Certifications", type: "list" },
      ] },
      { key: "about_experience", title: "Experience timeline", fields: [
        { name: "items", label: "Experience entries", type: "objectList", fields: [
          { name: "role", label: "Role", type: "text" },
          { name: "company", label: "Company", type: "text" },
          { name: "years", label: "Years", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ] },
      ] },
    ],
  },
  {
    page: "Services",
    sections: [
      { key: "services_intro", title: "Page intro", fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text" },
        { name: "title", label: "Headline", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ] },
      { key: "services_cta", title: "Bottom CTA", fields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "buttonLabel", label: "Button label", type: "text" },
      ] },
    ],
  },
  {
    page: "Works",
    sections: [
      { key: "works_intro", title: "Page intro", fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text" },
        { name: "title", label: "Headline", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ] },
      { key: "works_clients", title: "Clients logos", fields: [
        { name: "items", label: "Clients", type: "objectList", fields: [
          { name: "name", label: "Name", type: "text" },
          { name: "logo", label: "Logo image", type: "image" },
        ] },
      ] },
    ],
  },
  {
    page: "Contact",
    sections: [
      { key: "contact_intro", title: "Page intro", fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text" },
        { name: "title", label: "Headline", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ] },
      { key: "contact_info", title: "Contact details", fields: [
        { name: "email", label: "Email", type: "text" },
        { name: "phone", label: "Phone", type: "text" },
        { name: "address", label: "Address", type: "textarea" },
        { name: "hours", label: "Working hours", type: "text" },
      ] },
    ],
  },
  {
    page: "Site (Header / Footer / SEO)",
    sections: [
      { key: "site_brand", title: "Brand", fields: [
        { name: "name", label: "Studio name", type: "text" },
        { name: "logo", label: "Logo image", type: "image" },
        { name: "tagline", label: "Tagline", type: "text" },
      ] },
      { key: "site_social", title: "Social links", fields: [
        { name: "instagram", label: "Instagram URL", type: "text" },
        { name: "linkedin", label: "LinkedIn URL", type: "text" },
        { name: "facebook", label: "Facebook URL", type: "text" },
        { name: "twitter", label: "Twitter / X URL", type: "text" },
        { name: "youtube", label: "YouTube URL", type: "text" },
      ] },
      { key: "site_footer", title: "Footer", fields: [
        { name: "tagline", label: "Footer tagline", type: "textarea" },
        { name: "copyright", label: "Copyright text", type: "text" },
      ] },
      { key: "site_seo", title: "Default SEO", fields: [
        { name: "title", label: "Default page title", type: "text" },
        { name: "description", label: "Default meta description", type: "textarea" },
        { name: "ogImage", label: "Default social share image", type: "image" },
      ] },
    ],
  },
];

function PagesAdmin() {
  const [content, setContent] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(PAGE_SCHEMAS[0].page);

  const reload = async () => { setLoading(true); try { setContent(await fetchSiteContent()); } finally { setLoading(false); } };
  useEffect(() => { reload(); }, []);

  const current = useMemo(() => PAGE_SCHEMAS.find(p => p.page === activePage)!, [activePage]);

  if (loading) return <p>Loading content…</p>;

  return (
    <div>
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {PAGE_SCHEMAS.map(p => (
          <button key={p.page} onClick={() => setActivePage(p.page)}
            style={{
              padding: ".5rem 1rem", borderRadius: 999, fontWeight: 600, fontSize: ".85rem",
              background: activePage === p.page ? "var(--primary)" : "var(--bg-2)",
              color: activePage === p.page ? "white" : "var(--text-muted)",
              border: "1px solid var(--border)",
            }}>{p.page}</button>
        ))}
      </div>
      {current.sections.map(s => (
        <SectionEditor key={s.key} schema={s} initial={content[s.key] ?? {}} onSaved={reload} />
      ))}
    </div>
  );
}

function SectionEditor({ schema, initial, onSaved }: { schema: SectionSchema; initial: Record<string, unknown>; onSaved: () => void }) {
  const [val, setVal] = useState<Record<string, unknown>>(initial);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    const { error } = await supabase.from("site_content" as never).upsert({ key: schema.key, value: val } as never);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`Saved ${schema.title}`);
    onSaved();
  }

  function setField(name: string, v: unknown) { setVal({ ...val, [name]: v }); }

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".75rem" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", margin: 0 }}>{schema.title}</h3>
          <code style={{ fontSize: ".75rem", color: "var(--text-muted)" }}>{schema.key}</code>
        </div>
        <button className="btn" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</button>
      </div>
      {schema.fields.map(f => (
        <FieldEditor key={f.name} field={f} value={val[f.name]} onChange={(v) => setField(f.name, v)} />
      ))}
    </div>
  );
}

function FieldEditor({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  if (field.type === "text") {
    return (
      <div style={{ marginBottom: ".75rem" }}>
        <label style={labelStyle}>{field.label}</label>
        <input style={inputStyle} value={(value as string) ?? ""} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} />
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <div style={{ marginBottom: ".75rem" }}>
        <label style={labelStyle}>{field.label}</label>
        <textarea style={{ ...inputStyle, minHeight: 80 }} value={(value as string) ?? ""} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} />
      </div>
    );
  }
  if (field.type === "image") {
    return <ImagePicker label={field.label} value={(value as string) ?? ""} onChange={onChange} />;
  }
  if (field.type === "list") {
    const arr = (Array.isArray(value) ? value : []) as string[];
    return (
      <div style={{ marginBottom: ".75rem" }}>
        <label style={labelStyle}>{field.label} (one per line)</label>
        <textarea style={{ ...inputStyle, minHeight: 100 }}
          value={arr.join("\n")}
          onChange={e => onChange(e.target.value.split("\n").map(x => x.trim()).filter(Boolean))} />
      </div>
    );
  }
  if (field.type === "objectList") {
    const arr = (Array.isArray(value) ? value : []) as Record<string, unknown>[];
    const subs = field.fields ?? [];
    const setItem = (i: number, k: string, v: unknown) => {
      const next = arr.slice(); next[i] = { ...next[i], [k]: v }; onChange(next);
    };
    const removeItem = (i: number) => onChange(arr.filter((_, j) => j !== i));
    const addItem = () => onChange([...arr, {}]);
    return (
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>{field.label}</label>
        {arr.map((item, i) => (
          <div key={i} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", padding: ".75rem", borderRadius: "var(--radius-sm)", marginBottom: ".5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <strong style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>Item {i + 1}</strong>
              <button type="button" className="btn btn-ghost" style={{ color: "#ff6b6b", padding: ".25rem .6rem", fontSize: ".75rem" }} onClick={() => removeItem(i)}>Remove</button>
            </div>
            {subs.map(sf => (
              <FieldEditor key={sf.name} field={sf as Field} value={item[sf.name]} onChange={(v) => setItem(i, sf.name, v)} />
            ))}
          </div>
        ))}
        <button type="button" className="btn btn-ghost" style={{ fontSize: ".85rem" }} onClick={addItem}>+ Add item</button>
      </div>
    );
  }
  return null;
}
