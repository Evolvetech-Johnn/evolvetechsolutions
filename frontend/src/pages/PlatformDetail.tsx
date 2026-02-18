import type { FC } from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code,
  Smartphone,
  Server,
  ShoppingCart,
  BarChart3,
  Globe,
  CheckCircle,
  ExternalLink,
  Eye,
} from "lucide-react";
import {
  getPlatformById,
  getProjects,
} from "@domains/marketing/services/gateway";
import type { Platform, Project } from "@shared/types";
import styles from "./PlatformDetail.module.css";
import { t } from "@app/i18n";

type PlatformWithTechnologies = Omit<Platform, "technologies"> & {
  technologies?: Array<string | { name: string; description?: string }>;
};

type PlatformProject = Project & {
  title?: string;
  liveUrl?: string;
};

const platformIcons: Record<string, typeof Code> = {
  "web-applications": Code,
  "mobile-apps": Smartphone,
  "apis-backend": Server,
  "e-commerce": ShoppingCart,
  "dashboards-bi": BarChart3,
  "institutional-websites": Globe,
};

const platformColors: Record<string, string> = {
  "web-applications": "var(--accent-blue)",
  "mobile-apps": "var(--accent-green)",
  "apis-backend": "var(--accent-purple)",
  "e-commerce": "var(--accent-orange)",
  "dashboards-bi": "var(--accent-red)",
  "institutional-websites": "var(--accent-teal)",
};

const PlatformDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [platform, setPlatform] = useState<PlatformWithTechnologies | null>(
    null,
  );
  const [projects, setProjects] = useState<PlatformProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [platformResponse, projectsResponse] = await Promise.all([
          getPlatformById(id ?? ""),
          getProjects({ platform: id }),
        ]);
        setPlatform(
          (platformResponse?.data || null) as PlatformWithTechnologies,
        );
        setProjects((projectsResponse?.data || []) as PlatformProject[]);
      } catch {
        setError(t("platformDetail.errorLoading"));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (error || !platform) {
    return (
      <div className={styles.error}>
        <h2 className={styles.errorTitle}>{t("platformDetail.errorTitle")}</h2>
        <p className={styles.errorDescription}>
          {error || t("platformDetail.errorNotFound")}
        </p>
        <Link to="/portfolio" className={styles.errorButton}>
          <ArrowLeft size={16} />
          {t("platformDetail.backToPortfolio")}
        </Link>
      </div>
    );
  }

  const IconComponent =
    platformIcons[platform.id as keyof typeof platformIcons] || Code;
  const color =
    platformColors[platform.id as keyof typeof platformColors] ||
    "var(--accent-blue)";

  return (
    <div className={styles.platformDetail}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <div className={styles.heroIcon} style={{ color }}>
                  <IconComponent size={60} />
                </div>
                <h1 className={styles.heroTitle}>{platform.name}</h1>
                <p className={styles.heroSubtitle}>{platform.summary}</p>
                <div className={styles.heroStats}>
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNumber}>
                      {projects.length}
                    </span>
                    <span className={styles.heroStatLabel}>
                      {t("platformDetail.heroProjects")}
                    </span>
                  </div>
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNumber}>5+</span>
                    <span className={styles.heroStatLabel}>
                      {t("platformDetail.heroYears")}
                    </span>
                  </div>
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNumber}>100%</span>
                    <span className={styles.heroStatLabel}>
                      {t("platformDetail.heroSuccess")}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.heroImage}>
                <div className={styles.heroImagePlaceholder}>
                  <IconComponent size={120} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.overview}>
        <div className={styles.overviewContainer}>
          <div className={styles.overviewGrid}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>{t("platformDetail.aboutTitle")}</h2>
              <p>{platform.description}</p>
              <ul className={styles.overviewFeatures}>
                <li>
                  <CheckCircle size={20} />
                  Desenvolvimento ágil e eficiente
                </li>
                <li>
                  <CheckCircle size={20} />
                  Tecnologias modernas e atualizadas
                </li>
                <li>
                  <CheckCircle size={20} />
                  Suporte completo e manutenção
                </li>
                <li>
                  <CheckCircle size={20} />
                  Escalabilidade e performance
                </li>
              </ul>
            </motion.div>
            <div className={styles.overviewImage}>
              <div className={styles.overviewImagePlaceholder}>
                <IconComponent size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.technologies}>
        <div className={styles.technologiesContainer}>
          <motion.div
            className={styles.technologiesHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{t("platformDetail.technologiesTitle")}</h2>
            <p>{t("platformDetail.technologiesDescription")}</p>
          </motion.div>

          <div className={styles.technologiesGrid}>
            {platform.technologies?.map((tech, index) => {
              const name = typeof tech === "string" ? tech : tech?.name;
              const description =
                typeof tech === "string" ? "" : tech?.description;
              return (
                <motion.div
                  key={`${name}-${index}`}
                  className={styles.technologyCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.technologyIcon}>
                    <Code size={40} />
                  </div>
                  <h3>{name}</h3>
                  {description ? <p>{description}</p> : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.projects}>
        <div className={styles.projectsContainer}>
          <motion.div
            className={styles.projectsHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{t("platformDetail.projectsTitle")}</h2>
            <p>{t("platformDetail.projectsDescription")}</p>
          </motion.div>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => {
              const liveUrl = project.liveUrl
                ? project.liveUrl.startsWith("http")
                  ? project.liveUrl
                  : `https://${project.liveUrl}`
                : null;

              return (
                <motion.div
                  key={project.id}
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() =>
                    window.open(`/portfolio/project/${project.id}`, "_blank")
                  }
                >
                  <img
                    src={project.image || "/api/placeholder/400/240"}
                    alt={project.name}
                    className={styles.projectImage}
                  />
                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.name}</h3>
                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>

                    <div className={styles.projectTags}>
                      {project.technologies
                        ?.slice(0, 3)
                        .map((tech, techIndex) => (
                          <span key={techIndex} className={styles.projectTag}>
                            {tech}
                          </span>
                        ))}
                    </div>

                    <div className={styles.projectFooter}>
                      <span className={styles.projectDate}>
                        {new Date(project.createdAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </span>
                      <div className={styles.projectLinks}>
                        <Link
                          to={`/portfolio/project/${project.id}`}
                          className={styles.projectLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye size={16} />
                        </Link>
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLink}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Abrir site do projeto ${project.name} em uma nova aba`}
                            title={`Abrir site do projeto ${project.name}`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>{t("platformDetail.ctaTitle")}</h2>
            <p className={styles.ctaDescription}>
              {t("platformDetail.ctaSubtitle")}
            </p>
            <div className={styles.ctaButtons}>
              <Link
                to="/contact"
                className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
              >
                {t("platformDetail.ctaPrimary")}
              </Link>
              <Link
                to="/portfolio"
                className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
              >
                {t("platformDetail.ctaSecondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PlatformDetail;
