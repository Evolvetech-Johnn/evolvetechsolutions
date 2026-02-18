import type { FC } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Smartphone,
  Server,
  ShoppingCart,
  BarChart3,
  Globe,
  Filter,
  Search,
  Loader,
  ExternalLink,
} from "lucide-react";
import type { Platform, Project } from "@shared/types";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";
import ProjectModal from "../components/ProjectModal";
import styles from "./Portfolio.module.css";
import { t } from "@app/i18n";

type ApiListResponse<T> = {
  success: boolean;
  data: T;
};

const Portfolio: FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const platformIcons: Record<string, typeof Code> = {
    web: Code,
    mobile: Smartphone,
    api: Server,
    ecommerce: ShoppingCart,
    dashboard: BarChart3,
    sites: Globe,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [platformsRes, projectsRes] = await Promise.all([
          fetch(buildApiUrl(API_ENDPOINTS.platforms)),
          fetch(buildApiUrl(API_ENDPOINTS.projects)),
        ]);

        if (!platformsRes.ok || !projectsRes.ok) {
          throw new Error("Erro ao carregar dados");
        }

        const platformsData: ApiListResponse<Platform[]> =
          await platformsRes.json();
        const projectsData: ApiListResponse<Project[]> =
          await projectsRes.json();

        const platformsList = platformsData.data || [];
        const projectsList = projectsData.data || [];

        setPlatforms(platformsList);
        setProjects(projectsList);
        setFilteredProjects(projectsList);
      } catch (err) {
        setError(
          "Não foi possível carregar o portfólio. Tente novamente mais tarde.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedPlatform !== "all") {
      filtered = filtered.filter(
        (project) => project.platform === selectedPlatform,
      );
    }

    setFilteredProjects(filtered);
  }, [selectedPlatform, projects]);

  const liveProjects = projects
    .filter((project) => project.liveUrl)
    .sort((a, b) => {
      const yearA =
        a.year || new Date(a.createdAt).getFullYear();
      const yearB =
        b.year || new Date(b.createdAt).getFullYear();
      return yearB - yearA;
    })
    .slice(0, 4);

  const handleProjectClick = async (project: Project) => {
    try {
      const response = await fetch(
        buildApiUrl(API_ENDPOINTS.projectById(project.id)),
      );
      const data: ApiListResponse<Project> = await response.json();

      if (data.success) {
        setSelectedProject(data.data);
        setIsModalOpen(true);
      }
    } catch {
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
      <section
        className={styles.hero}
        aria-label="Seção de introdução do portfólio"
      >
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>{t("portfolio.title")}</h1>
            <p className={styles.heroSubtitle}>{t("portfolio.subtitle")}</p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>
                  {projects.length}+
                </span>
                <span className={styles.heroStatLabel}>Projetos</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>30+</span>
                <span className={styles.heroStatLabel}>Clientes</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>
                  {platforms.length}
                </span>
                <span className={styles.heroStatLabel}>Plataformas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {liveProjects.length > 0 && (
        <section
          className={styles.liveSection}
          aria-label="Projetos em produção"
        >
          <div className={styles.liveSectionContainer}>
            <motion.div
              className={styles.liveSectionHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className={styles.liveSectionKicker}>
                {t("portfolio.liveKicker")}
              </span>
              <h2 className={styles.liveSectionTitle}>
                {t("portfolio.liveTitle")}
              </h2>
              <p className={styles.liveSectionSubtitle}>
                {t("portfolio.liveSubtitle")}
              </p>
            </motion.div>

            <div className={styles.liveProjectsGrid}>
              {liveProjects.map((project) => {
                const year =
                  project.year ||
                  new Date(project.createdAt).getFullYear();
                const liveUrl = project.liveUrl
                  ? project.liveUrl.startsWith("http")
                    ? project.liveUrl
                    : `https://${project.liveUrl}`
                  : "";

                return (
                  <article
                    key={project.id}
                    className={styles.liveProjectCard}
                  >
                    <div className={styles.liveProjectHeader}>
                      <div className={styles.projectLiveBadge}>
                        <span
                          className={styles.projectLiveBadgeDot}
                        />
                        Online
                      </div>
                      <span className={styles.liveProjectYear}>
                        {year}
                      </span>
                    </div>

                    <h3 className={styles.liveProjectTitle}>
                      {project.name}
                    </h3>
                    <p className={styles.liveProjectCategory}>
                      {project.category}
                    </p>
                    <p className={styles.liveProjectDescription}>
                      {project.summary || project.description}
                    </p>

                    {liveUrl && (
                      <div className={styles.liveProjectFooter}>
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLiveLink}
                        >
                          <ExternalLink size={14} />
                          {t("portfolio.liveViewSite")}
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={styles.filters} aria-label="Filtros de projetos">
        <div className={styles.filtersContainer}>
          <h2 className={styles.filtersTitle}>{t("portfolio.filtersTitle")}</h2>

          <div
            className={styles.filterButtons}
            role="group"
            aria-label="Filtros de plataforma"
          >
            <button
              className={`${styles.filterButton} ${selectedPlatform === "all" ? styles.filterButtonActive : ""}`}
              onClick={() => setSelectedPlatform("all")}
              aria-pressed={selectedPlatform === "all"}
            >
              <Filter size={16} aria-hidden />
              Todos os Projetos
            </button>
            {platforms.map((platform) => {
              const IconComponent =
                platformIcons[platform.id as keyof typeof platformIcons] ||
                Code;
              return (
                <button
                  key={platform.id}
                  className={`${styles.filterButton} ${selectedPlatform === platform.id ? styles.filterButtonActive : ""}`}
                  onClick={() => setSelectedPlatform(platform.id)}
                  aria-pressed={selectedPlatform === platform.id}
                >
                  <IconComponent size={16} aria-hidden />
                  {platform.name}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Search className={styles.emptyStateIcon} />
                <h3 className={styles.emptyStateTitle}>
                  {t("portfolio.emptyTitle")}
                </h3>
                <p className={styles.emptyStateDescription}>
                  {t("portfolio.emptyDescription")}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleProjectClick(project);
                      }
                    }}
                    aria-label={`Ver detalhes do projeto ${project.name}`}
                  >
                    <div className={styles.projectImageWrapper}>
                      {project.liveUrl && (
                        <div className={styles.projectLiveBadge}>
                          <span className={styles.projectLiveBadgeDot} />
                          Online
                        </div>
                      )}
                      <img
                        src={project.image || "/api/placeholder/400/240"}
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
                      <p className={styles.projectCategory}>
                        {project.category}
                      </p>
                      <p className={styles.projectDescription}>
                        {project.summary || project.description}
                      </p>

                      {project.technologies && (
                        <div className={styles.projectTags}>
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className={styles.projectTag}>
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
                          {project.year ||
                            new Date(project.createdAt).getFullYear()}
                        </span>

                        {project.liveUrl && (
                          <a
                            href={
                              project.liveUrl.startsWith("http")
                                ? project.liveUrl
                                : `https://${project.liveUrl}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLiveLink}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={14} />
                            Ver site
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

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
