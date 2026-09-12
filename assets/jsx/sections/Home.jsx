// ─── HOME SECTION ─────────────────────────────────────────────────────────────
function HomeSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <section id="home" data-screen-label="01 Home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 80px',
      position: 'relative',
    }}>
      <Reveal><div style={{
        width: '100%', maxWidth: 700,
        background: 'var(--card-bg)',
        backdropFilter: 'blur(24px)',
        border: `1px solid var(--border)`,
        borderRadius: 12,
        padding: '48px 52px',
        boxShadow: `0 0 60px var(--purple-a15), 0 0 120px oklch(62% 0.28 340 / 0.08), inset 0 1px 0 oklch(100% 0 0 / 0.06)`,
        position: 'relative',
      }}>
        {/* Corner accent */}
        <div style={{ position: 'absolute', top: -1, left: -1, width: 60, height: 60, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0,
            borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`, width: 30, height: 30, borderRadius: '10px 0 0 0' }} />
        </div>
        <div style={{ position: 'absolute', bottom: -1, right: -1, width: 60, height: 60, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0,
            borderBottom: `2px solid ${accent2}`, borderRight: `2px solid ${accent2}`, width: 30, height: 30, borderRadius: '0 0 10px 0' }} />
        </div>

        {/* Avatar + greeting */}
        <div className="home-card-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 32 }}>
          <AvatarCircle size={100} accentColor={accentColor} />
          <div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              <NeonBadge color={accent}>Lead Engineer</NeonBadge>
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(32px, 4.4vw, 46px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Hi, I'm{' '}
              <span style={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Carlos Hurtado.</span>
            </h1>
            <div style={{ marginTop: 6, fontSize: 13, color: 'var(--text-dim)' }}>SF Bay Area</div>
          </div>
        </div>

        <GlowDivider />

        {/* Single sharpest credential up top, not buried after 3 paragraphs — CTA sits right below it. */}
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text)', marginBottom: 24 }}>
          Shipping award-winning VR games since 2008. Currently a <span style={{ fontWeight: 600 }}>Senior Engineer</span> at{' '}
          <a href="https://www.sneakydevilstudios.com/" target="_blank" style={{ color: 'var(--text)', fontWeight: 600 }}>Sneaky Devil Studios</a>, previously{' '}
          <span style={{ fontWeight: 600 }}>Technical Lead Manager</span> at <a href="https://www.sanzaru.com/" target="_blank" style={{ color: 'var(--text)', fontWeight: 600 }}>Sanzaru Games</a> (Oculus Studios · Meta), where{' '}
          <a href="#gamedev" style={{ color: accent, fontWeight: 600 }}>Asgard's Wrath 2</a> shipped to a perfect{' '}
          <a href="https://www.ign.com/articles/asgards-wrath-2-review" target="_blank" style={{ color: accent2, fontWeight: 700 }}>10/10 from IGN</a>.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
          <SocialLinks accent={accent} />
          <a href="/assets/Carlos_Hurtado_Resume.pdf" target="_blank" style={{
            padding: '10px 24px', borderRadius: 4,
            background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            color: '#fff', fontWeight: 600, fontSize: 14,
            fontFamily: 'Space Grotesk', letterSpacing: '0.04em',
            boxShadow: `0 4px 20px color-mix(in oklch, ${accent} 40%, transparent)`,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>

        <GlowDivider />

        {/* Secondary detail — the fuller narrative already lives in About, so this stays short. */}
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-dim)', marginTop: 20 }}>
          <span style={{ color: 'var(--text)' }}>Unreal Engine 4 & 5</span>, performance optimization, and high-scale gameplay systems in <span style={{ color: 'var(--text)' }}>C++</span> are where I live day to day — but outside of work I'm a <a href="#art" style={{ color: accent, fontWeight: 600 }}>hobbyist artist</a>, and I'm always tinkering with some new <a href="#about" style={{ color: accent, fontWeight: 600 }}>productivity system</a>.
        </p>
      </div></Reveal>
    </section>
  );
}

// Assembled at runtime instead of a literal address in the source — cuts
// down on basic regex-based email-harvesting bots scraping the page/bundle.
const CONTACT_EMAIL = ['carloshurtado', 'gmail.com'].join('@');

