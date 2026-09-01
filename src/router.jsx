import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Project } from './pages/Project'
import { Blogs } from './pages/Blogs'
import { NotFound } from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects/:slug', element: <Project /> },
      { path: 'blogs', element: <Blogs /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
