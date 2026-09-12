function AboutSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <section id="about" data-screen-label="02 About" style={{ padding: '100px 8% 80px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--purple)" corner2="var(--cyan)">
        <div style={{ marginBottom: 40 }}>
          <SectionTag path="about" accent={accent} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>About Me</h2>
          </div>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Oh, hello! I'm <span style={{ color: 'var(--text)', fontWeight: 600 }}>Carlos</span> — nice to meet you. I grew up in <span style={{ color: 'var(--text)' }}>Chile</span> and moved to the United States chasing a career in entertainment technology so I could make cool things. I'm a U.S. citizen now, and I've been making games professionally since <span style={{ color: 'var(--text)' }}>2008</span>.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              I'm passionate about making video games — and about leadership: mentoring engineers, supporting their careers, and building teams that consistently ship high-quality work.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Most recently I was a <span style={{ color: 'var(--text)' }}>Technical Lead Manager</span> at <a href="https://www.sanzarugames.com" target="_blank" style={{ color: accent }}>Sanzaru Games</a> (a Meta studio), where I shipped several award-winning VR titles including <a href="#gamedev" style={{ color: accent }}>Asgard's Wrath</a> and <a href="#gamedev" style={{ color: accent }}>Asgard's Wrath 2</a> for the Oculus Rift and Quest 2/3.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Outside of engineering, I paint — mostly oil, sometimes digital (there's a whole <a href="#art" style={{ color: accent }}>gallery</a> of it if you scroll down). I'm also a little obsessed with productivity systems — ask me about whatever one I'm currently rebuilding my life around.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              I live in <span style={{ color: 'var(--text)' }}>San Mateo</span>, in the San Francisco Bay Area, with my wife and kid.
            </p>
          </div>

          <div style={{
            background: 'oklch(9% 0.04 290 / 0.5)',
            border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)`,
            borderRadius: 10,
            padding: '28px 30px',
          }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600, color: accent, marginBottom: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Master of Entertainment Technology</div>
                <a href="https://www.cmu.edu" target="_blank" style={{ fontSize: 13, color: accent2 }}>Carnegie Mellon University</a>
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>M.S. & B.S. Computer Science & Engineering</div>
                <a href="https://www.uchile.cl" target="_blank" style={{ fontSize: 13, color: accent2 }}>Universidad de Chile</a>
              </div>
            </div>
            <div style={{ height: 1, background: `linear-gradient(90deg, color-mix(in oklch, ${accent} 40%, transparent), transparent)`, margin: '24px 0' }} />
            <div style={{ fontSize: 13, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Previously at</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Electronic Arts', 'Bigpoint', 'Sanzaru Games', 'Meta'].map(co => (
                <span key={co} style={{
                  padding: '6px 12px', borderRadius: 4,
                  border: '1px solid var(--purple-a3)',
                  background: 'oklch(12% 0.05 290 / 0.5)',
                  fontSize: 12, color: 'var(--text)', fontFamily: 'Space Grotesk',
                }}>{co}</span>
              ))}
            </div>
            <a href="/assets/Carlos_Hurtado_Resume.pdf" target="_blank" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 20, fontSize: 13, fontWeight: 600, color: accent,
              fontFamily: 'Space Grotesk', letterSpacing: '0.02em',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </a>
          </div>
        </div>

        <GlowDivider color={accent} />

        {/* Full-width, not squeezed into the narrow sidebar column — six
            categories stacked in a 1fr column left as much empty space
            below the bio text as the whole rest of the card. */}
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600, color: accent, marginBottom: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tools I Use</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 40px' }}>
            {TOOLS_I_USE.map(group => (
              <div key={group.category} style={{ minWidth: 200 }}>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>{group.category}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.items.map(item => (
                    <a key={item.name} href={item.url} target="_blank" rel="noopener" style={{
                      padding: '5px 10px', borderRadius: 4,
                      border: '1px solid var(--purple-a3)',
                      background: 'oklch(12% 0.05 290 / 0.5)',
                      fontSize: 12, color: 'var(--text)', fontFamily: 'Space Grotesk',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--purple-a3)'; e.currentTarget.style.color = 'var(--text)'; }}
                    >{item.name}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard></Reveal>
    </section>
  );
}

