// ─── LOGO ───────────────────────────────────────────────────────────────────
// Live gradient mark, replacing the old raster PNG (bevelled, blurry at
// nav scale). Sun gradient stops match the hero's actual sun exactly.
function Logo({ height = 36 }) {
  const carlosRef = useRef(null);
  const hurtadoRef = useRef(null);
  const [carlosWidth, setCarlosWidth] = useState(null);

  useEffect(() => {
    if (!carlosRef.current || !hurtadoRef.current) return;
    const measure = () => {
      // HURTADO ends in "...D-O" — the O is HURTADO's own last letter, so
      // matching Carlos's width to Hurtado's puts the trailing S right above it.
      const startX = carlosRef.current.getBoundingClientRect().left;
      const hurtadoRight = hurtadoRef.current.getBoundingClientRect().right;
      // 90%, not 100% — visual kerning makes an exact width match read as
      // slightly overshooting past the O.
      setCarlosWidth((hurtadoRight - startX) * 0.9);
    };
    measure();
    // Space Grotesk may still be loading on first paint — re-measure once it's ready.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }, [height]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: height * 0.28 }}>
      <div style={{
        width: height * 0.88, height: height * 0.88, borderRadius: '50%', flexShrink: 0,
        background: 'radial-gradient(circle at 50% 35%, #fff5b0 0%, #ffcc66 35%, #ff9933 65%, #ff2d78 100%)',
        boxShadow: '0 0 12px rgba(255,45,120,0.5)',
        // Horizon cuts are real transparency (mask), not a drawn-on color —
        // shows whatever's behind the logo, not a fake dark overlay.
        // Only the lower two bands; nothing cut near the top of the disc.
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 61%, transparent 61%, transparent 72%, black 72%, black 79%, transparent 79%, transparent 90%, black 90%, black 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 61%, transparent 61%, transparent 72%, black 72%, black 79%, transparent 79%, transparent 90%, black 90%, black 100%)',
      }} />
      <span style={{
        fontFamily: 'Space Grotesk', whiteSpace: 'nowrap', display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: height * 0.03,
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(255,45,120,0.3))',
      }}>
        {/* Stacked nameplate, blocked-out letterform feel. CARLOS's letters
            spread to exactly Hurtado's measured width, so the trailing S
            lands right above the O that ends HURTADO. */}
        <span ref={carlosRef} style={{
          fontWeight: 700, fontSize: height * 0.24, textTransform: 'uppercase',
          color: 'var(--text)', lineHeight: 1,
          display: 'flex', justifyContent: 'space-between',
          width: carlosWidth != null ? carlosWidth : 'auto',
          letterSpacing: carlosWidth != null ? 0 : '0.3em',
        }}>
          {carlosWidth != null
            ? 'CARLOS'.split('').map((ch, i) => <span key={i}>{ch}</span>)
            : 'Carlos'}
        </span>
        <span ref={hurtadoRef} style={{
          fontWeight: 800, fontSize: height * 0.52, letterSpacing: '0.06em', textTransform: 'uppercase',
          background: 'linear-gradient(135deg, var(--pink), var(--orange))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1,
        }}>Hurtado</span>
      </span>
    </div>
  );
}

