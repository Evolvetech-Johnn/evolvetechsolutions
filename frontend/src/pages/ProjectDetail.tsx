import type { FC } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import {
  getProjects,
  getProjectRealUrl,
} from "@domains/marketing/services/gateway";
import type { Project, ProjectResult } from "@shared/types";
import styles from "./ProjectDetail.module.css";

type StatusConfig = {
  color: string;
  label: string;
};

const platformIcons: Record<string, string> = {
  web: "🌐",
  mobile: "📱",
  desktop: "💻",
  api: "🔌",
  database: "🗄️",
  ai: "🤖",
  blockchain: "⛓️",
  iot: "🌐",
};

const statusConfig: Record<string, StatusConfig> = {
  completed: { color: "#10B981", label: "Concluído" },
  "in-progress": { color: "#F59E0B", label: "Em Andamento" },
  planning: { color: "#6B7280", label: "Planejamento" },
  maintenance: { color: "#3B82F6", label: "Manutenção" },
};

const getResultEntries = (results: ProjectResult | undefined) =>
  Object.entries(results ?? {}) as [string, string][];

const ProjectDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectUrl, setProjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const projectsResponse = await getProjects();
        const projectsList = projectsResponse?.data || [];
        setAllProjects(projectsList);

        const currentProject =
          projectsList.find((p) => String(p.id) === String(id)) ?? null;

        if (!currentProject) {
          setError("Projeto não encontrado");
          return;
        }

        setProject(currentProject);

        if (currentProject.liveUrl) {
          const fullUrl = currentProject.liveUrl.startsWith("http")
            ? currentProject.liveUrl
            : `https://${currentProject.liveUrl}`;
          setProjectUrl(fullUrl);
        } else {
          try {
            const urlResponse = await getProjectRealUrl(currentProject.id);
            if (urlResponse.success) {
              setProjectUrl(urlResponse.url);
            }
          } catch {}
        }
      } catch {
        setError("Erro ao carregar dados do projeto");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const getPreviousProject = () => {
    if (!allProjects.length || !project) return null;
    const currentIndex = allProjects.findIndex((p) => p.id === project.id);
    return currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  };

  const getNextProject = () => {
    if (!allProjects.length || !project) return null;
    const currentIndex = allProjects.findIndex((p) => p.id === project.id);
    return currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;
  };

  const handleNavigation = (projectId: string) => {
    navigate(`/portfolio/project/${projectId}`);
  };

  const handleBack = () => {
    navigate("/portfolio");
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="loading-spinner" />
        <p>Carregando projeto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Erro</h2>
        <p>{error}</p>
        <button
          onClick={handleBack}
          className={styles.backButton}
          aria-label="Voltar ao portfólio"
        >
          <ArrowLeft size={20} />
          Voltar ao Portfólio
        </button>
      </div>
    );
  }

  if (!project) return null;

  const status = statusConfig[project.status] || statusConfig.planning;
  const platformIcon = platformIcons[project.platform] || "🌐";
  const previousProject = getPreviousProject();
  const nextProject = getNextProject();
  const resultEntries = getResultEntries(project.results);

  return (
    <div className={styles.projectDetail}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.heroNavigation}>
              <button
                onClick={handleBack}
                className={styles.backButton}
                aria-label="Voltar ao portfólio"
              >
                <ArrowLeft size={20} />
                Voltar ao Portfólio
              </button>

              <div className={styles.heroNavButtons}>
                {previousProject && (
                  <button
                    onClick={() => handleNavigation(previousProject.id)}
                    className={styles.navButton}
                    title={`Projeto anterior: ${previousProject.name}`}
                  >
                    <ArrowLeft size={16} />
                    Anterior
                  </button>
                )}

                {nextProject && (
                  <button
                    onClick={() => handleNavigation(nextProject.id)}
                    className={styles.navButton}
                    title={`Próximo projeto: ${nextProject.name}`}
                  >
                    Próximo
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.heroHeader}>
              <div className={styles.heroIcon}>{platformIcon}</div>
              <div className={styles.heroText}>
                <div className={styles.heroMeta}>
                  <div className={styles.heroMetaPrimary}>
                    <span className={styles.heroCategory}>
                      {project.category}
                    </span>
                    <span
                      className={styles.heroStatus}
                      style={{
                        backgroundColor: `${status.color}20`,
                        color: status.color,
                        border: `1px solid ${status.color}30`,
                      }}
                    >
                      {status.label}
                    </span>
                    {project.liveUrl && (
                      <span className={styles.projectOnlineBadge}>
                        <span className={styles.projectOnlineBadgeDot} />
                        Online
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.heroMeta}>
                  <div className={styles.metaItem}>
                    <Calendar size={16} />
                    <span>{project.year}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={16} />
                    <span>{project.duration}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <User size={16} />
                    <span>{project.client}</span>
                  </div>
                </div>

                <div className={styles.heroActions}>
                  <h1 className={styles.heroTitle}>{project.name}</h1>
                  <p className={styles.heroSummary}>{project.summary}</p>

                  <div className={styles.heroDetails}>
                    <p>{project.description}</p>
                  </div>

                  {projectUrl && (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.heroLink}
                    >
                      <ExternalLink size={20} />
                      Ver Projeto
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.projectImage}>
        <div className={styles.projectImage__container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={project.image}
              alt={project.name}
              className={styles.projectImage__img}
            />
          </motion.div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <div className={styles.section}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.sectionTitle}>Sobre o Projeto</h2>
                <div className={styles.sectionContent}>
                  <p>{project.description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectTechnologies}>
        <div className={styles.projectTechnologies__container}>
          <motion.div
            className={styles.projectTechnologies__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectTechnologies__title}>
              Tecnologias Utilizadas
            </h2>
          </motion.div>

          <div className={styles.projectTechnologies__grid}>
            {project.technologies?.map((tech, index) => (
              <motion.div
                key={`${tech}-${index}`}
                className={styles.projectTechnologies__card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3>{tech}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projectFeatures}>
        <div className={styles.projectFeatures__container}>
          <motion.div
            className={styles.projectFeatures__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectFeatures__title}>
              Principais Funcionalidades
            </h2>
          </motion.div>

          <div className={styles.projectFeatures__grid}>
            {project.features?.map((feature, index) => (
              <motion.div
                key={`${feature}-${index}`}
                className={styles.projectFeatures__card}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p>{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projectHighlights}>
        <div className={styles.projectHighlights__container}>
          <motion.div
            className={styles.projectHighlights__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectHighlights__title}>
              Destaques do Projeto
            </h2>
          </motion.div>

          <div className={styles.projectHighlights__grid}>
            {project.highlights?.map((highlight, index) => (
              <motion.div
                key={`${highlight}-${index}`}
                className={styles.projectHighlights__card}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <p>{highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projectResults}>
        <div className={styles.projectResults__container}>
          <motion.div
            className={styles.projectResults__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectResults__title}>
              Resultados Alcançados
            </h2>
          </motion.div>

          <div className={styles.projectResults__grid}>
            {resultEntries.map(([metric, description], index) => (
              <motion.div
                key={`${metric}-${index}`}
                className={styles.projectResults__card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.resultCard__content}>
                  <h3>{metric}</h3>
                  <p>{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projectTestimonial}>
        <div className={styles.projectTestimonial__container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {project.testimonialDetails ? (
              <div className={styles.testimonial}>
                <blockquote>
                  &ldquo;{project.testimonialDetails.quote}&rdquo;
                </blockquote>
                <cite>
                  <strong>{project.testimonialDetails.author}</strong>
                  {project.testimonialDetails.role
                    ? `, ${project.testimonialDetails.role}`
                    : ""}
                </cite>
              </div>
            ) : (
              project.testimonial && (
                <div className={styles.testimonial}>
                  <blockquote>&ldquo;{project.testimonial}&rdquo;</blockquote>
                  <cite>
                    <strong>{project.client}</strong>
                  </cite>
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      <section className={styles.projectNavigation}>
        <div className={styles.projectNavigation__container}>
          <div className={styles.projectNavigation__content}>
            {previousProject && (
              <motion.button
                onClick={() => handleNavigation(previousProject.id)}
                className={`${styles.projectNavCard} ${styles.projectNavCard__prev}`}
                whileHover={{ x: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
                <div className={styles.projectNavCard__content}>
                  <span className={styles.projectNavCard__label}>
                    Projeto Anterior
                  </span>
                  <span className={styles.projectNavCard__title}>
                    {previousProject.name}
                  </span>
                  {previousProject.liveUrl && (
                    <span className={styles.projectOnlineBadge}>
                      <span className={styles.projectOnlineBadgeDot} />
                      Online
                    </span>
                  )}
                </div>
              </motion.button>
            )}

            {nextProject && (
              <motion.button
                onClick={() => handleNavigation(nextProject.id)}
                className={`${styles.projectNavCard} ${styles.projectNavCard__next}`}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.projectNavCard__content}>
                  <span className={styles.projectNavCard__label}>
                    Próximo Projeto
                  </span>
                  <span className={styles.projectNavCard__title}>
                    {nextProject.name}
                  </span>
                  {nextProject.liveUrl && (
                    <span className={styles.projectOnlineBadge}>
                      <span className={styles.projectOnlineBadgeDot} />
                      Online
                    </span>
                  )}
                </div>
                <ArrowRight size={20} />
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
