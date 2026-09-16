import re

with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The Xetopia spotlight block that was wrongly placed
xetopia_str = '''        {/* Xetopia Spotlight */}
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
        </div>
'''

# Remove the incorrectly placed block inside the works-grid map
# Also remove the blank lines if any.
content = content.replace(xetopia_str, "")

# Now insert it immediately after the stats-grid ends
# The stats grid is:
#         <div className="stats-grid" ...>
#           {stats.map(...)}
#         </div>

# Let's find exactly the end of stats-grid
target = '''        <div className="stats-grid" style={{ marginBottom: "3rem", maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          {stats.map(s => (
            <div className="stat-card" key={s.l}><h3>{s.n}</h3><p>{s.l}</p></div>
          ))}
        </div>'''

if target in content:
    content = content.replace(target, target + "\n\n" + xetopia_str)
else:
    print("Could not find stats-grid")

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
