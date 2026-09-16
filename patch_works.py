import os

with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

xetopia_block = '''
        {/* Xetopia Spotlight */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 relative overflow-hidden" style={{ maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <i className="bx bx-album" style={{ fontSize: "10rem" }}></i>
          </div>
          <span className="eyebrow block mb-4" style={{ color: "var(--primary-glow)" }}>Upcoming LP</span>
          <h2 className="text-3xl font-bold mb-4">Xetopia</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl">
            <strong>Xetopia</strong> is Mouje's deeply personal upcoming Electronic Synthpop album. It's a sonic journey exploring profound themes: 
            <em> 'Saken'</em> dives into the duality of character and inner conflict, while <em>'Rah Telhaqni'</em> (featuring Desana) serves as his first original Arabic electronic release, asking the haunting question: <em>"Will you catch me when I fall at the end of the world?"</em>
          </p>
          <a href="https://open.spotify.com/artist/6xRx0cxS6FrZYDccwPQvbz" target="_blank" rel="noreferrer" className="btn btn-ghost inline-flex items-center gap-2" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <i className="bx bxl-spotify text-xl"></i> Listen on Spotify
          </a>
        </div>
'''

target = '          </div>\n\n          <div className="works-filters">'
new_content = content.replace(target, '          </div>\n' + xetopia_block + '\n          <div className="works-filters">')

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
