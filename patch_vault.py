import re

with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

vault_block = '''
      <section>
        <div className="section-head">
          <span className="eyebrow">From The Vault</span>
          <h2>Hidden <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gems</span></h2>
          <p>A journey back in time. Early experiments, raw sessions, and the milestones that shaped Mouje's sound.</p>
        </div>
        <div className="works-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          
          <div className="work">
            <img src="/assets/img/works/hero-producer.jpg" alt="Early Days" loading="lazy" style={{ filter: "grayscale(80%) sepia(20%)" }} />
            <div className="work-overlay">
              <h3>2016 Dubstep Era</h3>
              <p>The very beginnings. Heavy bass drops, aggressive synths, and the release of 'Terror' that started the electronic journey.</p>
            </div>
          </div>

          <div className="work">
            <img src="/assets/img/works/work-foley.jpg" alt="First Studio" loading="lazy" style={{ filter: "grayscale(50%)" }} />
            <div className="work-overlay">
              <h3>The First Setup</h3>
              <p>Before the HDX rigs and pristine acoustics. A testament to the fact that gear doesn't make the engineer; the ear does.</p>
            </div>
          </div>
          
          <div className="work">
            <img src="/assets/img/works/work-mixing.jpg" alt="Local Gigs" loading="lazy" style={{ filter: "grayscale(30%)" }} />
            <div className="work-overlay">
              <h3>Underground Sessions</h3>
              <p>Mixing and recording local bands in Amman. The raw, unfiltered energy of the Jordanian music scene.</p>
            </div>
          </div>

        </div>
      </section>
'''

# We will inject this right before the testimonials section
target = '<section>\n        <div className="section-head">\n          <span className="eyebrow">Testimonials</span>'
if target in content:
    new_content = content.replace(target, vault_block + '\n      ' + target)
else:
    new_content = re.sub(
        r'(<section>\s*<div className="section-head">\s*<span className="eyebrow">Testimonials</span>)',
        vault_block + r'\n      \1',
        content,
        flags=re.DOTALL
    )

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
print(new_content.find("From The Vault"))
