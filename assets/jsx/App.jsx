const ACCENT_COLOR = 'pink';

function App() {
  const [activeSection, setActiveSection] = useActiveSection();
  useParallaxScroll();

  return (
    <>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgressBar accentColor={ACCENT_COLOR} />
        <Nav activeSection={activeSection} setActiveSection={setActiveSection} accentColor={ACCENT_COLOR} />
        <main id="main" tabIndex={-1}>
          <HomeSection accentColor={ACCENT_COLOR} />
          <AboutSection accentColor={ACCENT_COLOR} />
          <GameDevSection accentColor={ACCENT_COLOR} />
          <AwardsSection accentColor={ACCENT_COLOR} />
          <ArtSection accentColor={ACCENT_COLOR} />
          <ResumeSection accentColor={ACCENT_COLOR} />
          <ContactSection accentColor={ACCENT_COLOR} />
        </main>
        <Footer accentColor={ACCENT_COLOR} />
      </div>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
