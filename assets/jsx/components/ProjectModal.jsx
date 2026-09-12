// ─── PROJECT MODAL CONTENT HELPERS ───────────────────────────────────────────
function ModalP({ children }) {
  return <p style={{ margin: '0 0 14px' }}>{children}</p>;
}
function ModalH4({ accent, children }) {
  return <h4 style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 600, color: accent, marginTop: 24, marginBottom: 10, letterSpacing: '0.02em' }}>{children}</h4>;
}
function ModalH5({ children }) {
  return <h5 style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600, color: 'var(--text)', marginTop: 16, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{children}</h5>;
}
function ModalList({ items }) {
  return (
    <ul style={{ margin: '0 0 4px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => <li key={i} style={{ fontSize: 14, lineHeight: 1.7 }}>{item}</li>)}
    </ul>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const trapRef = useFocusTrap(!!project);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 950,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '48px 20px', overflowY: 'auto',
    }}>
      <div ref={trapRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={project.title} onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 780,
        background: 'oklch(8% 0.04 290 / 0.98)',
        border: `1px solid color-mix(in oklch, ${accent} 40%, transparent)`,
        borderRadius: 12,
        boxShadow: `0 0 80px oklch(55% 0.25 295 / 0.25)`,
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, zIndex: 1,
          background: 'oklch(10% 0.04 290 / 0.85)', border: `1px solid color-mix(in oklch, ${accent} 50%, transparent)`,
          color: accent, width: 36, height: 36, borderRadius: 6, cursor: 'pointer',
          fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        {project.img && (
          <div style={{ height: 220, borderRadius: '12px 12px 0 0', overflow: 'hidden', position: 'relative' }}>
            {!heroLoaded && <div className="art-thumb-skeleton"><div className="art-thumb-spinner" /></div>}
            <img src={project.img} alt={`${project.title} — ${project.studio}${project.subtitle ? `. ${project.subtitle}` : ''}`} decoding="async" onLoad={() => setHeroLoaded(true)} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: heroLoaded ? 1 : 0, transition: 'opacity 0.3s ease',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, oklch(8% 0.04 290 / 0.98) 100%)` }} />
          </div>
        )}

        <div className="project-modal-body" style={{ padding: '32px 40px 40px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <NeonBadge color={accent}>{project.studio}</NeonBadge>
            {project.badge && <NeonBadge color={accent2}>{project.badge}</NeonBadge>}
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, marginBottom: project.subtitle ? 8 : 20 }}>
            {project.title}
          </h2>
          {project.subtitle && (
            <p style={{ fontSize: 15, color: accent, fontFamily: 'Space Grotesk', marginBottom: 24 }}>{project.subtitle}</p>
          )}

          {project.videoId && (
            <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: 28, borderRadius: 8, overflow: 'hidden', border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)` }}>
              <iframe
                src={`https://www.youtube.com/embed/${project.videoId}`}
                title={project.title}
                frameBorder="0"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          )}

          <div style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-dim)' }}>
            {project.details}
          </div>
        </div>
      </div>
    </div>
  );
}

