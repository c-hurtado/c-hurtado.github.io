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

