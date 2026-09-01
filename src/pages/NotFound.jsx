import { Link } from 'react-router-dom'
import { usePageTitle } from '../utils/ui'
import s from './NotFound.module.css'

export function NotFound() {
  usePageTitle('Page not found · Mubarak Olanrewaju')

  return (
    <section className={s.wrap}>
      <div className="container">
        <p className={s.code}>404</p>
        <h1 className={s.title}>Wrong door.</h1>
        <p className={s.sub}>
          This page is not in the build, but the work is.
        </p>
        <Link to="/" className="btn btn--primary">
          Back to the good stuff
        </Link>
      </div>
    </section>
  )
}
