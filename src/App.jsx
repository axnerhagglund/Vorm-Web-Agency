import { useEffect, useRef, useState } from 'react'

/* ─── Intersection observer hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ctaHover, setCtaHover] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Work', 'Services', 'About', 'Contact']

  return (
    <>
      <nav className="nav-wrap" style={{
        transition: 'background 0.4s, padding 0.4s',
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <span style={{ fontFamily: 'Bebas Neue', fontSize: '22px', letterSpacing: '4px', color: 'var(--cream)' }}>
          VORM
        </span>
        <div className="nav-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 400,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--muted)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--lime)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >{l}</a>
          ))}
          <a href="#contact"
            style={{
              fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 500,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: ctaHover ? 'var(--ink)' : 'var(--cream)',
              background: ctaHover ? 'var(--lime)' : 'transparent',
              border: `1px solid ${ctaHover ? 'var(--lime)' : 'rgba(237,234,228,0.2)'}`,
              padding: '9px 22px', textDecoration: 'none',
              transition: 'color 0.25s, background 0.25s, border-color 0.25s',
            }}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >Start a project</a>
        </div>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="7" x2="19" y2="7" />
            <line x1="3" y1="11" x2="19" y2="11" />
            <line x1="3" y1="15" x2="19" y2="15" />
          </svg>
        </button>
      </nav>

      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Navigation menu" aria-modal="true">
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
          style={{
            position: 'absolute', top: '20px', right: '24px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--cream)', padding: '8px', lineHeight: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="4" x2="18" y2="18" />
            <line x1="18" y1="4" x2="4" y2="18" />
          </svg>
        </button>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'Bebas Neue', fontSize: '52px', letterSpacing: '3px',
              color: 'var(--cream)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--lime)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
          >{l}</a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)} style={{
          fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 500,
          letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--ink)', background: 'var(--lime)',
          padding: '12px 28px', textDecoration: 'none', marginTop: '8px',
        }}>Start a project</a>
      </div>
    </>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero-section">
      {/* Geometric ring decorations */}
      <div style={{
        position: 'absolute', top: '44%', right: '-140px', transform: 'translateY(-50%)',
        width: '520px', height: '520px', borderRadius: '50%',
        border: '1px solid rgba(196,241,58,0.07)',
        pointerEvents: 'none',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', top: '44%', right: '-60px', transform: 'translateY(-50%)',
        width: '360px', height: '360px', borderRadius: '50%',
        border: '1px solid rgba(196,241,58,0.04)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Scroll line */}
      <div className="anim-fade-in d7" style={{
        position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        pointerEvents: 'none',
      }} aria-hidden="true">
        <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
      </div>

      <div className="hero-main">
        <div className="anim-fade-in d1 hero-meta">
          <span style={{ fontFamily: 'Cormorant', fontStyle: 'italic', fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
            est. 2019 — Amsterdam
          </span>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
            {['Brand', 'Digital', 'Motion'].map((t, i) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {i > 0 && <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--lime)', display: 'block', flexShrink: 0 }} aria-hidden="true" />}
                <span style={{ fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>{t}</span>
              </span>
            ))}
          </div>
        </div>

        <h1 style={{ marginBottom: '40px', fontWeight: 'normal' }}>
        <span className="anim-fade-up d2" style={{
          display: 'block',
          fontFamily: 'Bebas Neue', fontSize: 'clamp(72px, 11vw, 160px)',
          lineHeight: 0.9, letterSpacing: '-1px', color: 'var(--cream)',
        }}>We make</span>
        <span className="anim-fade-up d3" style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2vw, 32px)',
          fontFamily: 'Bebas Neue', fontSize: 'clamp(72px, 11vw, 160px)',
          lineHeight: 0.9, letterSpacing: '-1px',
        }}>
          <span style={{ color: 'var(--cream)' }}>things that</span>
          <em style={{
            fontFamily: 'Cormorant', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(56px, 8.5vw, 124px)', color: 'var(--lime)',
          }}>move</em>
        </span>
        <span className="anim-fade-up d4" style={{
          display: 'block',
          fontFamily: 'Bebas Neue', fontSize: 'clamp(72px, 11vw, 160px)',
          lineHeight: 0.9, letterSpacing: '-1px', color: 'var(--cream)',
        }}>people.</span>
      </h1>

      <div className="anim-fade-up d5 hero-bottom">
        <p style={{
          fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 300,
          color: 'var(--muted)', maxWidth: '360px', lineHeight: 1.8,
        }}>
          A studio that refuses the obvious. We craft brand identities, digital experiences, and motion work for companies that want to be remembered.
        </p>
        <div className="hero-stats">
          {[['120+', 'Projects'], ['8', 'Years'], ['3', 'Continents']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '44px', color: 'var(--cream)', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '6px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ['Brand Identity', '◆', 'Web Design', '◆', 'Motion & Film', '◆', 'Art Direction', '◆', 'Strategy', '◆', 'Spatial Design', '◆']
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '13px 0',
    }}>
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'DM Sans',
            fontSize: item === '◆' ? '5px' : '10px',
            letterSpacing: item === '◆' ? '0' : '3px',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: item === '◆' ? 'var(--lime)' : 'var(--muted)',
            marginRight: '28px', whiteSpace: 'nowrap',
          }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Work ─── */
const projects = [
  { num: '01', name: 'Helios', category: 'Brand Identity', year: '2024', accent: 'var(--lime)' },
  { num: '02', name: 'Nacht Collective', category: 'Digital + Motion', year: '2024', accent: '#A8C4B8' },
  { num: '03', name: 'Oblik Furniture', category: 'Art Direction', year: '2023', accent: '#C084FC' },
  { num: '04', name: 'Pulsar Labs', category: 'Brand + Web', year: '2023', accent: 'var(--cream)' },
]

function WorkRow({ proj, delay }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} className={visible ? `anim-fade-up ${delay}` : 'reveal-pending'} style={{
      display: 'flex', alignItems: 'center', gap: '32px',
      padding: '22px 0', borderBottom: '1px solid var(--border)',
      cursor: 'pointer', transition: 'background 0.3s',
      background: hovered ? 'rgba(196,241,58,0.02)' : 'transparent',
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}>
      <span style={{
        fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '2px',
        color: 'var(--muted)', width: '28px', flexShrink: 0, opacity: 0.5,
      }}>{proj.num}</span>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
        <div style={{
          width: hovered ? '28px' : '0px', height: '1px',
          background: proj.accent, transition: 'width 0.3s ease', flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'Cormorant', fontWeight: 400, fontSize: 'clamp(22px, 3.5vw, 48px)',
          color: hovered ? 'var(--cream)' : 'rgba(237,234,228,0.5)',
          transition: 'color 0.3s', letterSpacing: '-0.5px',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{proj.name}</span>
      </div>
      <span style={{
        fontFamily: 'DM Sans', fontSize: '11px', letterSpacing: '1px',
        color: 'var(--muted)', flexShrink: 0,
        opacity: hovered ? 0.8 : 0.4, transition: 'opacity 0.3s',
      }}>{proj.category}</span>
      <span className="work-row-year" style={{
        fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--muted)',
        width: '40px', textAlign: 'right', flexShrink: 0, opacity: 0.3,
      }}>{proj.year}</span>
      <span className="work-row-view" style={{
        fontFamily: 'DM Sans', fontSize: '16px',
        color: proj.accent, opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s', flexShrink: 0,
      }} aria-hidden="true">↗</span>
    </div>
  )
}

function Work() {
  const [ref, visible] = useReveal()
  return (
    <section id="work" className="sec">
      <div ref={ref} className="work-hd">
        <div>
          <div className={visible ? 'anim-fade-in d1' : 'reveal-pending'} style={{ marginBottom: '20px' }}>
            <span className="sec-label">Selected Work</span>
          </div>
          <h2 className={visible ? 'anim-fade-up d2' : 'reveal-pending'} style={{
            fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 6vw, 80px)',
            color: 'var(--cream)', lineHeight: 0.95, letterSpacing: '1px',
          }}>
            Things we're<br />proud of.
          </h2>
        </div>
        <a href="#work" className={visible ? 'anim-fade-in d3' : 'reveal-pending'} style={{
          fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--muted)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '10px',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          View all
          <span style={{ display: 'inline-block', width: '20px', height: '1px', background: 'currentColor' }} aria-hidden="true" />
        </a>
      </div>
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {projects.map((p, i) => (
          <WorkRow key={p.name} proj={p} delay={`d${i + 2}`} />
        ))}
      </div>
    </section>
  )
}

/* ─── Services ─── */
const services = [
  { num: '01', title: 'Brand Identity', desc: 'From naming to visual systems — we build brands that have a point of view and the clarity to communicate it.', tags: ['Logo', 'Guidelines', 'Tone of voice'] },
  { num: '02', title: 'Digital Design', desc: 'Websites and products that feel as good as they look. We design experiences people actually remember using.', tags: ['Web', 'Product', 'E-commerce'] },
  { num: '03', title: 'Motion & Film', desc: 'Animation, brand films, and moving identity work that brings brands to life across every screen.', tags: ['Animation', 'Video', 'Social'] },
  { num: '04', title: 'Strategy', desc: 'The thinking before the making. Positioning, naming, audience definition — the foundation everything sits on.', tags: ['Positioning', 'Naming', 'Research'] },
]

function ServiceRow({ svc }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '28px',
          padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', WebkitAppearance: 'none', appearance: 'none',
          color: 'var(--cream)',
        }}
      >
        <span style={{
          fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '2px',
          color: 'var(--muted)', width: '28px', flexShrink: 0, opacity: 0.5,
        }}>{svc.num}</span>
        <h3 style={{
          flex: 1, fontFamily: 'Cormorant', fontWeight: 400,
          fontSize: 'clamp(24px, 3vw, 42px)', color: 'var(--cream)',
          letterSpacing: '-0.3px', lineHeight: 1,
        }}>{svc.title}</h3>
        <div className="service-tags" style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          {svc.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'DM Sans', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: open ? 'var(--lime)' : 'var(--muted)',
              padding: '4px 10px',
              border: '1px solid',
              borderColor: open ? 'rgba(196,241,58,0.25)' : 'var(--border)',
              transition: 'color 0.3s, border-color 0.3s',
            }}>{t}</span>
          ))}
        </div>
        <span style={{
          fontFamily: 'DM Sans', fontSize: '20px', lineHeight: 1,
          color: open ? 'var(--lime)' : 'var(--muted)',
          transition: 'color 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '20px',
        }} aria-hidden="true">+</span>
      </button>
      <div style={{
        maxHeight: open ? '180px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <p style={{
          fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 300, lineHeight: 1.85,
          color: 'var(--muted)', paddingBottom: '32px',
          paddingLeft: '56px', maxWidth: '600px',
        }}>{svc.desc}</p>
      </div>
    </div>
  )
}

