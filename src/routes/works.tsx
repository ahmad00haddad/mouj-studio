import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import { categories, works, type Category } from "@/lib/works-data";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — Sonix" },
      { name: "description", content: "Selected sound design, mixing, scoring and recording projects." },
      { property: "og:title", content: "Works — Sonix" },
      { property: "og:description", content: "Selected sound design, mixing, scoring and recording projects." },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const [active, setActive] = useState<Category>("all");
  const filtered = useMemo(
    () => (active === "all" ? works : works.filter((w) => w.category === active)),
    [active],
  );

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-16 fade-up">
        <p className="uppercase tracking-[0.4em] text-secondary text-xs mb-4">Portfolio</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold">
          Selected <span className="text-gradient">Works</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mt-5 text-lg">
          A taste of recent sessions across film, games, music and brands.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-14">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-5 py-2.5 rounded-full text-sm uppercase tracking-wider font-medium border transition-all ${
              active === c.id
                ? "bg-primary border-primary text-primary-foreground glow-primary"
                : "border-border text-muted-foreground hover:border-secondary hover:text-secondary"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((w, i) => (
          <article
            key={w.id}
            className="group relative overflow-hidden rounded-2xl border border-border aspect-[4/5] cursor-pointer fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <img
              src={w.image}
              alt={w.title}
              loading="lazy"
              width={1024}
              height={768}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-secondary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-5 h-5 text-secondary-foreground fill-current ml-0.5" />
            </div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <p className="text-xs uppercase tracking-widest text-secondary mb-2">
                {w.category.replace("-", " ")} · {w.year}
              </p>
              <h3 className="font-display text-2xl font-bold">{w.title}</h3>
              <p className="text-muted-foreground text-sm">{w.client}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
