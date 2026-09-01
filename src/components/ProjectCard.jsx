import { Link } from 'react-router-dom'
import { Icon } from './icons'
import s from './ProjectCard.module.css'

export function ProjectCard({ project, featured = false }) {
  const cls = featured ? `${s.card} ${s.cardFeatured}` : s.card

  return (
    <article className={cls}>
      <Link
        to={`/projects/${project.slug}`}
        className={s.cardLink}
        aria-label={`${project.name}: view project`}
      >
        <div className={s.media}>
          {project.cover ? (
            <img src={project.cover} alt={project.coverAlt} loading="lazy" />
          ) : (
            <div className={s.mediaFallback} aria-hidden="true">
              {project.name.charAt(0)}
            </div>
          )}
        </div>

        <div className={s.body}>
          <h3 className={s.title}>{project.name}</h3>
          <p className={s.blurb}>{project.blurb}</p>
          <span className={s.more}>
            View project
            <Icon name="arrowUpRight" size={17} />
          </span>
        </div>
      </Link>
    </article>
  )
}
