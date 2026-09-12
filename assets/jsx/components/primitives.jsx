// ─── NEON BADGE ───────────────────────────────────────────────────────────────
function NeonBadge({ children, color = 'var(--pink)' }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 3,
      border: `1px solid ${color}`,
      color: color,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: `color-mix(in srgb, ${color} 8%, transparent)`,
      boxShadow: `0 0 8px color-mix(in srgb, ${color} 25%, transparent)`,
      fontFamily: 'Space Grotesk',
    }}>{children}</span>
  );
}

// ─── SECTION TAG ──────────────────────────────────────────────────────────────
// Monospace "terminal path" eyebrow — a signature type moment nodding at the
// engineer identity, sitting above each section's heading.
function SectionTag({ path, accent }) {
  return (
    <div style={{
      fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
      color: accent,
      marginBottom: 12,
    }}>
      <span style={{ color: 'var(--text-dim)' }}>~/</span>{path}<span className="section-tag-cursor" style={{ color: accent }}>_</span>
    </div>
  );
}

// ─── GLOWING DIVIDER ─────────────────────────────────────────────────────────
function GlowDivider({ color = 'var(--purple)' }) {
  return (
    <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, margin: '28px 0', opacity: 0.5 }} />
  );
}

