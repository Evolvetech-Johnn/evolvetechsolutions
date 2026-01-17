import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader, Info, Monitor } from 'lucide-react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import styles from './ProjectModal.module.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [showIframe, setShowIframe] = useState(false);
  const [projectUrl, setProjectUrl] = useState(null);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Fetch real URL when iframe mode is activated
  const loadProjectUrl = async () => {
    if (!project || projectUrl) return;
    
    setLoadingUrl(true);
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.projectUrl(project.id)));
      const data = await response.json();
      
      if (data.success && data.url) {
        setProjectUrl(`https://${data.url}`);
      }
    } catch (error) {
      console.error('Erro ao carregar URL do projeto:', error);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
                /* Project Information View */
                <div className={styles.projectInfo}>
                  <p className={styles.description}>{project.description}</p>
                  
                  {project.technologies && (
                    <div className={styles.technologies}>
                      <h3>Tecnologias</h3>
                      <div className={styles.techTags}>
                        {project.technologies.map((tech, index) => (
                          <span key={index} className={styles.techTag}>
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
                        {project.features.slice(0, 6).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.results && (
                    <div className={styles.results}>
                      <h3>Resultados</h3>
                      <div className={styles.resultCards}>
                        {Object.entries(project.results).map(([key, value]) => (
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
                /* Iframe Preview View */
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
                      <button onClick={loadProjectUrl} className={styles.retryButton}>
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
