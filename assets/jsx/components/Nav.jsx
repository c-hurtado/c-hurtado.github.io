// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ activeSection, setActiveSection, accentColor }) {
  // Continuous 0-1 value instead of a binary "scrolled" flag, so the
  // transparent-to-opaque backdrop fades in gradually over the first 120px
  // of scroll rather than snapping in at a hard scrollY > 20 threshold.
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollProgress(Math.min(window.scrollY / 120, 1));
        ticking = false;
      });
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavClick = id => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'gamedev', label: 'Game Dev' },
    { id: 'awards', label: 'Awards' },
    { id: 'art', label: 'Art' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  const { accent } = useAccent(accentColor);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      padding: '0 40px',
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: `oklch(8% 0.04 290 / ${(scrollProgress * 0.92).toFixed(3)})`,
      backdropFilter: scrollProgress > 0 ? `blur(${(scrollProgress * 20).toFixed(1)}px)` : 'none',
      WebkitBackdropFilter: scrollProgress > 0 ? `blur(${(scrollProgress * 20).toFixed(1)}px)` : 'none',
      borderBottom: `1px solid oklch(55% 0.25 295 / ${(scrollProgress * 0.2).toFixed(3)})`,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Logo height={36} />
      </div>

      {/* Nav links */}
      <div className={`nav-links${menuOpen ? ' nav-links-open' : ''}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {navItems.map(item => (
          <a key={item.id} href={`#${item.id}`}
            onClick={() => handleNavClick(item.id)}
            style={{
              padding: '6px 18px',
              borderRadius: 4,
              fontFamily: 'DM Sans',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: activeSection === item.id ? accent : 'oklch(85% 0.02 280)',
              background: activeSection === item.id ? `var(--purple-a15)` : 'transparent',
              border: activeSection === item.id ? `1px solid color-mix(in oklch, ${accent} 40%, transparent)` : '1px solid transparent',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (activeSection !== item.id) { e.target.style.color = 'var(--text)'; }}}
            onMouseLeave={e => { if (activeSection !== item.id) { e.target.style.color = 'oklch(85% 0.02 280)'; }}}
          >{item.label}</a>
        ))}
      </div>

      {/* Mobile menu toggle — hidden on desktop, shown via the 768px media query */}
      <button
        className="nav-hamburger"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(v => !v)}
        style={{
          display: 'none', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, background: 'transparent', border: 'none',
          color: 'var(--text)', cursor: 'pointer', flexShrink: 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          {menuOpen ? (
            <>
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>
    </nav>
  );
}

