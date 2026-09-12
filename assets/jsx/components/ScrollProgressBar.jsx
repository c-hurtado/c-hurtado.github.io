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

