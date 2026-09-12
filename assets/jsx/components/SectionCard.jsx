// ─── SECTION CARD WRAPPER ───────────────────────────────────────────────────
const SectionCard = React.forwardRef(function SectionCard({ children, style: extraStyle, corner1, corner2, className }, ref) {
  const accent = corner1;
  const accent2 = corner2;
  return (
    <div ref={ref} className={`section-card${className ? ' ' + className : ''}`} style={{
      background: 'radial-gradient(ellipse at center, oklch(5% 0.04 290 / 0.88) 0%, oklch(5% 0.04 290 / 0.6) 55%, oklch(5% 0.04 290 / 0.32) 100%)',
      backdropFilter: 'blur(24px)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '52px 60px',
      position: 'relative',
      boxShadow: '0 0 60px var(--purple-a12), inset 0 1px 0 oklch(100% 0 0 / 0.05)',
      ...extraStyle,
    }}>
      {/* Top-left corner */}
      <div style={{ position: 'absolute', top: -1, left: -1, pointerEvents: 'none' }}>
        <div style={{ width: 32, height: 32, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`, borderRadius: '10px 0 0 0' }} />
      </div>
      {/* Bottom-right corner */}
      <div style={{ position: 'absolute', bottom: -1, right: -1, pointerEvents: 'none' }}>
        <div style={{ width: 32, height: 32, borderBottom: `2px solid ${accent2}`, borderRight: `2px solid ${accent2}`, borderRadius: '0 0 10px 0' }} />
      </div>
      {children}
    </div>
  );
});

