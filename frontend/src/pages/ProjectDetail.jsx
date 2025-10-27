import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Clock, User } from 'lucide-react'
import axios from 'axios'
import styles from './ProjectDetail.module.css'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [projectUrl, setProjectUrl] = useState(null)

  // Platform icons mapping
  const platformIcons = {
    web: '🌐',
    mobile: '📱',
    desktop: '💻',
    api: '🔌',
    database: '🗄️',
    ai: '🤖',
    blockchain: '⛓️',
    iot: '🌐'
  }

  // Status colors and labels
  const statusConfig = {
    completed: { color: '#10B981', label: 'Concluído' },
    'in-progress': { color: '#F59E0B', label: 'Em Andamento' },
    planning: { color: '#6B7280', label: 'Planejamento' },
    maintenance: { color: '#3B82F6', label: 'Manutenção' }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch all projects first
        const projectsResponse = await axios.get('http://localhost:5000/api/projects')
        const projects = projectsResponse.data.data || []
        setAllProjects(projects)
        
        // Find the specific project
        const currentProject = projects.find(p => p.id === parseInt(id))
        
        if (!currentProject) {
          setError('Projeto não encontrado')
          return
        }
        
        setProject(currentProject)
        
        // Fetch project URL
        try {
          const urlResponse = await axios.get(`http://localhost:5000/api/internal/projects/${currentProject.id}/url`)
          if (urlResponse.data.success) {
            setProjectUrl(urlResponse.data.url)
          }
        } catch (error) {
          console.log(`URL não disponível para o projeto ${currentProject.id}`)
        }
      } catch {
        setError('Erro ao carregar dados do projeto')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const getPreviousProject = () => {
    if (!allProjects.length || !project) return null
    const currentIndex = allProjects.findIndex(p => p.id === project.id)
    return currentIndex > 0 ? allProjects[currentIndex - 1] : null
  }

  const getNextProject = () => {
    if (!allProjects.length || !project) return null
    const currentIndex = allProjects.findIndex(p => p.id === project.id)
    return currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null
  }

  const handleNavigation = (projectId) => {
    navigate(`/portfolio/project/${projectId}`)
  }

  const handleBack = () => {
    navigate('/portfolio')
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="loading-spinner"></div>
        <p>Carregando projeto...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Erro</h2>
        <p>{error}</p>
        <button onClick={handleBack} className={styles.backButton} aria-label="Voltar ao portfólio">
          <ArrowLeft size={20} />
          Voltar ao Portfólio
        </button>
      </div>
    )
  }

  if (!project) return null

  const status = statusConfig[project.status] || statusConfig.planning
  const platformIcon = platformIcons[project.platform] || '🌐'
  const previousProject = getPreviousProject()
  const nextProject = getNextProject()

  return (
    <div className={styles.projectDetail}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Navigation */}
            <div className={styles.heroNavigation}>
              <button onClick={handleBack} className={styles.backButton} aria-label="Voltar ao portfólio">
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
              <div className={styles.heroIcon}>
                {platformIcon}
              </div>
              <div className={styles.heroText}>
                <div className={styles.heroMeta}>
                  <span className={styles.heroCategory}>{project.category}</span>
                  <span 
                    className={styles.heroStatus}
                    style={{ 
                      backgroundColor: `${status.color}20`,
                      color: status.color,
                      border: `1px solid ${status.color}30`
                    }}
                  >
                    {status.label}
                  </span>
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
                    <span>{project.team}</span>
                  </div>
                </div>

                <div className={styles.heroActions}>
                  <h1 className={styles.heroTitle}>{project.name}</h1>
                  <p className={styles.heroSummary}>{project.summary}</p>
                  
                  <div className={styles.heroDetails}>
                    <p>{project.details}</p>
                  </div>
                  
                  {projectUrl && (
                    <a 
                      href={`https://${projectUrl}`} 
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

      {/* Project Image */}
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

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            {/* Description Section */}
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

      {/* Technologies Section */}
      <section className={styles.projectTechnologies}>
        <div className={styles.projectTechnologies__container}>
          <motion.div
            className={styles.projectTechnologies__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectTechnologies__title}>Tecnologias Utilizadas</h2>
          </motion.div>
          
          <div className={styles.projectTechnologies__grid}>
            {project.technologies?.map((tech, index) => (
              <motion.div
                key={index}
                className={styles.projectTechnologies__card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.techIcon}>
                  {tech.icon}
                </div>
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.projectFeatures}>
        <div className={styles.projectFeatures__container}>
          <motion.div
            className={styles.projectFeatures__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectFeatures__title}>Principais Funcionalidades</h2>
          </motion.div>
          
          <div className={styles.projectFeatures__grid}>
            {project.features?.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.projectFeatures__card}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className={styles.projectHighlights}>
        <div className={styles.projectHighlights__container}>
          <motion.div
            className={styles.projectHighlights__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectHighlights__title}>Destaques do Projeto</h2>
          </motion.div>
          
          <div className={styles.projectHighlights__grid}>
            {project.highlights?.map((highlight, index) => (
              <motion.div
                key={index}
                className={styles.projectHighlights__card}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={styles.highlightIcon}>
                  {highlight.icon}
                </div>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className={styles.projectResults}>
        <div className={styles.projectResults__container}>
          <motion.div
            className={styles.projectResults__header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.projectResults__title}>Resultados Alcançados</h2>
          </motion.div>
          
          <div className={styles.projectResults__grid}>
            {project.results?.map((result, index) => (
              <motion.div
                key={index}
                className={styles.projectResults__card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.resultCard__content}>
                  <h3>{result.metric}</h3>
                  <p>{result.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={styles.projectTestimonial}>
        <div className={styles.projectTestimonial__container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {project.testimonial && (
              <div className={styles.testimonial}>
                <blockquote>&ldquo;{project.testimonial.quote}&rdquo;</blockquote>
                <cite>
                  <strong>{project.testimonial.author}</strong>
                  <span>{project.testimonial.role}</span>
                </cite>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Navigation Section */}
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
                  <span className={styles.projectNavCard__label}>Projeto Anterior</span>
                  <span className={styles.projectNavCard__title}>{previousProject.name}</span>
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
                  <span className={styles.projectNavCard__label}>Próximo Projeto</span>
                  <span className={styles.projectNavCard__title}>{nextProject.name}</span>
                </div>
                <ArrowRight size={20} />
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
