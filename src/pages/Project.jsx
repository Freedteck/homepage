import { useRef, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getProject, getRelated } from '../data/projects'
import { site } from '../data/site'
import { ProjectCard } from '../components/ProjectCard'
import { Icon } from '../components/icons'
import { Reveal, usePageTitle, useMediaQuery } from '../utils/ui'
import s from './Project.module.css'

/* "Inside the product" carousel: arrows, dots, swipe and arrow keys, wraps around */
function Gallery({ shots, label }) {
  const [idx, setIdx] = useState(0)
  const downX = useRef(null)
  const count = shots.length

  const go = (d) => setIdx((i) => (i + d + count) % count)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  /* Swipe: record where the press started, compare on release */
  const onPointerDown = (e) => {
    downX.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (downX.current == null) return
    const dx = e.clientX - downX.current
    downX.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  return (
    <div
      className={s.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        className={s.carouselViewport}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className={s.carouselTrack}
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {shots.map((g) => (
            <figure className={s.carouselSlide} key={g.src}>
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                draggable={false}
              />
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={`${s.carouselBtn} ${s.carouselBtnPrev}`}
          onClick={() => go(-1)}
          aria-label="Previous image"
        >
          <Icon name="arrowRight" size={18} className={s.carouselBtnFlip} />
        </button>
        <button
          type="button"
          className={`${s.carouselBtn} ${s.carouselBtnNext}`}
          onClick={() => go(1)}
          aria-label="Next image"
        >
          <Icon name="arrowRight" size={18} />
        </button>
      </div>

      <div className={s.carouselDots} role="tablist" aria-label="Choose image">
        {shots.map((g, i) => (
          <button
            key={g.src}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`Image ${i + 1} of ${count}`}
            className={`${s.carouselDot} ${i === idx ? s.carouselDotActive : ''}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>

      <div className={s.carouselBar}>
        <p className={s.carouselCaption} aria-live="polite">
          {shots[idx].caption}
        </p>
        <p className={s.carouselCount}>
          {String(idx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}

export function Project() {
  const { slug } = useParams()
  const project = getProject(slug)

  usePageTitle(
    project && project.published
      ? `${project.name} · ${site.name}`
      : 'Not found · Mubarak Olanrewaju'
  )

  /* Stack shows fewer chips on narrow screens so the row never wraps */
  const narrow = useMediaQuery('(max-width: 900px)')

  /* Unpublished or unknown → 404 behaviour */
  if (!project || !project.published) return <Navigate to="/404" replace />

  const related = getRelated(slug)
  const stackShown = project.stack.slice(0, narrow ? 2 : 3)
  const stackHidden = project.stack.slice(narrow ? 2 : 3)

  return (
    <div className={s.page}>
      {/* ============ HEADER ============ */}
      <section className={s.header}>
        <div className="container">
          <Reveal>
            <Link to="/#work" className={s.back}>
              <Icon name="arrowRight" size={16} className={s.backIcon} />
              All work
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <h1 className={s.title}>{project.name}</h1>
            <p className={s.tagline}>{project.tagline}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className={s.meta}>
              <div className={s.metaCell}>
                <p className={s.metaLabel}>Timeline</p>
                <p className={s.metaValue}>{project.timeline}</p>
              </div>
              <div className={s.metaCell}>
                <p className={s.metaLabel}>Stack</p>
                <div className={s.metaStack}>
                  {stackShown.map((t) => (
                    <span key={t} className={s.stackChip}>
                      {t}
                    </span>
                  ))}
                  {stackHidden.length > 0 && (
                    <div
                      className={s.stackMore}
                      tabIndex={0}
                      aria-label={`${stackHidden.length} more: ${stackHidden.join(', ')}`}
                    >
                      <span className={s.stackMoreBtn}>+{stackHidden.length}</span>
                      <div className={s.stackPop} role="tooltip">
                        {stackHidden.map((t) => (
                          <span key={t} className={s.stackChip}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={s.metaCell}>
                <p className={s.metaLabel}>Links</p>
                {project.links.length ? (
                  project.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.metaLink}
                    >
                      {l.label}
                      <Icon name="arrowUpRight" size={14} />
                    </a>
                  ))
                ) : (
                  <p className={s.metaValue}>Private / NDA</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HERO IMAGE ============ */}
      {project.cover && (
        <section className={s.heroImgSection}>
          <div className="container">
            <Reveal>
              <img src={project.cover} alt={project.coverAlt} className={s.heroImg} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ OVERVIEW ============ */}
      <section className={`section--tight ${s.bodySection}`}>
        <Reveal>
          <div className={`container ${s.split}`}>
            <h2 className={s.splitTitle}>Overview</h2>
            <div className={s.splitBody}>
              {project.intro.map((p) => (
                <p key={p.slice(0, 24)} className={s.para}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ THE PROBLEM ============ */}
      {project.problem.length > 0 && (
        <section className={`section--tight ${s.problemSection}`}>
          <Reveal>
            <div className={`container ${s.split}`}>
              <h2 className={s.splitTitle}>The problem</h2>
              <div className={s.splitBody}>
                {project.problem.map((p) => (
                  <p key={p.slice(0, 24)} className={s.para}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ WHAT I BUILT ============ */}
      {project.features.length > 0 && (
        <section className="section--tight">
          <Reveal>
            <div className={`container ${s.split}`}>
              <h2 className={s.splitTitle}>What I built</h2>
              <div className={s.splitBody}>
                <ul className={s.featureList}>
                  {project.features.map((f) => (
                    <li key={f.title} className={s.featureItem}>
                      <h3 className={s.featureTitle}>{f.title}</h3>
                      <p className={s.featureDesc}>{f.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ UNDER THE HOOD ============ */}
      {project.warStory.length > 0 && (
        <section className="section--tight">
          <div className="container">
            <Reveal>
              <div className={s.story}>
                <div className={s.storyGrid}>
                  <h2 className={s.storyTitle}>Under the hood</h2>
                  <div>
                    {project.warStory.map((w, i) => (
                      <div key={w.title} className={s.storyItem}>
                        <span className={s.storyNum}>{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <h3 className={s.storyItemTitle}>{w.title}</h3>
                          <p className={s.storyItemDesc}>{w.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ INSIDE THE PRODUCT ============ */}
      {project.gallery.length > 0 && (
        <section className="section--tight">
          <div className="container">
            <Reveal>
              <h2 className={`h2 ${s.galleryTitle}`}>Inside the product</h2>
            </Reveal>
            <Reveal delay={80}>
              <Gallery
                key={slug}
                shots={project.gallery}
                label={`Screenshots of ${project.name}`}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ MORE PROJECTS ============ */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <h2 className={`h2 ${s.relatedTitle}`}>More projects</h2>
            </Reveal>
            <div className={s.relatedGrid}>
              {related.slice(0, 2).map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
