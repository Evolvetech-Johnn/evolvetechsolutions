import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader } from 'lucide-react';
import styles from './ProjectModal.module.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
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
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Fechar modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Project Info */}
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
                      {project.features.slice(0, 5).map((feature, index) => (
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
                    onClick={() => {
                      // This will be populated with actual URL from API in production
                      window.open(`https://${project.url ||'example.com'}`, '_blank');
                    }}
                  >
                    <ExternalLink size={20} />
                    Visitar Site
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
