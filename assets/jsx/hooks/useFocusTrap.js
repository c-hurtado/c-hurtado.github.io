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

