// ─── ACCENT COLOR ───────────────────────────────────────────────────────────
function useAccent(accentColor) {
  return {
    accent: accentColor === 'cyan' ? 'var(--cyan)' : accentColor === 'orange' ? 'var(--orange)' : 'var(--pink)',
    accent2: accentColor === 'orange' ? 'var(--purple)' : 'var(--orange)',
  };
}


