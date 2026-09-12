// ─── GAME DEV SECTION ────────────────────────────────────────────────────────
function GameDevSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);
  const [activeProject, setActiveProject] = useState(null);

  // useMemo — this array's `details` fields hold substantial JSX (ModalP/ModalH4/
  // ModalList trees). Without memoizing, it gets rebuilt from scratch every time
  // GameDevSection re-renders, including every time activeProject changes (i.e.
  // every project-modal open/close), for zero visual benefit.
  const projects = useMemo(() => PROJECTS, []);

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
          Shipping games across VR, mobile, and PC since 2008. From EA to Meta-backed studios.
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

