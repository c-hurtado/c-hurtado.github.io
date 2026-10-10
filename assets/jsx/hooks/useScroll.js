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
        const starDrift = Math.min(y * 0.05, 140);  // stars/clouds drift independently of the grid — depth

        if (gridWrapper) gridWrapper.style.transform = `translateY(${gridDrift}px)`;
        if (horizonLine) horizonLine.style.transform = `translateY(${gridDrift}px)`;
        if (mountainLayer) mountainLayer.style.transform = `translateY(${gridDrift}px)`;
        if (mountainReflection) mountainReflection.style.transform = `translateY(${gridDrift}px) scaleY(-1)`;
        document.body.style.setProperty('--sun-drift', `${gridDrift}px`);
        if (stars) stars.style.transform = `translateY(${starDrift}px)`;
        if (clouds) clouds.style.transform = `translateY(${starDrift * 1.8}px)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}


// ─── CARD SPOTLIGHT + TILT ────────────────────────────────────────────────────
// Feeds --mx/--my (spotlight) and --rx/--ry (tilt) to the hovered .glow-card;
// the visuals themselves are CSS (_motion.scss).
function usePointerGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const MAX_TILT = 3;
    // Cap how far a card edge swings (px) so big cards (art gallery) tilt less, not more.
    const EDGE_PX = 20;
    const MAX_TILT_HEIGHT = 1200;
    const tilt = (dim) => Math.min(MAX_TILT, Math.asin(Math.min(1, EDGE_PX / (dim / 2))) * 57.2958);
    let raf = 0;
    // White cursor highlight for the title and pink buttons: --tx/--ty in the element's own coordinates.
    const setLocalPointer = (el, cx, cy) => {
      const t = el.getBoundingClientRect();
      el.style.setProperty('--tx', `${cx - t.left}px`);
      el.style.setProperty('--ty', `${cy - t.top}px`);
    };
    const clearLocalPointer = (el) => { el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); };
    const onMove = (e) => {
      const card = e.target.closest && e.target.closest('.glow-card');
      if (raf) return;
      const { clientX, clientY } = e;
      raf = requestAnimationFrame(() => {
        raf = 0;
        document.querySelectorAll('.glow-btn').forEach((b) => setLocalPointer(b, clientX, clientY));
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = clientX - r.left, y = clientY - r.top;
        // Re-entering mid-bounce: cancel the settle so tracking is snappy again.
        clearTimeout(card._settle);
        card.classList.remove('settling');
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--ry', `${((x / r.width) * 2 - 1) * tilt(r.width)}deg`);
        card.style.setProperty('--rx', `${-((y / r.height) * 2 - 1) * tilt(r.height)}deg`);
        const title = card.querySelector('.glow-title');
        if (title) setLocalPointer(title, clientX, clientY);
        // Tall cards (art gallery) keep the glow but skip the tilt.
        if (r.height <= MAX_TILT_HEIGHT && card.matches(':hover')) card.classList.add('tilting');
      });
    };
    const onOut = (e) => {
      if (!e.relatedTarget) document.querySelectorAll('.glow-btn').forEach(clearLocalPointer);
      const card = e.target.closest && e.target.closest('.glow-card');
      if (!card || card.contains(e.relatedTarget)) return;
      // Spring back to flat (CSS .settling gives the bounce), then drop the tilt class.
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.classList.add('settling');
      clearTimeout(card._settle);
      card._settle = setTimeout(() => card.classList.remove('tilting', 'settling'), 1000);
      const title = card.querySelector('.glow-title');
      if (title) clearLocalPointer(title);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);
}
