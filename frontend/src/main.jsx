import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import PlatformDetail from './pages/PlatformDetail.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './styles/globals.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'portfolio',
        element: <Portfolio />
      },
      {
        path: 'portfolio/:platformId',
        element: <PlatformDetail />
      },
      {
        path: 'portfolio/project/:id',
        element: <ProjectDetail />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
