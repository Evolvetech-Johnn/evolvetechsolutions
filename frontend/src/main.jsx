import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./styles/globals.css";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const PlatformDetail = lazy(() => import("./pages/PlatformDetail.tsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));

// Loading component
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      fontSize: "1.25rem",
      color: "var(--primary-600)",
    }}
  >
    <span>Carregando...</span>
  </div>
);

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "portfolio",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: "portfolio/:platformId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PlatformDetail />
          </Suspense>
        ),
      },
      {
        path: "portfolio/project/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectDetail />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
];

const router =
  typeof window !== "undefined" ? createBrowserRouter(routes) : null;

const rootElement =
  typeof document !== "undefined" ? document.getElementById("root") : null;

if (rootElement && router) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
