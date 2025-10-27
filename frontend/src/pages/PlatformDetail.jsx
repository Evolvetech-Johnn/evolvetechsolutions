import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  Eye
} from 'lucide-react'
import axios from 'axios'
import styles from './PlatformDetail.module.css'

const PlatformDetail = () => {
  const { id } = useParams()
  const [platform, setPlatform] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const platformIcons = {
    'web-applications': Code,
    'mobile-apps': Smartphone,
    'apis-backend': Server,
    'e-commerce': ShoppingCart,
    'dashboards-bi': BarChart3,
    'institutional-websites': Globe
  }

  const platformColors = {
    'web-applications': 'var(--accent-blue)',
    'mobile-apps': 'var(--accent-green)',
    'apis-backend': 'var(--accent-purple)',
    'e-commerce': 'var(--accent-orange)',
    'dashboards-bi': 'var(--accent-red)',
    'institutional-websites': 'var(--accent-teal)'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [platformResponse, projectsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/platforms/${id}`),
          axios.get(`http://localhost:5000/api/projects?platform=${id}`)
        ])
        
        setPlatform(platformResponse.data.data)
        setProjects(projectsResponse.data.data || [])
      } catch {
        setError('Erro ao carregar dados da plataforma')
        // Error fetching platform data
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  if (error || !platform) {
    return (
      <div className={styles.error}>
        <h2 className={styles.errorTitle}>Erro ao carregar plataforma</h2>
        <p className={styles.errorDescription}>{error || 'Plataforma não encontrada'}</p>
        <Link to="/portfolio" className={styles.errorButton}>
          <ArrowLeft size={16} />
          Voltar ao Portfólio
        </Link>
      </div>
    )
  }

  const IconComponent = platformIcons[platform.id] || Code
  const color = platformColors[platform.id] || 'var(--accent-blue)'

  return (
    <div className={styles.platformDetail}>
      {/* Hero Section */}
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
                    <span className={styles.heroStatNumber}>{projects.length}</span>
                    <span className={styles.heroStatLabel}>Projetos</span>
                  </div>
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNumber}>5+</span>
                    <span className={styles.heroStatLabel}>Anos</span>
                  </div>
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNumber}>100%</span>
                    <span className={styles.heroStatLabel}>Sucesso</span>
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

      {/* Overview Section */}
      <section className={styles.overview}>
        <div className={styles.overviewContainer}>
          <div className={styles.overviewGrid}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Sobre esta Plataforma</h2>
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

      {/* Technologies Section */}
      <section className={styles.technologies}>
        <div className={styles.technologiesContainer}>
          <motion.div
            className={styles.technologiesHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Tecnologias Utilizadas</h2>
            <p>Conheça as principais tecnologias que utilizamos nesta plataforma</p>
          </motion.div>

          <div className={styles.technologiesGrid}>
            {platform.technologies?.map((tech, index) => (
              <motion.div
                key={tech.name}
                className={styles.technologyCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.technologyIcon}>
                  <Code size={40} />
                </div>
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.projects}>
        <div className={styles.projectsContainer}>
          <motion.div
            className={styles.projectsHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Projetos Realizados</h2>
            <p>Veja alguns dos projetos que desenvolvemos nesta plataforma</p>
          </motion.div>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => window.open(`/portfolio/project/${project.id}`, '_blank')}
              >
                <img
                  src={project.image || '/api/placeholder/400/240'}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.projectTags}>
                    {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className={styles.projectTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className={styles.projectFooter}>
                    <span className={styles.projectDate}>
                      {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <div className={styles.projectLinks}>
                      <Link
                        to={`/portfolio/project/${project.id}`}
                        className={styles.projectLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye size={16} />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>Interessado nesta plataforma?</h2>
            <p className={styles.ctaDescription}>
              Entre em contato conosco e vamos conversar sobre como podemos ajudar seu projeto
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                Falar com Especialista
              </Link>
              <Link to="/portfolio" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                Ver Mais Projetos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PlatformDetail
