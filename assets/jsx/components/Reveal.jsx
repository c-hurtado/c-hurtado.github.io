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

