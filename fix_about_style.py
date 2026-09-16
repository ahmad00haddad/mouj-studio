import re

with open('src/routes/about.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

bad_process = '''        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden" style={{ maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <h3 className="text-xl font-bold mb-4" style={{ marginBottom: "1rem" }}>Project Breakdown: Rah Telhaqni</h3>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl" style={{ marginBottom: "1.5rem" }}>
            Ever wondered how an Arabic Synthpop track is layered? In this deep-dive, I break down the exact FL Studio project file for "Rah Telhaqni", showcasing the vocal chains, synth processing, and arrangement techniques used to create the final mix.
          </p>
          <a href="https://www.youtube.com/watch?v=ivWObD7kW_c" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <i className="bx bxl-youtube text-xl"></i> Watch the Breakdown on YouTube
          </a>
        </div>'''

good_process = '''        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "3rem", position: "relative", overflow: "hidden", maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-5%", opacity: 0.03, pointerEvents: "none" }}>
            <i className="bx bx-slider" style={{ fontSize: "24rem" }}></i>
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>Project Breakdown: Rah Telhaqni</h3>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "800px", fontSize: "1.1rem" }}>
            Ever wondered how an Arabic Synthpop track is layered? In this deep-dive, I break down the exact FL Studio project file for "Rah Telhaqni", showcasing the vocal chains, synth processing, and arrangement techniques used to create the final mix.
          </p>
          <a href="https://www.youtube.com/watch?v=ivWObD7kW_c" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem" }}>
            <i className="bx bxl-youtube" style={{ fontSize: "1.25rem" }}></i> Watch the Breakdown on YouTube
          </a>
        </div>'''

if bad_process in content:
    content = content.replace(bad_process, good_process)
else:
    print("Could not find bad process block")

with open('src/routes/about.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
