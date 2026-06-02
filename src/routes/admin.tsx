import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchAllWorks, fetchAllServices, fetchAllTestimonials, fetchSiteContent,
  type Work, type Service, type Testimonial,
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

type Tab = "pages" | "works" | "services" | "testimonials" | "content";

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
        {(["pages","works","services","testimonials","content"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: ".6rem 1.1rem", borderRadius: 999, fontWeight: 600, textTransform: "capitalize",
              background: tab === t ? "var(--gradient-primary)" : "var(--surface)",
              color: tab === t ? "white" : "var(--text-muted)",
              border: "1px solid var(--border)",
            }}>{t === "content" ? "Raw JSON" : t === "pages" ? "Pages & Sections" : t}</button>
        ))}
      </nav>

      {tab === "pages" && <PagesAdmin />}
      {tab === "works" && <WorksAdmin />}
      {tab === "services" && <ServicesAdmin />}
      {tab === "testimonials" && <TestimonialsAdmin />}
      {tab === "content" && <ContentAdmin />}
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
      <div style={{ marginBottom: ".75rem" }}><label style={labelStyle}>Image URL</label><input style={inputStyle} value={w.image_url ?? ""} onChange={e => setW({ ...w, image_url: e.target.value })} placeholder="/assets/img/works/..." /></div>
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