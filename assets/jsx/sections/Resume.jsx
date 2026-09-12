// ─── RESUME SECTION ───────────────────────────────────────────────────────────
function ResumeSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  const skills = [
    { cat: 'Engine & Systems', items: ['Unreal Engine 4 & 5', 'C++', 'Gameplay Systems', 'Performance Optimization', 'Tooling & Pipeline'] },
    { cat: 'Leadership', items: ['Technical Lead', 'Engineering Management', 'Studio Vision Alignment', 'People Development', 'Cross-team Collaboration'] },
    { cat: 'Platforms', items: ['Meta Quest / VR', 'PC', 'Mobile', 'Facebook Platform', 'Console (PS3/360)'] },
  ];

  const timeline = [
    { year: '2021–2026', role: 'Technical Lead Manager', company: 'Sanzaru Games · Meta (Oculus Studios)', desc: 'Led engineering teams through full lifecycle of flagship VR titles. Asgard\'s Wrath 2 (IGN 10/10). Currently leading unannounced big-IP VR project.' },
    { year: '~2016–2021', role: 'Senior Engineer / Tech Lead', company: 'Sanzaru Games', desc: 'Shipped Asgard\'s Wrath, Marvel Powers United VR, and VR Sports Challenge. Architected core gameplay and multiplayer systems.' },
    { year: '~2012–2016', role: 'Software Engineer', company: 'Sanzaru Games · Big Fish Games', desc: 'Dark Manor: casual hidden-object mobile game. Small 2-engineer team, full stack ownership.' },
    { year: '~2010–2012', role: 'Software Engineer', company: 'Bigpoint', desc: 'Uridium Wars: Flash + PHP space MMO for Facebook platform.' },
    { year: '~2008–2010', role: 'Gameplay Engineer', company: 'Electronic Arts · Maxis', desc: 'Shipped Sims 3: Late Night, Generations, and Pets. First job out of grad school — three expansion packs in two years.' },
  ];

  return (
    <section id="resume" data-screen-label="06 Resume" style={{ padding: '100px 8% 80px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--pink)" corner2="var(--cyan)">
      <div style={{ marginBottom: 56 }}>
        <SectionTag path="resume" accent={accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Experience & Skills</h2>
        </div>
      </div>

      <div className="resume-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Timeline */}
        <div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 600, color: accent, marginBottom: 28, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 12 }}>Career Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, position: 'relative' }}>
                {/* Line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${accent}`, background: i === 0 ? accent : 'transparent', marginTop: 4, boxShadow: i === 0 ? `0 0 10px ${accent}` : 'none', flexShrink: 0 }} />
                  {i < timeline.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: `linear-gradient(to bottom, color-mix(in oklch, ${accent} 60%, transparent), oklch(55% 0.25 295 / 0.15))`, marginTop: 4 }} />
                  )}
                </div>
                <div style={{ paddingBottom: 28 }}>
                  <div style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 16, marginBottom: 3 }}>{item.role}</div>
                  <div style={{ fontSize: 13, color: accent2, marginBottom: 8 }}>{item.company}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-dim)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600, color: accent, marginBottom: 28, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Core Skills</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {skills.map(group => (
              <div key={group.cat}>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>{group.cat}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {group.items.map(skill => (
                    <span key={skill} style={{
                      padding: '6px 14px', borderRadius: 4,
                      border: '1px solid var(--purple-a3)',
                      background: 'oklch(12% 0.05 290 / 0.5)',
                      fontSize: 13, color: 'var(--text)',
                      fontFamily: 'Space Grotesk',
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a href="/assets/Carlos_Hurtado_Resume.pdf" target="_blank" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 28, fontSize: 13, fontWeight: 600, color: accent,
            fontFamily: 'Space Grotesk', letterSpacing: '0.02em',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>
      </div>
      </SectionCard></Reveal>
    </section>
  );
}

