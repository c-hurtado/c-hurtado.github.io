// ─── MUSIC TOGGLE ─────────────────────────────────────────────────────────────
// Opt-in background music. Off by default; the choice is remembered. Nothing
// plays until the visitor has interacted, and the tracks alternate with a fade.
// Tracks alternate: each plays through, then the next fades in (the list loops).
const MUSIC_TRACKS = ['/assets/audio/neon-synthwave-drive.mp3', '/assets/audio/synthwave.mp3'];
const MUSIC_VOLUME = 0.07;

function MusicToggle() {
  const [music, setMusic] = useState(() => {
    try { return localStorage.getItem('site-music') === '1'; } catch (e) { return false; }
  });
  const audioRef = useRef(null);
  const fadeRef = useRef(0);

  const fadeTo = (target, ms, done) => {
    const a = audioRef.current;
    clearInterval(fadeRef.current);
    const from = a.volume, steps = Math.max(1, Math.round(ms / 50));
    let i = 0;
    fadeRef.current = setInterval(() => {
      i += 1;
      a.volume = Math.max(0, Math.min(1, from + (target - from) * (i / steps)));
      if (i >= steps) { clearInterval(fadeRef.current); if (done) done(); }
    }, 50);
  };
  const playMusic = () => {
    if (!audioRef.current) {
      const a = new Audio(MUSIC_TRACKS[0]);
      a.volume = 0;
      let i = 0;
      a.addEventListener('ended', () => {
        i = (i + 1) % MUSIC_TRACKS.length;
        a.src = MUSIC_TRACKS[i];
        a.volume = 0;
        a.play().then(() => fadeTo(MUSIC_VOLUME, 1500)).catch(() => {});
      });
      audioRef.current = a;
    }
    // Rejected if there has been no user gesture yet; the effect below retries on first click.
    return audioRef.current.play().then(() => { fadeTo(MUSIC_VOLUME, 2000); return true; }).catch(() => false);
  };
  const stopMusic = () => {
    if (audioRef.current) fadeTo(0, 1200, () => audioRef.current.pause());
  };

  // Remembered "on": start at the first interaction, since browsers block autoplay.
  // Also pause while the tab is hidden.
  useEffect(() => {
    if (!music) return;
    let cancelled = false;
    const startOnGesture = () => {
      document.removeEventListener('pointerdown', startOnGesture);
      if (!cancelled) playMusic();
    };
    playMusic().then((ok) => {
      if (!ok && !cancelled) document.addEventListener('pointerdown', startOnGesture);
    });
    const onVis = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) a.pause(); else if (a.volume > 0 || !a.paused) a.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelled = true;
      document.removeEventListener('pointerdown', startOnGesture);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [music]);

  const toggle = () => {
    const next = !music;
    setMusic(next);
    try { localStorage.setItem('site-music', next ? '1' : '0'); } catch (e) {}
    if (!next) stopMusic();
  };

  return (
    <button type="button" onClick={toggle} aria-pressed={music}
      aria-label={music ? 'Turn music off' : 'Turn music on'} title={music ? 'Music on' : 'Music off'}
      style={{
        position: 'fixed', left: 20, bottom: 20, zIndex: 450,
        width: 40, height: 40, borderRadius: 8, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'oklch(9% 0.04 290 / 0.5)', backdropFilter: 'blur(10px)',
        border: '1px solid var(--purple-a2)',
        color: music ? 'var(--pink)' : 'var(--text-dim)',
        transition: 'color 0.2s ease, border-color 0.2s ease',
      }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        {!music && <line x1="3" y1="3" x2="21" y2="21" />}
      </svg>
    </button>
  );
}
