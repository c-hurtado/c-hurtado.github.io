// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection({ accentColor }) {
  const { accent, accent2 } = useAccent(accentColor);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('sent') === '1') {
      setSent(true);
    }
  }, []);

  return (
    <section id="contact" data-screen-label="07 Contact" style={{ padding: '120px 8% 90px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Flat, quiet panel (no corner brackets / glow) — the one section
          meant to feel like an ending, not another card in the rotation. */}
      <Reveal><div className="section-card-flat" style={{
        background: 'oklch(7% 0.03 290 / 0.5)',
        border: '1px solid var(--purple-a15)',
        borderRadius: 12,
        padding: '52px 60px',
      }}>
      <div style={{ marginBottom: 56 }}>
        <SectionTag path="contact" accent={accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 3, height: 36, background: `linear-gradient(to bottom, ${accent}, ${accent2})`, borderRadius: 2, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 80%, transparent)` }} />
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Get in Touch</h2>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 560, marginLeft: 19, marginBottom: 12 }}>
          Open to opportunities in the SF Bay Area or fully remote.
        </p>
        <div style={{ display: 'flex', gap: 10, marginLeft: 19, flexWrap: 'wrap' }}>
          <NeonBadge color="var(--purple)">SF Bay Area</NeonBadge>
          <NeonBadge color="var(--purple)">Remote</NeonBadge>
        </div>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { label: 'Email', val: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
            { label: 'LinkedIn', val: '/in/carloshurtado', href: 'https://linkedin.com/in/carloshurtado' },
            { label: 'GitHub', val: 'github.com/c-hurtado', href: 'https://github.com/c-hurtado' },
            { label: 'Twitter/X', val: '@carlos_hurtado', href: 'https://twitter.com/carlos_hurtado' },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" style={{
              padding: '16px 20px', borderRadius: 8,
              background: 'oklch(9% 0.04 290 / 0.6)',
              border: '1px solid var(--purple-a2)',
              display: 'flex', flexDirection: 'column', gap: 4,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `color-mix(in oklch, ${accent} 60%, transparent)`; e.currentTarget.style.background = 'oklch(11% 0.05 290 / 0.8)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--purple-a2)'; e.currentTarget.style.background = 'oklch(9% 0.04 290 / 0.6)'; }}
            >
              <span style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.label}</span>
              <span style={{ fontSize: 14, color: 'var(--text)' }}>{c.val}</span>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background: 'oklch(9% 0.04 290 / 0.7)', border: '1px solid var(--purple-a25)',
          borderRadius: 10, padding: '32px 36px',
        }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 600, color: accent, marginBottom: 8 }}>Message sent!</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Thanks for reaching out — I'll get back to you soon.</div>
            </div>
          ) : (
            <form action="https://formspree.io/xdoendyz" method="POST" onSubmit={() => setSending(true)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <input type="hidden" name="_next" value="https://www.carloshurtado.com/?sent=1#contact" />
              {[
                { id: 'name', name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', name: '_replyto', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(field => (
                <div key={field.id}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id]}
                    onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                    style={{
                      width: '100%', padding: '11px 16px', borderRadius: 5,
                      background: 'oklch(7% 0.03 290)', border: '1px solid var(--purple-a2)',
                      color: 'var(--text)', fontSize: 15, fontFamily: 'DM Sans',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = accent}
                    onBlur={e => e.target.style.borderColor = 'var(--purple-a2)'}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>Message</label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about the role or project..."
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{
                    width: '100%', padding: '11px 16px', borderRadius: 5,
                    background: 'oklch(7% 0.03 290)', border: '1px solid var(--purple-a2)',
                    color: 'var(--text)', fontSize: 15, fontFamily: 'DM Sans',
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = accent}
                  onBlur={e => e.target.style.borderColor = 'var(--purple-a2)'}
                />
              </div>
              <button type="submit" disabled={sending} style={{
                padding: '12px 28px', borderRadius: 5,
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                color: '#fff', fontWeight: 600, fontSize: 15,
                fontFamily: 'Space Grotesk', letterSpacing: '0.04em',
                border: 'none', cursor: sending ? 'default' : 'pointer',
                opacity: sending ? 0.7 : 1,
                boxShadow: `0 4px 20px color-mix(in oklch, ${accent} 40%, transparent)`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (!sending) e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
              >{sending ? 'Sending…' : 'Send Message'}</button>
            </form>
          )}
        </div>
      </div>
      </div></Reveal>
    </section>
  );
}

