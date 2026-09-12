// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ accentColor }) {
  const { accent } = useAccent(accentColor);
  return (
    <footer style={{ padding: '0 8% 32px', position: 'relative' }}>
      <GlowDivider color={accent} />
      <div style={{
        textAlign: 'center', margin: '36px 0 40px', padding: '28px 24px',
        background: 'oklch(9% 0.04 290 / 0.5)',
        border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)`,
        borderRadius: 10,
        boxShadow: `0 0 40px color-mix(in oklch, ${accent} 12%, transparent), inset 0 1px 0 oklch(100% 0 0 / 0.05)`,
      }}>
        <p style={{
          fontFamily: 'Space Grotesk', fontWeight: 600,
          fontSize: 'clamp(13px, 1.4vw, 15px)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0,
          background: `linear-gradient(135deg, ${accent}, var(--orange))`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Let's build something worth shipping.
        </p>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        fontSize: 13, color: 'var(--text-dim)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Logo height={28} />
          <span>SF Bay Area · Game Industry · 15+ Years</span>
        </div>
        <SocialLinks accent={accent} />
      </div>
    </footer>
  );
}

