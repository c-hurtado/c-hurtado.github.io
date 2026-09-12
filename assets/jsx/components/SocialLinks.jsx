// ─── SOCIAL LINKS ─────────────────────────────────────────────────────────────
function SocialLinks({ accent, style: extraStyle }) {
  const links = [
    { href: `mailto:${CONTACT_EMAIL}`, label: 'Email', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 L12,13 L2,6' },
    { href: 'http://linkedin.com/in/carloshurtado', label: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
    { href: 'http://github.com/c-hurtado', label: 'GitHub', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
    { href: 'http://twitter.com/carlos_hurtado', label: 'Twitter/X', icon: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
    { href: 'http://instagram.com/chaoticbrain', label: 'Instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z' },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', ...extraStyle }}>
      {links.map(link => (
        <a key={link.label} href={link.href} target="_blank" title={link.label} style={{
          width: 36, height: 36, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--purple-a25)',
          color: 'var(--text-dim)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = `color-mix(in oklch, ${accent} 60%, transparent)`; e.currentTarget.style.background = `color-mix(in oklch, ${accent} 10%, transparent)`; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--purple-a25)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={link.icon} />
          </svg>
        </a>
      ))}
    </div>
  );
}

