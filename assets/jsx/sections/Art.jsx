// ─── ART SECTION ─────────────────────────────────────────────────────────────
const ART_CATEGORIES_RAW = window.ART_CATEGORIES_RAW;
const ART_PREVIEW_COUNT = 6;

function ArtCategoryGrid({ cat, accent, isLast, onOpen }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = cat.images.length > ART_PREVIEW_COUNT;
  const visibleImages = expanded ? cat.images : cat.images.slice(0, ART_PREVIEW_COUNT);
  const headerRef = useRef(null);
  const wasExpanded = useRef(false);

  useEffect(() => {
    // Collapsing a large expanded grid can strand the viewport scrolled past
    // the now-much-shorter section — bring the category header back into view.
    if (wasExpanded.current && !expanded && headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    wasExpanded.current = expanded;
  }, [expanded]);

  return (
    <div style={{ marginBottom: isLast ? 0 : 44 }}>
      <div ref={headerRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, scrollMarginTop: 88 }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{cat.label}</h3>
        <span style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {cat.images.length} piece{cat.images.length === 1 ? '' : 's'}
        </span>
      </div>
      {/* Masonry via CSS columns — every piece keeps its true aspect ratio
          (no crop, no letterboxed mat space), unlike a fixed-aspect grid. */}
      <div className="art-thumb-grid" style={{ columns: '230px 3', columnGap: 16 }}>
        {visibleImages.map((src, i) => (
          <ArtThumb key={i} src={src} label={`${cat.label} piece ${i + 1} of ${cat.images.length}`} onClick={() => onOpen(i)} accent={accent} />
        ))}
      </div>
      {hasMore && (
        <button onClick={() => setExpanded(v => !v)} style={{
          display: 'flex', alignItems: 'center', gap: 7, margin: '20px auto 0', padding: '9px 22px',
          background: `color-mix(in oklch, ${accent} 12%, transparent)`,
          border: `1px solid color-mix(in oklch, ${accent} 55%, transparent)`, borderRadius: 999,
          color: accent, fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 700,
          letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `color-mix(in oklch, ${accent} 28%, transparent)`; e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = `color-mix(in oklch, ${accent} 12%, transparent)`; e.currentTarget.style.borderColor = `color-mix(in oklch, ${accent} 55%, transparent)`; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {expanded ? 'Show less' : `Show all ${cat.images.length}`}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
      )}
    </div>
  );
}

function ArtSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);
  const [lightbox, setLightbox] = useState(null); // { cat: number, i: number }
  const [lightboxLoaded, setLightboxLoaded] = useState(null); // src of the last fully-loaded lightbox image
  const trapRef = useFocusTrap(lightbox !== null);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeCategory = lightbox ? ART_CATEGORIES_RAW[lightbox.cat] : null;
  const activeImages = activeCategory ? activeCategory.images : [];

  return (
    <section id="art" data-screen-label="05 Art" style={{ padding: '100px 8% 80px', maxWidth: 1200, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--orange)" corner2="var(--purple)">
        <div style={{ marginBottom: 48 }}>
          <SectionTag path="art" accent={accent} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Art</h2>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 600, marginLeft: 19 }}>
            Oil paintings and digital paintings — created outside of engineering.
          </p>
        </div>

        {ART_CATEGORIES_RAW.map((cat, ci) => cat.images.length === 0 ? null : (
          <React.Fragment key={cat.key}>
            {ci > 0 && <GlowDivider color={accent} />}
            <ArtCategoryGrid
              cat={cat} accent={accent}
              isLast={ci === ART_CATEGORIES_RAW.length - 1}
              onOpen={i => setLightbox({ cat: ci, i })}
            />
          </React.Fragment>
        ))}
      </SectionCard></Reveal>

      {lightbox !== null && (
        <div ref={trapRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${activeCategory.label} image viewer`} onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, zIndex: 900,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}>
          <button onClick={e => { e.stopPropagation(); setLightbox(l => ({ cat: l.cat, i: (l.i - 1 + activeImages.length) % activeImages.length })); }} style={{
            position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'oklch(10% 0.04 290 / 0.8)', border: `1px solid color-mix(in oklch, ${accent} 50%, transparent)`,
            color: accent, width: 48, height: 48, borderRadius: 6, cursor: 'pointer',
            fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>‹</button>
          {lightboxLoaded !== activeImages[lightbox.i] && (
            <div className="art-lightbox-spinner" style={{ '--accent-spin': accent }} onClick={e => e.stopPropagation()} />
          )}
          <img src={activeImages[lightbox.i]} onClick={e => e.stopPropagation()} onLoad={() => setLightboxLoaded(activeImages[lightbox.i])} style={{
            maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 6,
            boxShadow: `0 0 40px color-mix(in oklch, ${accent} 40%, transparent)`,
            display: lightboxLoaded === activeImages[lightbox.i] ? 'block' : 'none',
          }} />
          <button onClick={e => { e.stopPropagation(); setLightbox(l => ({ cat: l.cat, i: (l.i + 1) % activeImages.length })); }} style={{
            position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'oklch(10% 0.04 290 / 0.8)', border: `1px solid color-mix(in oklch, ${accent} 50%, transparent)`,
            color: accent, width: 48, height: 48, borderRadius: 6, cursor: 'pointer',
            fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>›</button>
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: 20, right: 20,
            background: 'oklch(10% 0.04 290 / 0.8)', border: `1px solid color-mix(in oklch, ${accent} 50%, transparent)`,
            color: accent, width: 40, height: 40, borderRadius: 6, cursor: 'pointer',
            fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            fontSize: 13, color: 'var(--text-dim)', fontFamily: 'Space Grotesk', textAlign: 'center' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{activeCategory.label}</div>
            {lightbox.i + 1} / {activeImages.length}
          </div>
        </div>
      )}
    </section>
  );
}

function ArtThumb({ src, onClick, accent, label }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      role="button" tabIndex={0} aria-label={label}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      // Shared frame language with the Game Dev cards: 8px radius, same
      // border/hover-glow spec. Natural aspect ratio (no fixed box) — the
      // masonry column layout gives each piece its own true proportions.
      breakInside: 'avoid', marginBottom: 16,
      overflow: 'hidden', borderRadius: 8, cursor: 'pointer',
      border: `1px solid ${hovered ? accent : 'var(--purple-a2)'}`,
      transition: 'all 0.2s ease',
      transform: hovered ? 'scale(1.02)' : 'scale(1)',
      boxShadow: hovered ? `0 4px 24px color-mix(in oklch, ${accent} 40%, transparent)` : 'none',
      background: 'linear-gradient(160deg, var(--bg2) 0%, var(--bg) 100%)',
      position: 'relative',
      minHeight: loaded ? 0 : 160,
    }}>
      {!loaded && <div className="art-thumb-skeleton"><div className="art-thumb-spinner" /></div>}
      <img src={src} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} style={{ width: '100%', height: 'auto', display: 'block',
        transition: 'opacity 0.3s', opacity: loaded ? (hovered ? 1 : 0.85) : 0 }} />
    </div>
  );
}

