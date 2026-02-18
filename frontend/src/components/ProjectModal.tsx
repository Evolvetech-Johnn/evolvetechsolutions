import type { FC, MouseEvent, KeyboardEvent } from "react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader, Info, Monitor } from "lucide-react";
import type { Project, ProjectResult } from "@shared/types";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";
import styles from "./ProjectModal.module.css";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

type UrlResponse = {
  success: boolean;
  url?: string;
};

const ProjectModal: FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [showIframe, setShowIframe] = useState(false);
  const [projectUrl, setProjectUrl] = useState<string | null>(null);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent | KeyboardEventInit | any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape as any);
      document.body.style.overflow = "hidden";
    } else {
      setShowIframe(false);
      setProjectUrl(null);
      setLoadingUrl(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape as any);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const loadProjectUrl = async () => {
    if (!project || projectUrl) return;

    setLoadingUrl(true);
    try {
      const url = buildApiUrl(API_ENDPOINTS.projectUrl(project.id));
      const response = await fetch(url);
      const data = (await response.json()) as UrlResponse;

      if (data.success && data.url) {
        const fullUrl = data.url.startsWith("http")
          ? data.url
          : `https://${data.url}`;
        setProjectUrl(fullUrl);
      }
    } catch {
    } finally {
      setLoadingUrl(false);
    }
  };

  const handleViewSite = () => {
    setShowIframe(true);
    loadProjectUrl();
  };

  const handleBackToInfo = () => {
    setShowIframe(false);
  };

  if (!project) return null;

  const resultEntries = Object.entries(project.results ?? {}) as [
    string,
    string,
  ][];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <h2>{project.name}</h2>
                <span className={styles.modalCategory}>{project.category}</span>
              </div>
              <div className={styles.headerButtons}>
                {showIframe && (
                  <button
                    className={styles.backButton}
                    onClick={handleBackToInfo}
                    aria-label="Voltar para informações"
                    title="Ver informações do projeto"
                  >
                    <Info size={20} />
                  </button>
                )}
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Fechar modal"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className={styles.modalBody}>
              {!showIframe ? (
                <div className={styles.projectInfo}>
                  <p className={styles.description}>{project.description}</p>

                  {project.technologies && (
                    <div className={styles.technologies}>
                      <h3>Tecnologias</h3>
                      <div className={styles.techTags}>
                        {project.technologies.map((tech) => (
                          <span key={tech} className={styles.techTag}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.features && (
                    <div className={styles.features}>
                      <h3>Funcionalidades</h3>
                      <ul>
                        {project.features.slice(0, 6).map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resultEntries.length > 0 && (
                    <div className={styles.results}>
                      <h3>Resultados</h3>
                      <div className={styles.resultCards}>
                        {resultEntries.map(([key, value]) => (
                          <div key={key} className={styles.resultCard}>
                            <div className={styles.resultValue}>{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.modalActions}>
                    <motion.button
                      className={styles.viewSiteButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleViewSite}
                    >
                      <Monitor size={20} />
                      Visualizar Site
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className={styles.iframeContainer}>
                  {loadingUrl ? (
                    <div className={styles.loadingIframe}>
                      <Loader className={styles.spinner} size={48} />
                      <p>Carregando preview...</p>
                    </div>
                  ) : projectUrl ? (
                    <iframe
                      ref={iframeRef}
                      src={projectUrl}
                      className={styles.projectIframe}
                      title={`Preview de ${project.name}`}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.iframeError}>
                      <p>Não foi possível carregar o preview do site.</p>
                      <button
                        onClick={loadProjectUrl}
                        className={styles.retryButton}
                      >
                        Tentar novamente
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
