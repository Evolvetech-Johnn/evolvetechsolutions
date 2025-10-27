import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Smartphone, 
  Server, 
  ShoppingCart,
  BarChart3,
  Globe,
  Filter,
  Search,
  ExternalLink,
  Eye
} from 'lucide-react'
import axios from 'axios'
import styles from './Portfolio.module.css'

const Portfolio = () => {
  const [platforms, setPlatforms] = useState([])
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [searchTerm, _setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [projectUrls, setProjectUrls] = useState({})

  const platformIcons = {
    'web': Code,
    'mobile': Smartphone,
    'api': Server,
    'ecommerce': ShoppingCart,
    'dashboard': BarChart3,
    'sites': Globe
  }

  const _platformColors = {
    'web': 'var(--accent-blue)',
    'mobile': 'var(--accent-green)',
    'api': 'var(--accent-purple)',
    'ecommerce': 'var(--accent-orange)',
    'dashboard': 'var(--accent-red)',
    'sites': 'var(--accent-teal)'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [platformsResponse, projectsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/platforms'),
          axios.get('http://localhost:5000/api/projects')
        ])
        
        const projectsData = projectsResponse.data.data || []
        setPlatforms(platformsResponse.data.data || [])
        setProjects(projectsData)
        setFilteredProjects(projectsData)
        
        // Fetch URLs for each project
        const urls = {}
        for (const project of projectsData) {
          try {
            const urlResponse = await axios.get(`http://localhost:5000/api/internal/projects/${project.id}/url`)
            if (urlResponse.data.success) {
              urls[project.id] = urlResponse.data.url
            }
          } catch (error) {
            console.log(`URL não disponível para o projeto ${project.id}`)
          }
        }
        setProjectUrls(urls)
        
      } catch {
        setError('Erro ao carregar dados')
        // Error fetching data
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = projects

    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(project => project.platform === selectedPlatform)
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    setFilteredProjects(filtered)
  }, [selectedPlatform, searchTerm, projects])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateTitle}>Erro ao carregar portfólio</div>
        <p className={styles.emptyStateDescription}>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.loadMoreButton} aria-label="Recarregar página para tentar novamente">
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className={styles.portfolio}>
      {/* Hero Section */}
      <section className={styles.hero}>
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
                <span className={styles.heroStatNumber}>50+</span>
                <span className={styles.heroStatLabel}>Projetos</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>30+</span>
                <span className={styles.heroStatLabel}>Clientes</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>6</span>
                <span className={styles.heroStatLabel}>Plataformas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className={styles.filters}>
        <div className={styles.filtersContainer}>
          <h2 className={styles.filtersTitle}>Filtrar por Plataforma</h2>
          
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${selectedPlatform === 'all' ? styles.filterButtonActive : ''}`}
              onClick={() => setSelectedPlatform('all')}
            >
              <Filter size={16} />
              Todos os Projetos
            </button>
            {platforms.map((platform) => {
              const IconComponent = platformIcons[platform.id] || Code
              return (
                <button
                  key={platform.id}
                  className={`${styles.filterButton} ${selectedPlatform === platform.id ? styles.filterButtonActive : ''}`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  <IconComponent size={16} />
                  {platform.name}
                </button>
              )
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
                  <motion.div
                    key={project.id}
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => window.open(`/project/${project.id}`, '_blank')}
                  >
                    <img
                      src={project.image || '/api/placeholder/400/240'}
                      alt={project.name}
                      className={styles.projectImage}
                    />
                    <div className={styles.projectContent}>
                      <h3 className={styles.projectTitle}>{project.name}</h3>
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
                          {projectUrls[project.id] && (
                            <a
                              href={`https://${projectUrls[project.id]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.projectLink}
                              onClick={(e) => e.stopPropagation()}
                              title="Ver site ao vivo"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
