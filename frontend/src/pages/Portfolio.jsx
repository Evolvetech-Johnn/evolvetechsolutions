import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Server, 
  ShoppingCart,
  BarChart3,
  Globe,
  Filter,
  Search,
  Loader
} from 'lucide-react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import ProjectModal from '../components/ProjectModal';
import styles from './Portfolio.module.css';

const Portfolio = () => {
  const [platforms, setPlatforms] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const platformIcons = {
    'web': Code,
    'mobile': Smartphone,
    'api': Server,
    'ecommerce': ShoppingCart,
    'dashboard': BarChart3,
    'sites': Globe
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [platformsRes, projectsRes] = await Promise.all([
          fetch(buildApiUrl(API_ENDPOINTS.platforms)),
          fetch(buildApiUrl(API_ENDPOINTS.projects))
        ]);

        if (!platformsRes.ok || !projectsRes.ok) {
          throw new Error('Erro ao carregar dados');
        }

        const platformsData = await platformsRes.json();
        const projectsData = await projectsRes.json();

        setPlatforms(platformsData.data || []);
        setProjects(projectsData.data || []);
        setFilteredProjects(projectsData.data || []);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Não foi possível carregar o portfólio. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(project => project.platform === selectedPlatform);
    }

    setFilteredProjects(filtered);
  }, [selectedPlatform, projects]);

  const handleProjectClick = async (project) => {
    // Fetch full project details if needed
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.projectById(project.id)));
      const data = await response.json();
      
      if (data.success) {
        setSelectedProject(data.data);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Erro ao carregar projeto:', err);
      // Fallback to basic project data
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader className={styles.spinner} size={48} />
        <p>Carregando portfólio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateTitle}>Erro ao carregar portfólio</div>
        <p className={styles.emptyStateDescription}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.loadMoreButton}
          aria-label="Recarregar página"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.portfolio}>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="Seção de introdução do portfólio">
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>Nosso Portfólio</h1>
            <p className={styles.heroSubtitle}>
              Conheça nossos projetos e as soluções que desenvolvemos para nossos clientes. 
              Cada projeto é único e desenvolvido com as melhores práticas do mercado.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{projects.length}+</span>
                <span className={styles.heroStatLabel}>Projetos</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>30+</span>
                <span className={styles.heroStatLabel}>Clientes</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{platforms.length}</span>
                <span className={styles.heroStatLabel}>Plataformas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className={styles.filters} aria-label="Filtros de projetos">
        <div className={styles.filtersContainer}>
          <h2 className={styles.filtersTitle}>Filtrar por Plataforma</h2>
          
          <div className={styles.filterButtons} role="group" aria-label="Filtros de plataforma">
            <button
              className={`${styles.filterButton} ${selectedPlatform === 'all' ? styles.filterButtonActive : ''}`}
              onClick={() => setSelectedPlatform('all')}
              aria-pressed={selectedPlatform === 'all'}
            >
              <Filter size={16} aria-hidden="true" />
              Todos os Projetos
            </button>
            {platforms.map((platform) => {
              const IconComponent = platformIcons[platform.id] || Code;
              return (
                <button
                  key={platform.id}
                  className={`${styles.filterButton} ${selectedPlatform === platform.id ? styles.filterButtonActive : ''}`}
                  onClick={() => setSelectedPlatform(platform.id)}
                  aria-pressed={selectedPlatform === platform.id}
                >
                  <IconComponent size={16} aria-hidden="true" />
                  {platform.name}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Search className={styles.emptyStateIcon} />
                <h3 className={styles.emptyStateTitle}>Nenhum projeto encontrado</h3>
                <p className={styles.emptyStateDescription}>
                  Não encontramos projetos para os filtros selecionados. Tente ajustar os filtros.
                </p>
              </motion.div>
            ) : (
              <motion.div
                className={styles.projectsGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => handleProjectClick(project)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleProjectClick(project);
                      }
                    }}
                    aria-label={`Ver detalhes do projeto ${project.name}`}
                  >
                    <div className={styles.projectImageWrapper}>
                      <img
                        src={project.image || '/api/placeholder/400/240'}
                        alt={`Screenshot do projeto ${project.name}`}
                        className={styles.projectImage}
                        loading="lazy"
                      />
                      <div className={styles.projectOverlay}>
                        <span className={styles.viewProject}>Ver Projeto</span>
                      </div>
                    </div>
                    <div className={styles.projectContent}>
                      <h3 className={styles.projectTitle}>{project.name}</h3>
                      <p className={styles.projectCategory}>{project.category}</p>
                      <p className={styles.projectDescription}>{project.summary || project.description}</p>
                      
                      {project.technologies && (
                        <div className={styles.projectTags}>
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span key={techIndex} className={styles.projectTag}>
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className={styles.projectTag}>
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className={styles.projectFooter}>
                        <span className={styles.projectYear}>
                          {project.year || new Date(project.createdAt).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
};

export default Portfolio;
