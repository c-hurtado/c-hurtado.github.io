function AwardBadge({ org, category, logo, accent, muted, invert }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10,
      padding: '18px 16px', borderRadius: 8,
      background: 'oklch(9% 0.04 290 / 0.5)',
      border: `1px solid ${muted ? 'var(--purple-a15)' : 'var(--purple-a2)'}`,
      opacity: muted ? 0.7 : 1,
    }}>
      <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {logo ? (
          <img src={logo} alt={`${org} logo`} style={{
            height: '100%', maxWidth: 120, width: 'auto', objectFit: 'contain', display: 'block',
            filter: invert ? 'grayscale(1) invert(1) brightness(1.6)' : 'none',
          }} />
        ) : (
          <span style={{
            fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
            color: accent, border: `1px solid color-mix(in oklch, ${accent} 60%, transparent)`, borderRadius: 4, padding: '4px 10px',
          }}>{org}</span>
        )}
      </div>
      <div>
        {logo && <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 3 }}>{org}</div>}
        <div style={{ fontSize: 12, lineHeight: 1.5, color: muted ? 'var(--text-dim)' : 'var(--text)' }}>{category}</div>
      </div>
    </div>
  );
}

function AwardsSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <section id="awards" data-screen-label="04 Awards" style={{ padding: '100px 8% 80px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--cyan)" corner2="var(--orange)">
        <div style={{ marginBottom: 48 }}>
          <SectionTag path="awards" accent={accent} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Awards & Recognition</h2>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 600, marginLeft: 19 }}>
            Selected honors from shipped titles.
          </p>
        </div>

        {AWARDS_BY_GAME.map((group, gi) => (
          <React.Fragment key={group.game}>
            {gi > 0 && <GlowDivider color={accent} />}
            <div style={{ marginBottom: gi < AWARDS_BY_GAME.length - 1 ? 44 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{group.game}</h3>
                <span style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{group.year}</span>
              </div>
              <div className="awards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
                {group.wins.map((award, i) => (
                  <AwardBadge key={i} {...award} accent={accent} />
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}

        {AWARD_NOMINATIONS.length > 0 && (
          <>
            <GlowDivider color={accent} />
            <div style={{ marginTop: 44 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Nominations</h3>
              <div className="awards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
                {AWARD_NOMINATIONS.map((award, i) => (
                  <AwardBadge key={i} {...award} accent={accent} muted />
                ))}
              </div>
            </div>
          </>
        )}
      </SectionCard></Reveal>
    </section>
  );
}

