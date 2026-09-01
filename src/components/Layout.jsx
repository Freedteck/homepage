import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site, nav } from '../data/site'
import { Icon } from './icons'
import s from './Layout.module.css'

const socialIcon = {
  github:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  linkedin:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg',
  x: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg',
}

export function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  /* Elevation on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Route change: close the drawer (state adjusted during render, React's derived-reset pattern) */
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setOpen(false)
  }

  /* Route change: scroll to top (hash handled by Home) */
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  /* Hash navigation from any page */
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
    return () => clearTimeout(t)
  }, [location])

  /* Header Contact jumps straight to the footer contact section, on any page */
  const scrollToContact = (e) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* Lock page scroll while the drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* Escape closes the drawer */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className={s.shell}>
      <header className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
        <div className={`container ${s.navInner}`}>
          <Link to="/" className={s.logo} aria-label="Mubarak Olanrewaju, home">
            Mubarak<span className={s.logoDot}>.</span>
          </Link>

          <nav className={s.links} aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? `${s.link} ${s.linkActive}` : s.link)}
              >
                {item.label}
              </NavLink>
            ))}
            <a href="#contact" onClick={scrollToContact} className={s.link}>
              Contact
            </a>
            <a href={site.resume} download className={`btn btn--primary btn--sm ${s.navCta}`}>
              <Icon name="download" size={16} />
              Resume
            </a>
          </nav>

          {/* Mobile: Resume stays visible in the bar, only Blogs and Contact live in the menu */}
          <div className={s.navActions}>
            <a href={site.resume} download className={`btn btn--primary btn--sm ${s.navCta}`}>
              <Icon name="download" size={16} />
              Resume
            </a>
            <button
              className={s.burger}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: slides in from the right, overlay click or Escape closes */}
      <div
        className={`${s.overlay} ${open ? s.overlayShow : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        className={`${s.drawer} ${open ? s.drawerOpen : ''}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <div className={s.drawerTop}>
          <span className={s.drawerTitle}>Menu</span>
          <button className={s.drawerClose} onClick={() => setOpen(false)} aria-label="Close menu">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className={s.drawerLinks}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${s.drawerLink} ${s.drawerLinkActive}` : s.drawerLink
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
              <Icon name="arrowRight" size={18} className={s.drawerArrow} />
            </NavLink>
          ))}
          <a href="#contact" onClick={scrollToContact} className={s.drawerLink}>
            Contact
            <Icon name="arrowRight" size={18} className={s.drawerArrow} />
          </a>
        </div>
      </nav>

      <main className={s.main}>
        <Outlet />
      </main>

      <footer className={s.footer}>
        <div className="container">
          {/* Contact section, redone: split layout, target of the header Contact link */}
          <div className={s.footerContact} id="contact">
            <div className={s.footerContactInfo}>
              <h2 className={s.footerTitle}>Get in touch.</h2>
              <p className={s.footerSub}>Have a role or a project in mind? My inbox is open.</p>
            </div>

            <div className={s.footerContactActions}>
              <a href={`mailto:${site.email}`} className="btn btn--primary">
                <Icon name="mail" size={18} className={s.contactIcon} />
                <span className={s.btnLabel}>Email</span>
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--light"
              >
                <Icon name="whatsapp" size={19} className={s.contactIcon} />
                <span className={s.btnLabel}>WhatsApp</span>
              </a>
              <a
                href={site.socials[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--light"
              >
                <Icon name="linkedin" size={15} className={s.contactIcon} />
                <span className={s.btnLabel}>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className={s.footerBrandRow}>
            <div className={s.footerBrand}>
              <Link to="/" className={s.logoLight}>
                Mubarak<span className={s.logoDot}>.</span>
              </Link>
              <p className={s.footerBlurb}>
                Frontend developer working on health-tech, enterprise systems, and other
                live products.
              </p>
            </div>

            <div className={s.footerBrandMeta}>
              <div className={s.footerSocials}>
                {site.socials.map((soc) => (
                  <a
                    key={soc.icon}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className={s.socialBtn}
                  >
                    <img src={socialIcon[soc.icon]} alt="" width="22" height="22" loading="lazy" />
                  </a>
                ))}
              </div>
              <p className={s.footerLoc}>
                <Icon name="pin" size={15} /> {site.location}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
