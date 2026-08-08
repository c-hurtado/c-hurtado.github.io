
 
const { useState, useEffect, useRef, useMemo } = React;

// ─── ACCENT COLOR ───────────────────────────────────────────────────────────
function useAccent(accentColor) {
  return {
    accent: accentColor === 'cyan' ? 'var(--cyan)' : accentColor === 'orange' ? 'var(--orange)' : 'var(--pink)',
    accent2: accentColor === 'orange' ? 'var(--purple)' : 'var(--orange)',
  };
}


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

// ─── SCROLL PROGRESS ────────────────────────────────────────────────────────
function ScrollProgressBar({ accentColor }) {
  const [progress, setProgress] = useState(0);
  const { accent, accent2 } = useAccent(accentColor);
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
        ticking = false;
      });
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 600, pointerEvents: 'none' }}>
      <div style={{
        height: '100%', width: `${(progress * 100).toFixed(2)}%`,
        background: `linear-gradient(90deg, ${accent}, ${accent2})`,
        boxShadow: `0 0 8px ${accent}, 0 0 16px color-mix(in oklch, ${accent2} 80%, transparent)`,
      }} />
    </div>
  );
}

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

// ─── FOCUS TRAP ─────────────────────────────────────────────────────────────
// Keeps Tab/Shift+Tab cycling inside an open modal instead of leaking focus to
// the page behind it, and restores focus to whatever triggered it on close.
function useFocusTrap(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const container = ref.current;
    const previouslyFocused = document.activeElement;
    const focusableSelector = 'a[href], button:not([disabled]), [role="button"], [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(container.querySelectorAll(focusableSelector));

    (getFocusable()[0] || container).focus();

    const onKeyDown = e => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    container.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [active]);
  return ref;
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function Reveal({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(el);
      }
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const child = React.Children.only(children);
  return React.cloneElement(child, {
    ref,
    className: `${child.props.className || ''} reveal${visible ? ' reveal-visible' : ''}`.trim(),
  });
}

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
      background: `${color}15`,
      boxShadow: `0 0 8px ${color}40`,
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

