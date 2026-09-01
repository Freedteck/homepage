import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site, experience, skillGroups } from '../data/site'
import { publishedProjects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Icon } from '../components/icons'
import { Reveal, usePageTitle } from '../utils/ui'
import s from './Home.module.css'

const socialIcon = {
  github:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  linkedin:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg',
  x: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg',
}

export function Home() {
  usePageTitle('Mubarak Olanrewaju · Frontend Developer')
  const location = useLocation()

  /* Smooth-scroll when arriving with /#hash from another page */
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => clearTimeout(t)
  }, [location])

  const featured = publishedProjects.find((p) => p.featured)
  const rest = publishedProjects.filter((p) => p !== featured)

  return (
    <>
      {/* ============ HERO ============ */}
      <section className={s.hero}>
        <div className="container">
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <Reveal>
                <h1 className={s.heroTitle}>
                  I build clean frontends for{' '}
                  <span className={s.heroAccent}>complex products.</span>
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <p className={s.heroSub}>{site.hero.sub}</p>
              </Reveal>
              <Reveal delay={140}>
                <div className={s.heroCtas}>
                  <a href={site.hero.ctas.primary.href} className="btn btn--primary">
                    View my work
                    <Icon name="arrowRight" size={17} />
                  </a>
                  <a
                    href={site.hero.ctas.secondary.href}
                    download
                    className={`btn btn--ghost-dark ${s.heroResume}`}
                  >
                    <Icon name="download" size={17} />
                    Download resume
                  </a>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className={s.heroSocials}>
                  {site.socials.map((soc) => (
                    <a
                      key={soc.icon}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.label}
                      className={s.heroSocialBtn}
                    >
                      <img src={socialIcon[soc.icon]} alt="" width="20" height="20" />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className={s.heroArtWrap}>
              <div className={s.heroArt}>
                <img
                  src="/images/profile.webp"
                  alt={`Portrait of ${site.name}`}
                  className={s.heroImg}
                  width="520"
                  height="620"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section className={`section ${s.band}`} id="work">
        <div className="container">
          <Reveal>
            <div className={s.sectionHead}>
              <h2 className="h2">Selected work</h2>
            </div>
          </Reveal>

          <div className={s.workGrid}>
            {featured && (
              <Reveal className={s.workFeatured}>
                <ProjectCard project={featured} featured />
              </Reveal>
            )}
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className={s.workNote}>
              More projects will be added here as they ship. In the meantime, my{' '}
              <a href={site.socials[0].url} target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
              has the public code.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className={`section ${s.expSection}`} id="experience">
        <div className="container">
          <Reveal>
            <h2 className="h2">Where I&rsquo;ve worked</h2>
          </Reveal>

          <div className={s.expList}>
            {experience.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.period}`} delay={i * 40}>
                <article className={s.expItem}>
                  <div className={s.expHead}>
                    <div>
                      <h3 className={s.expRole}>{exp.role}</h3>
                      <p className={s.expCompany}>
                        {exp.company} · <span>{exp.type}</span>
                      </p>
                    </div>
                    <p className={s.expPeriod}>{exp.period}</p>
                  </div>
                  <div className={s.expBody}>
                    {exp.points.map((pt) => (
                      <p key={pt} className={s.expPoint}>
                        {pt}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section className={`section ${s.band}`} id="skills">
        <div className="container">
          <Reveal>
            <div className={s.sectionHead}>
              <h2 className="h2">What I work with</h2>
            </div>
          </Reveal>

          <div className={s.skillsGrid}>
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 70}>
                <article className={s.skillCard}>
                  <span className={s.skillIcon}>
                    <Icon name={g.icon} size={22} />
                  </span>
                  <h3 className={s.skillTitle}>{g.title}</h3>
                  <p className={s.skillText}>{g.text}</p>
                  <div className={s.skillChips}>
                    {g.chips.map((chip) => (
                      <span key={chip} className={s.chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
