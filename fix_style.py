import re

with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

bad_xetopia = '''        {/* Xetopia Spotlight */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 relative overflow-hidden" style={{ maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <i className="bx bx-album" style={{ fontSize: "10rem" }}></i>
          </div>
          <span className="eyebrow block mb-4" style={{ color: "var(--primary-glow)", display: "block", marginBottom: "1rem" }}>Upcoming LP</span>
          <h2 className="text-3xl font-bold mb-4" style={{ marginBottom: "1rem" }}>Xetopia</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl" style={{ marginBottom: "1.5rem" }}>
            <strong>Xetopia</strong> is Mouje's deeply personal upcoming Electronic Synthpop album. It's a sonic journey exploring profound themes: 
            <em> 'Saken'</em> dives into the duality of character and inner conflict, while <em>'Rah Telhaqni'</em> (featuring Desana) serves as his first original Arabic electronic release, asking the haunting question: <em>"Will you catch me when I fall at the end of the world?"</em>
          </p>
          <a href="https://open.spotify.com/artist/6xRx0cxS6FrZYDccwPQvbz" target="_blank" rel="noreferrer" className="btn btn-ghost inline-flex items-center gap-2" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <i className="bx bxl-spotify text-xl"></i> Listen on Spotify
          </a>
        </div>'''

good_xetopia = '''        {/* Xetopia Spotlight */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "3rem", marginBottom: "4rem", position: "relative", overflow: "hidden", maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", opacity: 0.05, pointerEvents: "none" }}>
            <i className="bx bx-album" style={{ fontSize: "24rem" }}></i>
          </div>
          <span className="eyebrow" style={{ display: "block", marginBottom: "1rem", color: "var(--primary-glow)" }}>Upcoming LP</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Xetopia</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "800px", fontSize: "1.1rem" }}>
            <strong>Xetopia</strong> is Mouje's deeply personal upcoming Electronic Synthpop album. It's a sonic journey exploring profound themes: 
            <em> 'Saken'</em> dives into the duality of character and inner conflict, while <em>'Rah Telhaqni'</em> (featuring Desana) serves as his first original Arabic electronic release, asking the haunting question: <em>"Will you catch me when I fall at the end of the world?"</em>
          </p>
          <a href="https://open.spotify.com/artist/6xRx0cxS6FrZYDccwPQvbz" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem" }}>
            <i className="bx bxl-spotify" style={{ fontSize: "1.25rem" }}></i> Listen on Spotify
          </a>
        </div>'''

if bad_xetopia in content:
    content = content.replace(bad_xetopia, good_xetopia)
else:
    print("Could not find bad xetopia block")

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
