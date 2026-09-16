import re

with open('src/routes/about.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

timeline_block = '''
      <section>
        <div className="section-head">
          <span className="eyebrow">Milestones</span>
          <h2>A Brief <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Timeline</span></h2>
        </div>
        <div className="pillars">
          <div className="pillar">
            <div className="n">1996</div>
            <h3>Origins</h3>
            <p>Born October 26, 1996. The seed of musical curiosity was planted early.</p>
          </div>
          <div className="pillar">
            <div className="n">2016</div>
            <h3>First Releases</h3>
            <p>Started the journey with Electronic Dance Music and Dubstep releases, including tracks like "Terror".</p>
          </div>
          <div className="pillar">
            <div className="n">2020s</div>
            <h3>Gaming & Media</h3>
            <p>Lead Sound Designer & Audio Engineer for major regional projects including Jawaker's World Cup Radio and Sowt Podcasts.</p>
          </div>
        </div>
      </section>
      
      <section>
        <div className="section-head">
          <span className="eyebrow">Behind The Scenes</span>
          <h2>The <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Process</span></h2>
          <p>Peek into the workflow and engineering behind the tracks.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden" style={{ maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
          <h3 className="text-xl font-bold mb-4" style={{ marginBottom: "1rem" }}>Project Breakdown: Rah Telhaqni</h3>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl" style={{ marginBottom: "1.5rem" }}>
            Ever wondered how an Arabic Synthpop track is layered? In this deep-dive, I break down the exact FL Studio project file for "Rah Telhaqni", showcasing the vocal chains, synth processing, and arrangement techniques used to create the final mix.
          </p>
          <a href="https://www.youtube.com/watch?v=ivWObD7kW_c" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <i className="bx bxl-youtube text-xl"></i> Watch the Breakdown on YouTube
          </a>
        </div>
      </section>
'''

# insert before "<section> <div className="section-head"> <span className="eyebrow">Experience</span>"
target = '<section>\n        <div className="section-head">\n          <span className="eyebrow">Experience</span>'
if target in content:
    new_content = content.replace(target, timeline_block + '\n      ' + target)
else:
    # try regex
    new_content = re.sub(
        r'(<section>\s*<div className="section-head">\s*<span className="eyebrow">Experience</span>)',
        timeline_block + r'\n      \1',
        content,
        flags=re.DOTALL
    )

with open('src/routes/about.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
print(new_content.find("Milestones"))
