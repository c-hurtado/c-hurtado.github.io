# Homepage JS modules

Single-scope sources concatenated **in the order listed below** and compiled
with Babel (`@babel/preset-react`) into `assets/js/app.js`, which is the
committed artifact GitHub Pages serves. No bundler, no ES modules — files
share one scope exactly like the old monolithic `app.jsx` (deleted in P3).

Build: `npm run build:js` (order lives in `package.json`, must match this list).

Order (matches original top-to-bottom layout of `app.jsx`):

```
00-react.js                  React destructuring (useState/useEffect/…)
hooks/useAccent.js           accent-color helper
components/Logo.jsx
components/ScrollProgressBar.jsx
components/Nav.jsx
components/AvatarCircle.jsx
hooks/useFocusTrap.js
components/Reveal.jsx        scroll-reveal wrapper
components/SectionCard.jsx
components/primitives.jsx    NeonBadge, SectionTag, GlowDivider
sections/Home.jsx            (+ CONTACT_EMAIL const, used by Contact)
components/SocialLinks.jsx
components/ProjectCards.jsx  FeaturedProjectCard + ProjectCard
components/ProjectModal.jsx  modal helpers + ProjectModal
data/tools.js                TOOLS_I_USE (add a tool = edit here, no JSX)
sections/About.jsx
sections/GameDev.jsx
data/awards.js               AWARDS_BY_GAME + AWARD_NOMINATIONS (edit here)
sections/Awards.jsx          AwardBadge + AwardsSection
sections/Resume.jsx
sections/Art.jsx             gallery (images from window.ART_CATEGORIES_RAW,
                             see assets/art-data.js)
sections/Contact.jsx
components/Footer.jsx
hooks/useScroll.js           useActiveSection + useParallaxScroll
App.jsx                      ACCENT_COLOR + App + root render
```

Notes:

- `data/tools.js` keeps the stray duplicate `GAME DEV SECTION` banner (line 1)
  verbatim from the original — harmless comment, kept for byte-fidelity.
- To add a section: new file in `sections/`, mount it in `App.jsx`, append the
  path to `build:js` in `package.json`.