function Services() {
  const [ref, visible] = useReveal()
  return (
    <section id="services" className="sec" style={{ borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ marginBottom: '72px' }}>
        <div className={visible ? 'anim-fade-in d1' : 'reveal-pending'} style={{ marginBottom: '20px' }}>
          <span className="sec-label">What we do</span>
        </div>
        <h2 className={visible ? 'anim-fade-up d2' : 'reveal-pending'} style={{
          fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 6vw, 80px)',
          color: 'var(--cream)', lineHeight: 0.95, letterSpacing: '1px',
        }}>
          Craft at every<br />scale.
        </h2>
      </div>
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {services.map((s, i) => (
          <ServiceRow key={s.title} svc={s} />
        ))}
      </div>
    </section>
  )
}

/* ─── About ─── */
function About() {
  const [ref, visible] = useReveal(0.1)
  return (
    <section id="about" className="sec-lg" style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
      <div ref={ref} style={{ maxWidth: '960px' }}>
        <div className={visible ? 'anim-fade-in d1' : 'reveal-pending'} style={{ marginBottom: '64px' }}>
          <span className="sec-label">Our belief</span>
        </div>
        <blockquote className={visible ? 'anim-fade-up d2' : 'reveal-pending'} style={{
          fontFamily: 'Cormorant', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(32px, 4.5vw, 64px)', lineHeight: 1.2,
          color: 'var(--cream)', marginBottom: '72px', letterSpacing: '-0.5px',
        }}>
          "Good design is never neutral. It takes a position, holds it with conviction, and refuses to apologize for existing."
        </blockquote>
        <div className={`${visible ? 'anim-fade-up d3' : 'reveal-pending'} about-cols`}>
          <p style={{ fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 300, lineHeight: 1.9, color: 'var(--muted)', maxWidth: '340px' }}>
            We're a small, deliberate studio. We take fewer projects so we can go deeper on each one. Every decision has a reason. Every pixel is argued over.
          </p>
          <p style={{ fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 300, lineHeight: 1.9, color: 'var(--muted)', maxWidth: '340px' }}>
            Our clients come from fashion, technology, culture, and architecture — but what unites them is an appetite for work that genuinely surprises people.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Contact ─── */
function Contact() {
  const [ref, visible] = useReveal()
  const [emailHover, setEmailHover] = useState(false)

  return (
    <section id="contact" className="sec-lg" style={{
      borderTop: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: '-20px', bottom: '-60px',
        fontFamily: 'Bebas Neue', fontSize: 'clamp(120px, 20vw, 300px)',
        lineHeight: 1, color: 'rgba(196,241,58,0.03)',
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-4px',
      }} aria-hidden="true">TALK</div>

      <div ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div className={visible ? 'anim-fade-in d1' : 'reveal-pending'} style={{ marginBottom: '24px' }}>
          <span className="sec-label">Start a project</span>
        </div>
        <h2 className={visible ? 'anim-fade-up d2' : 'reveal-pending'} style={{
          fontFamily: 'Bebas Neue', fontSize: 'clamp(56px, 9vw, 128px)',
          lineHeight: 0.9, color: 'var(--cream)', marginBottom: '56px', letterSpacing: '-1px',
        }}>
          Got something<br />worth making?
        </h2>
        <div className={visible ? 'anim-fade-up d3' : 'reveal-pending'} style={{
          display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap',
        }}>
          <a href="mailto:hello@vorm.studio"
            style={{
              fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 500,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: emailHover ? 'var(--ink)' : 'var(--cream)',
              background: emailHover ? 'var(--lime)' : 'transparent',
              border: `1px solid ${emailHover ? 'var(--lime)' : 'rgba(237,234,228,0.2)'}`,
              padding: '16px 40px',
              textDecoration: 'none', transition: 'color 0.25s, background 0.25s, border-color 0.25s',
            }}
            onMouseEnter={() => setEmailHover(true)}
            onMouseLeave={() => setEmailHover(false)}
          >hello@vorm.studio</a>
          <a href="tel:+31201234567" style={{
            fontFamily: 'DM Sans', fontSize: '13px', letterSpacing: '1px',
            color: 'var(--muted)', textDecoration: 'none',
            transition: 'color 0.2s', padding: '0 8px',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >+31 20 123 4567</a>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer-wrap">
      <span style={{ fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '1px', color: 'var(--muted)', opacity: 0.5 }}>
        © 2026 VORM Studio B.V. — Amsterdam
      </span>
      <div style={{ display: 'flex', gap: '28px' }}>
        {[
          { label: 'Instagram', href: '#' },
          { label: 'LinkedIn', href: '#' },
          { label: 'Dribbble', href: '#' },
        ].map(({ label, href }) => (
          <a key={label} href={href} aria-label={`VORM on ${label}`} style={{
            fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--muted)', textDecoration: 'none', opacity: 0.5,
            transition: 'color 0.2s, opacity 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime)'; e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.opacity = '0.5' }}
          >{label}</a>
        ))}
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
