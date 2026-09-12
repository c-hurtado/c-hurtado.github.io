// ─── AVATAR ───────────────────────────────────────────────────────────────────
function AvatarCircle({ size = 160, accentColor }) {
  const { accent } = useAccent(accentColor);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `2px solid ${accent}`,
      boxShadow: `0 0 24px color-mix(in oklch, ${accent} 60%, transparent), 0 0 60px var(--purple-a3)`,
      flexShrink: 0,
      overflow: 'hidden',
      background: 'oklch(8% 0.04 290)',
    }}>
      <img
        src="/assets/img/mepunk.png"
        alt="Carlos Hurtado"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
      />
    </div>
  );
}

