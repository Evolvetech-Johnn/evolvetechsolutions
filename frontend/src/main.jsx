import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './styles/globals.css'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home.jsx'))
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'))
const PlatformDetail = lazy(() => import('./pages/PlatformDetail.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

// Loading component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: '1.25rem',
    color: 'var(--primary-600)'
  }}>
    <span>Carregando...</span>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<PageLoader />}><Home /></Suspense>
      },
      {
        path: 'portfolio',
        element: <Suspense fallback={<PageLoader />}><Portfolio /></Suspense>
      },
      {
        path: 'portfolio/:platformId',
        element: <Suspense fallback={<PageLoader />}><PlatformDetail /></Suspense>
      },
      {
        path: 'portfolio/project/:id',
        element: <Suspense fallback={<PageLoader />}><ProjectDetail /></Suspense>
      },
      {
        path: 'about',
        element: <Suspense fallback={<PageLoader />}><About /></Suspense>
      },
      {
        path: 'contact',
        element: <Suspense fallback={<PageLoader />}><Contact /></Suspense>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
