import { Link } from 'react-router-dom'
import { usePageTitle } from '../utils/ui'
import s from './Blogs.module.css'

export function Blogs() {
  usePageTitle('Blogs · Mubarak Olanrewaju')

  return (
    <section className={s.page}>
      <div className={`container ${s.inner}`}>
        <h1 className={s.title}>
          Blogs<span className={s.dot}>.</span>
        </h1>
        <p className={s.soon}>Coming soon.</p>
        <Link to="/" className={`btn btn--primary ${s.back}`}>
          Back to home
        </Link>
      </div>
    </section>
  )
}
