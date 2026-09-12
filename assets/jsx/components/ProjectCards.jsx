// ─── FEATURED GAME DEV PROJECT ────────────────────────────────────────────────
// Bleeds past the section card's own padding (a deliberate break from the
// grid — everything else here sits neatly inside its container) to give the
// flagship shipped title a moment that isn't identical to the rest.
function FeaturedProjectCard({ project, accentColor, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <div
      role="button" tabIndex={0}
      onClick={onOpen}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="featured-project-card"
      style={{
        margin: '0 -52px 32px',
        position: 'relative',
        height: 'clamp(280px, 38vw, 420px)',
        overflow: 'hidden',
        cursor: 'pointer',
        borderTop: `1px solid color-mix(in oklch, ${accent} 30%, transparent)`,
        borderBottom: `1px solid color-mix(in oklch, ${accent} 30%, transparent)`,
      }}>
      <img src={project.img} alt={`${project.title} — ${project.studio}`} loading="lazy" decoding="async" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.5s ease',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(0deg, oklch(5% 0.02 290 / 0.92) 0%, oklch(5% 0.02 290 / 0.25) 55%, transparent 100%)',
      }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 52px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <NeonBadge color={accent}>Flagship Title</NeonBadge>
          {project.badge && <NeonBadge color={accent2}>{project.badge}</NeonBadge>}
        </div>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 14, color: 'oklch(85% 0.02 280)', maxWidth: 560 }}>{project.desc}</p>
      </div>
    </div>
  );
}

// ─── GAME DEV PROJECT CARD ────────────────────────────────────────────────────
function ProjectCard({ title, studio, desc, img: imgSrc, badge, accentColor, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <div
      role="button" tabIndex={0}
      onClick={onOpen}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // Shared frame language with the Art gallery: 8px radius, same
        // border/hover-glow spec — only the lift motion stays Game-Dev-specific.
        background: hovered ? 'oklch(12% 0.05 290 / 0.95)' : 'oklch(9% 0.04 290 / 0.8)',
        border: `1px solid ${hovered ? accent : 'var(--purple-a2)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 4px 24px color-mix(in oklch, ${accent} 40%, transparent)` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
      }}>
      {/* Project image */}
      <div style={{
        height: 160,
        background: `linear-gradient(135deg, oklch(15% 0.08 ${280 + index * 20}) 0%, oklch(10% 0.06 ${300 + index * 15}) 100%)`,
        borderBottom: `1px solid oklch(55% 0.25 295 / 0.15)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {imgSrc && !loaded && <div className="art-thumb-skeleton"><div className="art-thumb-spinner" /></div>}
        {imgSrc && (
          <img src={imgSrc} alt={`${title} — ${studio}${badge ? `, ${badge}` : ''}`} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            display: 'block', opacity: loaded ? (hovered ? 1 : 0.85) : 0,
            transition: 'opacity 0.3s ease',
          }} />
        )}
        {badge && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <NeonBadge color={accent2}>{badge}</NeonBadge>
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, oklch(9% 0.04 290 / 0.85) 100%)`,
        }} />
      </div>
      <div style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{studio}</div>
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 17, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-dim)' }}>{desc}</div>
      </div>
    </div>
  );
}

