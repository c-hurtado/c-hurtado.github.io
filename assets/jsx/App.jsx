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

const HomeSection = lazy(() => import('./sections/Home'));
const AboutSection = lazy(() => import('./components/About'));
const GameDevSection = lazy(() => import('./components/GameDev'));
const AwardsSection = lazy(() => import('./components/Awards'));
const ArtSection = lazy(() => import('./components/Art'));
const ResumeSection = lazy(() => import('./components/Resume'));
const ContactSection = lazy(() => import('./components/Contact'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);