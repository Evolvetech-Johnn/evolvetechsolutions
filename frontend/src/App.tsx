import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/globals.css";

const App: FC = () => (
  <ErrorBoundary>
    <div className="app">
      <div className="bg-glow" style={{ top: '-10%', left: '-10%' }} />
      <div className="bg-glow" style={{ bottom: '-10%', right: '-10%', animationDelay: '-5s' }} />
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <main id="main-content" className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  </ErrorBoundary>
);

export default App;