// ─── HOME SECTION ─────────────────────────────────────────────────────────────
function HomeSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <section id="home" data-screen-label="01 Home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 80px',
      position: 'relative',
    }}>
      <Reveal><div style={{
        width: '100%', maxWidth: 700,
        background: 'var(--card-bg)',
        backdropFilter: 'blur(24px)',
        border: `1px solid var(--border)`,
        borderRadius: 12,
        padding: '48px 52px',
        boxShadow: `0 0 60px var(--purple-a15), 0 0 120px oklch(62% 0.28 340 / 0.08), inset 0 1px 0 oklch(100% 0 0 / 0.06)`,
        position: 'relative',
      }}>
        {/* Corner accent */}
        <div style={{ position: 'absolute', top: -1, left: -1, width: 60, height: 60, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0,
            borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`, width: 30, height: 30, borderRadius: '10px 0 0 0' }} />
        </div>
        <div style={{ position: 'absolute', bottom: -1, right: -1, width: 60, height: 60, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0,
            borderBottom: `2px solid ${accent2}`, borderRight: `2px solid ${accent2}`, width: 30, height: 30, borderRadius: '0 0 10px 0' }} />
        </div>

        {/* Avatar + greeting */}
        <div className="home-card-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 32 }}>
          <AvatarCircle size={100} accentColor={accentColor} />
          <div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              <NeonBadge color={accent}>Lead Engineer</NeonBadge>
              <NeonBadge color="var(--purple)">Engineering Manager</NeonBadge>
              <NeonBadge color="var(--orange)">Hobbyist Artist</NeonBadge>
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(32px, 4.4vw, 46px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Hi, I'm{' '}
              <span style={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Carlos Hurtado.</span>
            </h1>
            <div style={{ marginTop: 6, fontSize: 13, color: 'var(--text-dim)' }}>SF Bay Area</div>
          </div>
        </div>

        <GlowDivider />

        {/* Single sharpest credential up top, not buried after 3 paragraphs — CTA sits right below it. */}
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text)', marginBottom: 24 }}>
          15+ years shipping award-winning VR games. Most recently <span style={{ fontWeight: 600 }}>Technical Lead Manager</span> at{' '}
          <span style={{ color: 'var(--text)' }}>Sanzaru Games (Oculus Studios · Meta)</span>, where{' '}
          <a href="#gamedev" style={{ color: accent, fontWeight: 600 }}>Asgard's Wrath 2</a> shipped to a perfect{' '}
          <a href="https://www.ign.com/articles/asgards-wrath-2-review" target="_blank" style={{ color: accent2, fontWeight: 700 }}>10/10 from IGN</a>.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
          <SocialLinks accent={accent} />
          <a href="/assets/Carlos_Hurtado_Resume.pdf" target="_blank" style={{
            padding: '10px 24px', borderRadius: 4,
            background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            color: '#fff', fontWeight: 600, fontSize: 14,
            fontFamily: 'Space Grotesk', letterSpacing: '0.04em',
            boxShadow: `0 4px 20px color-mix(in oklch, ${accent} 40%, transparent)`,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>

        <GlowDivider />

        {/* Secondary detail — the fuller narrative already lives in About, so this stays short. */}
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-dim)', marginTop: 20 }}>
          <span style={{ color: 'var(--text)' }}>Unreal Engine 4 & 5</span>, performance optimization, and high-scale gameplay systems in <span style={{ color: 'var(--text)' }}>C++</span> are where I live day to day — but outside of work I'm a <a href="#art" style={{ color: accent, fontWeight: 600 }}>hobbyist artist</a>, and I'm always tinkering with some new <a href="#about" style={{ color: accent, fontWeight: 600 }}>productivity system</a>.
        </p>
      </div></Reveal>
    </section>
  );
}

// Assembled at runtime instead of a literal address in the source — cuts
// down on basic regex-based email-harvesting bots scraping the page/bundle.
const CONTACT_EMAIL = ['carloshurtado', 'gmail.com'].join('@');

// ─── SOCIAL LINKS ─────────────────────────────────────────────────────────────
function SocialLinks({ accent, style: extraStyle }) {
  const links = [
    { href: `mailto:${CONTACT_EMAIL}`, label: 'Email', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 L12,13 L2,6' },
    { href: 'http://linkedin.com/in/carloshurtado', label: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
    { href: 'http://github.com/c-hurtado', label: 'GitHub', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
    { href: 'http://twitter.com/carlos_hurtado', label: 'Twitter/X', icon: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
    { href: 'http://instagram.com/chaoticbrain', label: 'Instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z' },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', ...extraStyle }}>
      {links.map(link => (
        <a key={link.label} href={link.href} target="_blank" title={link.label} style={{
          width: 36, height: 36, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--purple-a25)',
          color: 'var(--text-dim)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = `color-mix(in oklch, ${accent} 60%, transparent)`; e.currentTarget.style.background = `color-mix(in oklch, ${accent} 10%, transparent)`; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--purple-a25)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={link.icon} />
          </svg>
        </a>
      ))}
    </div>
  );
}

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

// ─── GAME DEV SECTION ─────────────────────────────────────────────────────────
// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
const TOOLS_I_USE = [
  { category: 'Terminal', items: [
    { name: 'PowerShell', url: 'https://learn.microsoft.com/powershell/scripting/overview' },
    { name: 'oh-my-posh', url: 'https://ohmyposh.dev/' },
    { name: 'eza', url: 'https://eza.rocks/' },
    { name: 'yt-dlp', url: 'https://github.com/yt-dlp/yt-dlp' },
    { name: 'Winget', url: 'https://learn.microsoft.com/windows/package-manager/winget/' },
  ] },
  { category: 'Windows Customization', items: [
    { name: 'PowerToys', url: 'https://learn.microsoft.com/windows/powertoys/' },
    { name: 'Command Palette', url: 'https://learn.microsoft.com/windows/powertoys/command-palette/overview' },
    { name: 'Windhawk', url: 'https://windhawk.eu/' },
    { name: 'Wintoys', url: 'https://apps.microsoft.com/detail/9p8ltpgcbzxd' },
  ] },
  { category: 'Coding', items: [
    { name: 'VS Code', url: 'https://code.visualstudio.com/' },
    { name: 'Visual Studio 2022', url: 'https://visualstudio.microsoft.com/vs/' },
    { name: 'Claude Code', url: 'https://claude.com/claude-code' },
    { name: 'GitHub', url: 'https://github.com/' },
    { name: 'Perforce', url: 'https://www.perforce.com/' },
    { name: 'Unreal Engine', url: 'https://www.unrealengine.com/' },
  ] },
  { category: 'Productivity', items: [
    { name: 'Google Tasks', url: 'https://tasks.google.com/' },
    { name: 'Google Keep', url: 'https://keep.google.com/' },
    { name: 'gtsync', url: 'https://apps.apple.com/us/app/gtsync-sync-tasks-reminders/id6761292407' },
    { name: 'Gemini', url: 'https://gemini.google.com/' },
    { name: 'Blip', url: 'https://blip.net/' },
    { name: 'Fantastical', url: 'https://flexibits.com/fantastical' },
  ] },
  { category: 'Entertainment & Feeds', items: [
    { name: 'Libby', url: 'https://libbyapp.com/' },
    { name: 'Overcast', url: 'https://overcast.fm/' },
    { name: 'Feedly', url: 'https://feedly.com/' },
  ] },
  { category: 'Art', items: [
    { name: 'Procreate', url: 'https://procreate.com/' },
    { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html' },
  ] },
];

function AboutSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <section id="about" data-screen-label="02 About" style={{ padding: '100px 8% 80px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--purple)" corner2="var(--cyan)">
        <div style={{ marginBottom: 40 }}>
          <SectionTag path="about" accent={accent} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>About Me</h2>
          </div>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Oh, hello! I'm <span style={{ color: 'var(--text)', fontWeight: 600 }}>Carlos</span> — nice to meet you. I grew up in <span style={{ color: 'var(--text)' }}>Chile</span> and moved to the United States chasing a career in entertainment technology so I could make cool things. I'm a U.S. citizen now, and I've been making games professionally since <span style={{ color: 'var(--text)' }}>2008</span>.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              I'm passionate about making video games — and about leadership: mentoring engineers, supporting their careers, and building teams that consistently ship high-quality work.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Most recently I was a <span style={{ color: 'var(--text)' }}>Technical Lead Manager</span> at <a href="http://www.sanzarugames.com" target="_blank" style={{ color: accent }}>Sanzaru Games</a> (a Meta studio), where I shipped several award-winning VR titles including <a href="#gamedev" style={{ color: accent }}>Asgard's Wrath</a> and <a href="#gamedev" style={{ color: accent }}>Asgard's Wrath 2</a> for the Oculus Rift and Quest 2/3.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Outside of engineering, I paint — mostly oil, sometimes digital (there's a whole <a href="#art" style={{ color: accent }}>gallery</a> of it if you scroll down). I'm also a little obsessed with productivity systems — ask me about whatever one I'm currently rebuilding my life around.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
              I live in <span style={{ color: 'var(--text)' }}>San Mateo</span>, in the San Francisco Bay Area, with my wife and kid.
            </p>
          </div>

          <div style={{
            background: 'oklch(9% 0.04 290 / 0.5)',
            border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)`,
            borderRadius: 10,
            padding: '28px 30px',
          }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600, color: accent, marginBottom: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Master of Entertainment Technology</div>
                <a href="http://www.cmu.edu" target="_blank" style={{ fontSize: 13, color: accent2 }}>Carnegie Mellon University</a>
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>M.S. & B.S. Computer Science & Engineering</div>
                <a href="http://www.uchile.cl" target="_blank" style={{ fontSize: 13, color: accent2 }}>Universidad de Chile</a>
              </div>
            </div>
            <div style={{ height: 1, background: `linear-gradient(90deg, color-mix(in oklch, ${accent} 40%, transparent), transparent)`, margin: '24px 0' }} />
            <div style={{ fontSize: 13, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Previously at</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Electronic Arts', 'Bigpoint', 'Sanzaru Games', 'Meta'].map(co => (
                <span key={co} style={{
                  padding: '6px 12px', borderRadius: 4,
                  border: '1px solid var(--purple-a3)',
                  background: 'oklch(12% 0.05 290 / 0.5)',
                  fontSize: 12, color: 'var(--text)', fontFamily: 'Space Grotesk',
                }}>{co}</span>
              ))}
            </div>
            <a href="/assets/Carlos_Hurtado_Resume.pdf" target="_blank" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 20, fontSize: 13, fontWeight: 600, color: accent,
              fontFamily: 'Space Grotesk', letterSpacing: '0.02em',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </a>
          </div>
        </div>

        <GlowDivider color={accent} />

        {/* Full-width, not squeezed into the narrow sidebar column — six
            categories stacked in a 1fr column left as much empty space
            below the bio text as the whole rest of the card. */}
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600, color: accent, marginBottom: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tools I Use</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 40px' }}>
            {TOOLS_I_USE.map(group => (
              <div key={group.category} style={{ minWidth: 200 }}>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>{group.category}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.items.map(item => (
                    <a key={item.name} href={item.url} target="_blank" rel="noopener" style={{
                      padding: '5px 10px', borderRadius: 4,
                      border: '1px solid var(--purple-a3)',
                      background: 'oklch(12% 0.05 290 / 0.5)',
                      fontSize: 12, color: 'var(--text)', fontFamily: 'Space Grotesk',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--purple-a3)'; e.currentTarget.style.color = 'var(--text)'; }}
                    >{item.name}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard></Reveal>
    </section>
  );
}

// ─── GAME DEV SECTION ────────────────────────────────────────────────────────
function GameDevSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);
  const [activeProject, setActiveProject] = useState(null);

  // useMemo — this array's `details` fields hold substantial JSX (ModalP/ModalH4/
  // ModalList trees). Without memoizing, it gets rebuilt from scratch every time
  // GameDevSection re-renders, including every time activeProject changes (i.e.
  // every project-modal open/close), for zero visual benefit.
  const projects = useMemo(() => [
    {
      title: 'Unannounced Big IP VR Project', studio: 'Sanzaru Games · Meta', badge: 'In Dev',
      desc: 'Currently in development — a major VR title for a well-known IP. Technical leadership across full production lifecycle.',
      href: 'https://www.carloshurtado.com/gameDevProjects/Unannounced/', img: '/assets/img/projects/Meta-Quest-3-Dark.jpg',
      subtitle: 'AAA VR title under NDA — Technical Lead Manager at Sanzaru Games / Meta Reality Labs',
      details: (
        <>
          <ModalP>For this project I was the technical lead manager for the gameplay systems group. I managed 5 people, working on systems, missions, architecture and infrastructure. The game was being developed in Unreal 5 and C++.</ModalP>
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Interviewed engineers and provided mentorship.',
            'Provided performance reviews, and biweekly 1:1s directed to grow skills and improve career.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalH5>Progression and Level Building</ModalH5>
          <ModalList items={[
            'Created a new visual flow based progression system, with save interdependencies.',
            'Created a Story Graph in Unreal, allowing for shortcuts to any asset, script, and progression point in the game.',
            'Architected, with a Senior Engineer, a Level Manager to replace Level Blueprints — level independent, message based, and compatible with World Partition.',
          ]} />
          <ModalH5>Gameplay</ModalH5>
          <ModalList items={[
            'Created a visual camera system for cinematic visualization of the character.',
            'Created a Holdable spawner for placing grabbables in the world, with configurations for respawning, despawning, baked lighting, and async asset loading.',
          ]} />
          <ModalH5>Tools and Acceleration</ModalH5>
          <ModalList items={[
            'Created scriptable tools in UE5 to accelerate the narrative team and level designers, letting them create interdependent assets in one click.',
            'Created interactive Unreal tools to draw special splines for traversal purposes in the editor.',
            'Created a visual "state" HUD system to visualize state, narrative, progression, and location to debug problems fast.',
          ]} />
          <ModalH5>Optimization</ModalH5>
          <ModalList items={[
            'Worked on supporting World Partition and Level Streaming, fixing level instancing compatibility for cinematic assets.',
            'Optimized CPU cost using Unreal Insights, fixing or suggesting removal of unnecessary costs.',
          ]} />
        </>
      ),
    },
    {
      title: "Asgard's Wrath 2", studio: 'Sanzaru Games · Meta', badge: '10/10 IGN',
      desc: 'Award-winning VR RPG. Contributed as Technical Lead to flagship systems, performance, and architecture.',
      href: 'https://www.carloshurtado.com/gameDevProjects/AsgardsWrath2/', img: '/assets/img/projects/asgards-wrath-2.png',
      subtitle: 'AAA VR action RPG shipped on Meta Quest 2/3 — Lead Engineer at Sanzaru Games / Meta Reality Labs',
      videoId: '3SYJeM_LaZ0',
      details: (
        <>
          <ModalP>For this project I was a Lead Engineer for the gameplay systems team, focusing on performance, gameplay, side missions, save, questing, milestones and many other features. This project was done in Unreal 4 and C++.</ModalP>
          <ModalP>Asgard's Wrath 2 garnered significant acclaim and numerous awards in 2024, including XR Game of the Year at the AIXR Awards, winning multiple honors at the NYX Game Awards (like Best Audio Design & Game Design), and being named Immersive Reality Game of the Year at the DICE Awards.</ModalP>
          <ModalP>
            Asgard's Wrath 2 received a score of{' '}
            <a href="https://www.ign.com/articles/asgards-wrath-2-review" target="_blank" style={{ color: accent, fontWeight: 600 }}>10/10 from IGN</a>{' '}
            and has a current{' '}
            <a href="https://www.metacritic.com/game/asgards-wrath-2/" target="_blank" style={{ color: accent, fontWeight: 600 }}>Metacritic</a>{' '}
            score of 86.
          </ModalP>
          <img src="/assets/img/projects/masterpiece.PNG" alt="IGN 10/10 score" loading="lazy" decoding="async" style={{ width: '100%', borderRadius: 8, marginBottom: 20, border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)` }} />
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Provided interviews, 1:1s and mentorship.',
            'Collaborated with directors and cross functional partners to deliver high quality content.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalH5>World Management & Optimization</ModalH5>
          <ModalList items={[
            'Implemented an optimization system based on player location that optimizes ticks and reduces draw calls, reducing tick costs to a minimum based on "rooms." Added visualization and editor tooling.',
            'Continued implementing optimized Octree-based triggers to replace Unreal Overlaps.',
            'Set up a Time of Day management system to deal with lighting scenarios.',
            'Optimized several systems, including deferred checks and load-balancing.',
          ]} />
          <ModalH5>Progression</ModalH5>
          <ModalList items={[
            'Implemented a quest system and supported others like inventory and milestones.',
            'Set up a state condition system to allow for progression-based actions.',
            'Set up a Travel Subsystem to deal with locations, teleportations, and player travel (from reloads, or from the map).',
          ]} />
          <ModalH5>Gameplay Features</ModalH5>
          <ModalList items={[
            'Implemented a Waterworks puzzle, requiring the player to place different pieces to connect water.',
            'Implemented an enemy spawner sequencer for spawning waves, with different state-driven configurations for combat.',
            'Supported a graph-based waypoint system to guide the player to the next location.',
            'Added debug systems to change and view tuning variables in-game.',
            'Worked on the onramp gameplay and new user experience.',
          ]} />
          <ModalH5>Localization and Entitlements</ModalH5>
          <ModalList items={[
            'Implemented localization scripts and automation.',
            'Implemented achievements and entitlements.',
          ]} />
        </>
      ),
    },
    {
      title: "Asgard's Wrath", studio: 'Sanzaru Games',
      desc: 'VR action-RPG — predecessor to the award-winning sequel. Systems engineering and technical leadership.',
      href: 'https://www.carloshurtado.com/gameDevProjects/AsgardsWrath/', img: '/assets/img/projects/asgards-wrath.jpg',
      subtitle: '30+ hour VR Action RPG designed from the ground up for VR',
      videoId: 'd5a4nWtbVyY',
      details: (
        <>
          <ModalP>I was one of the two lead engineers on this project — a 30+ hour VR Action RPG designed from the ground up for VR. Published by Oculus, this game was nominated for best VR game of the year by multiple outlets including DICE and The Game Awards. I joined late in the project, as I was leading Marvel Powers United VR at the time.</ModalP>
          <ModalList items={[
            'The Game Awards 2019: Nominated for Best VR/AR Game.',
            'DICE Awards (2020): Nominated for Immersive Reality Game of the Year & Technical Achievement.',
            'NAVGTR Awards (2020): Nominated for Control Design, VR & Sound Mixing in VR.',
            "IGN: Won People's Choice Awards for Best VR Game & PC Exclusive Game.",
            'Chosen by Forbes as Best VR game of the year.',
          ]} />
          <ModalP>It was developed in Unreal Engine and C++, and I led a team of 9 engineers as well as building some systems myself.</ModalP>
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Provided interviews, 1:1s and mentorship.',
            'Collaborated with directors and cross functional partners to deliver high quality content.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalList items={[
            'Implemented several features including cinematic improvements, lightweight triggers, and comfort features.',
          ]} />
        </>
      ),
    },
    {
      title: 'Marvel Powers United VR', studio: 'Sanzaru Games',
      desc: 'Co-op VR brawler featuring Marvel superheroes. Multi-player systems, gameplay engineering.',
      href: 'https://www.carloshurtado.com/gameDevProjects/MarvelPowersUnited/', img: '/assets/img/projects/marvelpowersunited.jpg',
      subtitle: '4-player networked co-op Arena VR game',
      videoId: 'YO_gz5l7ZB4',
      details: (
        <>
          <ModalP>I co-led this project with the Director of Technology. Marvel Powers United is a 4-player networked co-op Arena VR game — you and your friends fight against AI enemies as Marvel heroes.</ModalP>
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Provided interviews, 1:1s and mentorship.',
            'Collaborated with directors and cross functional partners to deliver high quality content.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalList items={[
            'Worked on several character implementations, including Crystal and Black Bolt.',
            'Set up leaping movement systems and fight mode to manage state transitions during melee combat.',
            'Set up a Marvel Buff system using actor components.',
            'Optimized net-weapon ticks so components only update when being fired.',
          ]} />
        </>
      ),
    },
    {
      title: 'VR Sports Challenge', studio: 'Sanzaru Games',
      desc: 'Multi-sport VR experience. Core gameplay and physics systems engineering.',
      href: 'https://www.carloshurtado.com/gameDevProjects/VrSportsChallenge/', img: '/assets/img/projects/vr-sports-challenge.jpg',
      subtitle: 'Multi-sport VR title for the Oculus Touch launch',
      videoId: 'xAvzIff_PCg',
      details: (
        <ModalP>VR Sports Challenge is a sports-based VR title featuring Football, Baseball, Basketball, and Hockey. It shipped alongside the Oculus Touch controllers at launch and was published by Oculus. I became lead engineer toward the end of the project.</ModalP>
      ),
    },
    {
      title: 'Dark Manor', studio: 'Sanzaru Games · Big Fish Games',
      desc: 'Casual hidden-object mobile game. Built with a 2-person engineering team from the ground up.',
      href: 'https://www.carloshurtado.com/gameDevProjects/DarkManor/', img: '/assets/img/projects/darkmanor.jpg',
      subtitle: 'Casual hidden-object game for PC and iOS',
      details: (
        <>
          <ModalP>I started at Sanzaru (developers of Sly Cooper 4) as part of the very small mobile group. In a team of just 2 engineers, we built a casual hidden-object game for publisher Big Fish Games.</ModalP>
          <ModalP>The project was a cross-platform PC and iOS game, built on a custom engine from Sanzaru. I also built customer service websites to track and adjust live tuning while the game was running.</ModalP>
        </>
      ),
    },
    {
      title: 'Uridium Wars', studio: 'Bigpoint',
      desc: 'Space-faring MMO built in Flash + PHP for Facebook. Took on a large-scale real-time MMO codebase.',
      href: 'https://www.carloshurtado.com/gameDevProjects/UridiumWars/', img: '/assets/img/projects/uridiumwars.png',
      subtitle: 'Space-faring MMO for the Facebook platform',
      details: (
        <ModalP>Uridium Wars was a space-faring MMO built in Flash + PHP for the Facebook platform — a take on a different game called Dark Orbit.</ModalP>
      ),
    },
    {
      title: 'Sims 3 Expansion Packs', studio: 'Electronic Arts · Maxis',
      desc: 'Shipped 3 expansion packs (Late Night, Generations, Pets) and multiple stuff packs on 6-month cycles.',
      href: 'https://www.carloshurtado.com/gameDevProjects/Sims3ExpansionPacks/', img: '/assets/img/projects/sims.png',
      subtitle: '3 expansion packs shipped on 6-month cycles',
      details: (
        <>
          <ModalP>At Electronic Arts, I was a gameplay engineer at Maxis Studios. As my first job out of grad school, I worked on and published 3 expansion packs and multiple stuff packs, each on a 6-month development cycle.</ModalP>
          <ModalP>I worked on Sims 3: Late Night, Sims 3: Generations, and Sims 3: Pets.</ModalP>
        </>
      ),
    },
  ], []);

  const featuredProject = projects.find(p => p.title === "Asgard's Wrath 2");
  const restProjects = projects.filter(p => p !== featuredProject);

  return (
    <section id="gamedev" data-screen-label="03 Game Dev" style={{ padding: '100px 8% 80px', maxWidth: 1200, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--cyan)" corner2="var(--pink)" style={{ padding: '52px 52px' }}>
      <div style={{ marginBottom: 56 }}>
        <SectionTag path="game-dev" accent={accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Game Development</h2>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 600, marginLeft: 19 }}>
          16+ years shipping games across VR, mobile, and PC. From EA to Meta-backed studios.
        </p>
      </div>
      {featuredProject && (
        <FeaturedProjectCard project={featuredProject} accentColor={accentColor} onOpen={() => setActiveProject(featuredProject)} />
      )}
      <div className="gamedev-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {restProjects.map((p, i) => (
          <ProjectCard key={p.title} {...p} accentColor={accentColor} index={i} onOpen={() => setActiveProject(p)} />
        ))}
      </div>
      </SectionCard></Reveal>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} accentColor={accentColor} />
      )}
    </section>
  );
}

// ─── AWARDS SECTION ───────────────────────────────────────────────────────────
const AWARDS_BY_GAME = [
  {
    game: "Asgard's Wrath 2",
    year: '2024',
    wins: [
      { org: 'AIXR Awards', category: 'XR Game of the Year', logo: null },
      { org: 'D.I.C.E. Awards', category: 'Immersive Reality Game of the Year', logo: '/assets/img/awards/dice-aias-logo.png', invert: true },
      { org: 'Road to VR', category: 'Quest Game of the Year', logo: '/assets/img/awards/road-to-vr-logo.png' },
      { org: 'NYX Game Awards', category: '29 total wins, incl. Gold for Best Audio Design, Best Innovation, Art Direction, Game Design & Narrative', logo: '/assets/img/awards/nyx-awards-logo.png', invert: true },
      { org: 'The Webby Awards', category: 'Best Narrative Experience, Game Design & Metaverse', logo: '/assets/img/awards/webby-awards-logo.png', invert: true },
      { org: 'NAVGTR Awards', category: 'Best Direction in VR', logo: '/assets/img/awards/navgtr-logo.png' },
      { org: 'Telly Awards', category: 'Bronze — Art Direction and Use of Animation', logo: '/assets/img/awards/telly-awards-bronze.png' },
    ],
  },
  {
    game: "Asgard's Wrath",
    year: '2019–2020',
    wins: [
      { org: 'D.I.C.E. Awards', category: 'Immersive Reality Technical Achievement', logo: '/assets/img/awards/dice-aias-logo.png', invert: true },
      { org: 'Road to VR', category: 'Game of the Year', logo: '/assets/img/awards/road-to-vr-logo.png' },
      { org: 'IGN', category: 'Best VR Game', logo: '/assets/img/awards/ign-logo.svg', invert: true },
    ],
  },
];

const AWARD_NOMINATIONS = [
  { org: 'NAVGTR Awards', category: 'Nominee — Control Design (VR) & Sound Mixing', game: "Asgard's Wrath", year: '2020', logo: '/assets/img/awards/navgtr-logo.png' },
];

function AwardBadge({ org, category, logo, accent, muted, invert }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10,
      padding: '18px 16px', borderRadius: 8,
      background: 'oklch(9% 0.04 290 / 0.5)',
      border: `1px solid ${muted ? 'var(--purple-a15)' : 'var(--purple-a2)'}`,
      opacity: muted ? 0.7 : 1,
    }}>
      <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {logo ? (
          <img src={logo} alt={`${org} logo`} style={{
            height: '100%', maxWidth: 120, width: 'auto', objectFit: 'contain', display: 'block',
            filter: invert ? 'grayscale(1) invert(1) brightness(1.6)' : 'none',
          }} />
        ) : (
          <span style={{
            fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
            color: accent, border: `1px solid color-mix(in oklch, ${accent} 60%, transparent)`, borderRadius: 4, padding: '4px 10px',
          }}>{org}</span>
        )}
      </div>
      <div>
        {logo && <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 3 }}>{org}</div>}
        <div style={{ fontSize: 12, lineHeight: 1.5, color: muted ? 'var(--text-dim)' : 'var(--text)' }}>{category}</div>
      </div>
    </div>
  );
}

function AwardsSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  return (
    <section id="awards" data-screen-label="04 Awards" style={{ padding: '100px 8% 80px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--cyan)" corner2="var(--orange)">
        <div style={{ marginBottom: 48 }}>
          <SectionTag path="awards" accent={accent} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Awards & Recognition</h2>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 600, marginLeft: 19 }}>
            Selected honors from shipped titles.
          </p>
        </div>

        {AWARDS_BY_GAME.map((group, gi) => (
          <React.Fragment key={group.game}>
            {gi > 0 && <GlowDivider color={accent} />}
            <div style={{ marginBottom: gi < AWARDS_BY_GAME.length - 1 ? 44 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{group.game}</h3>
                <span style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{group.year}</span>
              </div>
              <div className="awards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
                {group.wins.map((award, i) => (
                  <AwardBadge key={i} {...award} accent={accent} />
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}

        {AWARD_NOMINATIONS.length > 0 && (
          <>
            <GlowDivider color={accent} />
            <div style={{ marginTop: 44 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Nominations</h3>
              <div className="awards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
                {AWARD_NOMINATIONS.map((award, i) => (
                  <AwardBadge key={i} {...award} accent={accent} muted />
                ))}
              </div>
            </div>
          </>
        )}
      </SectionCard></Reveal>
    </section>
  );
}

// ─── RESUME SECTION ───────────────────────────────────────────────────────────
function ResumeSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);

  const skills = [
    { cat: 'Engine & Systems', items: ['Unreal Engine 4 & 5', 'C++', 'Gameplay Systems', 'Performance Optimization', 'Tooling & Pipeline'] },
    { cat: 'Leadership', items: ['Technical Lead', 'Engineering Management', 'Studio Vision Alignment', 'People Development', 'Cross-team Collaboration'] },
    { cat: 'Platforms', items: ['Meta Quest / VR', 'PC', 'Mobile', 'Facebook Platform', 'Console (PS3/360)'] },
  ];

  const timeline = [
    { year: '2021–2026', role: 'Technical Lead Manager', company: 'Sanzaru Games · Meta (Oculus Studios)', desc: 'Led engineering teams through full lifecycle of flagship VR titles. Asgard\'s Wrath 2 (IGN 10/10). Currently leading unannounced big-IP VR project.' },
    { year: '~2016–2021', role: 'Senior Engineer / Tech Lead', company: 'Sanzaru Games', desc: 'Shipped Asgard\'s Wrath, Marvel Powers United VR, and VR Sports Challenge. Architected core gameplay and multiplayer systems.' },
    { year: '~2012–2016', role: 'Software Engineer', company: 'Sanzaru Games · Big Fish Games', desc: 'Dark Manor: casual hidden-object mobile game. Small 2-engineer team, full stack ownership.' },
    { year: '~2010–2012', role: 'Software Engineer', company: 'Bigpoint', desc: 'Uridium Wars: Flash + PHP space MMO for Facebook platform.' },
    { year: '~2008–2010', role: 'Gameplay Engineer', company: 'Electronic Arts · Maxis', desc: 'Shipped Sims 3: Late Night, Generations, and Pets. First job out of grad school — three expansion packs in two years.' },
  ];

  return (
    <section id="resume" data-screen-label="06 Resume" style={{ padding: '100px 8% 80px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--pink)" corner2="var(--cyan)">
      <div style={{ marginBottom: 56 }}>
        <SectionTag path="resume" accent={accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Experience & Skills</h2>
        </div>
      </div>

      <div className="resume-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Timeline */}
        <div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 600, color: accent, marginBottom: 28, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 12 }}>Career Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, position: 'relative' }}>
                {/* Line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${accent}`, background: i === 0 ? accent : 'transparent', marginTop: 4, boxShadow: i === 0 ? `0 0 10px ${accent}` : 'none', flexShrink: 0 }} />
                  {i < timeline.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: `linear-gradient(to bottom, color-mix(in oklch, ${accent} 60%, transparent), oklch(55% 0.25 295 / 0.15))`, marginTop: 4 }} />
                  )}
                </div>
                <div style={{ paddingBottom: 28 }}>
                  <div style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 16, marginBottom: 3 }}>{item.role}</div>
                  <div style={{ fontSize: 13, color: accent2, marginBottom: 8 }}>{item.company}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-dim)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 600, color: accent, marginBottom: 28, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Core Skills</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {skills.map(group => (
              <div key={group.cat}>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>{group.cat}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {group.items.map(skill => (
                    <span key={skill} style={{
                      padding: '6px 14px', borderRadius: 4,
                      border: '1px solid var(--purple-a3)',
                      background: 'oklch(12% 0.05 290 / 0.5)',
                      fontSize: 13, color: 'var(--text)',
                      fontFamily: 'Space Grotesk',
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a href="/assets/Carlos_Hurtado_Resume.pdf" target="_blank" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 28, fontSize: 13, fontWeight: 600, color: accent,
            fontFamily: 'Space Grotesk', letterSpacing: '0.02em',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>
      </div>
      </SectionCard></Reveal>
    </section>
  );
}

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

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('sent') === '1') {
      setSent(true);
    }
  }, []);

  return (
    <section id="contact" data-screen-label="07 Contact" style={{ padding: '100px 8% 80px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal><SectionCard corner1="var(--purple)" corner2="var(--orange)">
      <div style={{ marginBottom: 56 }}>
        <SectionTag path="contact" accent={accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Get in Touch</h2>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 560, marginLeft: 19, marginBottom: 12 }}>
          SF Bay Area or Remote.
        </p>
        <div style={{ display: 'flex', gap: 10, marginLeft: 19, flexWrap: 'wrap' }}>
          <NeonBadge color="var(--purple)">SF Bay Area</NeonBadge>
          <NeonBadge color="var(--purple)">Remote</NeonBadge>
        </div>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { label: 'Email', val: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
            { label: 'LinkedIn', val: '/in/carloshurtado', href: 'http://linkedin.com/in/carloshurtado' },
            { label: 'GitHub', val: 'github.com/c-hurtado', href: 'http://github.com/c-hurtado' },
            { label: 'Twitter/X', val: '@carlos_hurtado', href: 'http://twitter.com/carlos_hurtado' },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" style={{
              padding: '16px 20px', borderRadius: 8,
              background: 'oklch(9% 0.04 290 / 0.6)',
              border: '1px solid var(--purple-a2)',
              display: 'flex', flexDirection: 'column', gap: 4,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in oklch, ${accent} 60%, transparent)`; e.currentTarget.style.background = 'oklch(11% 0.05 290 / 0.8)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--purple-a2)'; e.currentTarget.style.background = 'oklch(9% 0.04 290 / 0.6)'; }}
            >
              <span style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.label}</span>
              <span style={{ fontSize: 14, color: 'var(--text)' }}>{c.val}</span>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background: 'oklch(9% 0.04 290 / 0.7)', border: '1px solid var(--purple-a25)',
          borderRadius: 10, padding: '32px 36px',
        }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 600, color: accent, marginBottom: 8 }}>Message sent!</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Thanks for reaching out — I'll get back to you soon.</div>
            </div>
          ) : (
            <form action="https://formspree.io/xdoendyz" method="POST" onSubmit={() => setSending(true)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <input type="hidden" name="_next" value="https://www.carloshurtado.com/demo2/?sent=1#contact" />
              {[
                { id: 'name', name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', name: '_replyto', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(field => (
                <div key={field.id}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id]}
                    onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                    style={{
                      width: '100%', padding: '11px 16px', borderRadius: 5,
                      background: 'oklch(7% 0.03 290)', border: '1px solid var(--purple-a2)',
                      color: 'var(--text)', fontSize: 15, fontFamily: 'DM Sans',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = accent}
                    onBlur={e => e.target.style.borderColor = 'var(--purple-a2)'}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>Message</label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about the role or project..."
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{
                    width: '100%', padding: '11px 16px', borderRadius: 5,
                    background: 'oklch(7% 0.03 290)', border: '1px solid var(--purple-a2)',
                    color: 'var(--text)', fontSize: 15, fontFamily: 'DM Sans',
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = accent}
                  onBlur={e => e.target.style.borderColor = 'var(--purple-a2)'}
                />
              </div>
              <button type="submit" disabled={sending} style={{
                padding: '12px 28px', borderRadius: 5,
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                color: '#fff', fontWeight: 600, fontSize: 15,
                fontFamily: 'Space Grotesk', letterSpacing: '0.04em',
                border: 'none', cursor: sending ? 'default' : 'pointer',
                opacity: sending ? 0.7 : 1,
                boxShadow: `0 4px 20px color-mix(in oklch, ${accent} 40%, transparent)`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (!sending) e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
              >{sending ? 'Sending…' : 'Send Message'}</button>
            </form>
          )}
        </div>
      </div>
      </SectionCard></Reveal>
    </section>
  );
}

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

// ─── SCROLL TRACKER ───────────────────────────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = ['home', 'about', 'gamedev', 'awards', 'art', 'resume', 'contact'];
    // Track every section's currently-visible pixel height and pick whichever
    // fills the most of the viewport, rather than reacting to whichever entry
    // happens to be last in an IntersectionObserver batch (batch order isn't
    // visual order) or comparing intersectionRatio (biased against tall
    // sections like Art/Resume, which can never reach a high ratio of their
    // own height even while completely filling the viewport).
    const visiblePx = new Map(sections.map(id => [id, 0]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        visiblePx.set(entry.target.id, entry.isIntersecting ? entry.intersectionRect.height : 0);
      });
      let bestId = null;
      let bestPx = 0;
      sections.forEach(id => {
        const px = visiblePx.get(id) || 0;
        if (px > bestPx) { bestPx = px; bestId = id; }
      });
      if (bestId) setActive(bestId);
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return [active, setActive];
}

// ─── APP ──────────────────────────────────────────────────────────────────────
// Reaches outside React on purpose: .grid-wrapper/.horizon-line/.stars/.clouds
// are static HTML (rendered by {% include grid.html %} + a plain <div>, not by
// this React tree — see body markup), so there's nothing for React to manage
// here. Mutating their style.transform directly via querySelector is the
// correct approach, not a shortcut around React.
function useParallaxScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gridWrapper = document.querySelector('.grid-wrapper');
    const horizonLine = document.querySelector('.horizon-line');
    const mountainLayer = document.querySelector('.mountain-layer');
    const mountainReflection = document.querySelector('.mountain-reflection');
    const stars = document.querySelector('.stars');
    const clouds = document.querySelector('.clouds');

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const gridDrift = Math.min(y * 0.04, 50);   // grid + horizon + sun, capped at 50px
        const starDrift = Math.min(y * 0.015, 30);  // stars/clouds drift slower — depth

        if (gridWrapper) gridWrapper.style.transform = `translateY(${gridDrift}px)`;
        if (horizonLine) horizonLine.style.transform = `translateY(${gridDrift}px)`;
        if (mountainLayer) mountainLayer.style.transform = `translateY(${gridDrift}px)`;
        if (mountainReflection) mountainReflection.style.transform = `translateY(${gridDrift}px) scaleY(-1)`;
        document.body.style.setProperty('--sun-drift', `${gridDrift}px`);
        if (stars) stars.style.transform = `translateY(${starDrift}px)`;
        if (clouds) clouds.style.transform = `translateY(${starDrift * 1.2}px)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

const ACCENT_COLOR = 'pink';

function App() {
  const [activeSection, setActiveSection] = useActiveSection();
  useParallaxScroll();

  return (
    <>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ScrollProgressBar accentColor={ACCENT_COLOR} />
        <Nav activeSection={activeSection} setActiveSection={setActiveSection} accentColor={ACCENT_COLOR} />
        <HomeSection accentColor={ACCENT_COLOR} />
        <AboutSection accentColor={ACCENT_COLOR} />
        <GameDevSection accentColor={ACCENT_COLOR} />
        <AwardsSection accentColor={ACCENT_COLOR} />
        <ArtSection accentColor={ACCENT_COLOR} />
        <ResumeSection accentColor={ACCENT_COLOR} />
        <ContactSection accentColor={ACCENT_COLOR} />
        <Footer accentColor={ACCENT_COLOR} />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
