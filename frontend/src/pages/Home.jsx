import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Server, 
  ShoppingCart,
  BarChart3,
  Globe,
  MessageCircle,
  Star,
  Users,
  Award,
  Zap
} from 'lucide-react'
import styles from './Home.module.css'

const Home = () => {
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const texts = [
      'Desenvolvimento Web',
      'Aplicativos Mobile',
      'APIs e Backend',
      'E-commerce',
      'Dashboards'
    ]
    
    const currentText = texts[currentIndex]
    let charIndex = 0
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setTypedText(currentText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentIndex])

  const services = [
    {
      icon: Code,
      title: 'Desenvolvimento Web',
      description: 'Sites e aplicações web modernas, responsivas e otimizadas para performance.',
      color: 'var(--accent-blue)'
    },
    {
      icon: Smartphone,
      title: 'Apps Mobile',
      description: 'Aplicativos nativos e híbridos para iOS e Android com excelente UX.',
      color: 'var(--accent-green)'
    },
    {
      icon: Server,
      title: 'APIs e Backend',
      description: 'Arquiteturas robustas e escaláveis para suportar suas aplicações.',
      color: 'var(--accent-purple)'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Lojas virtuais completas com integração de pagamentos e gestão.',
      color: 'var(--accent-orange)'
    },
    {
      icon: BarChart3,
      title: 'Dashboards',
      description: 'Painéis analíticos e de controle para visualização de dados.',
      color: 'var(--accent-red)'
    },
    {
      icon: Globe,
      title: 'Sites Institucionais',
      description: 'Presença digital profissional para sua empresa ou marca.',
      color: 'var(--accent-teal)'
    }
  ]

  const stats = [
    { icon: Users, value: '50+', label: 'Clientes Satisfeitos' },
    { icon: Award, value: '100+', label: 'Projetos Entregues' },
    { icon: Star, value: '5.0', label: 'Avaliação Média' },
    { icon: Zap, value: '24h', label: 'Suporte Rápido' }
  ]

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="Seção principal">
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              Transformamos suas ideias em{' '}
              <span className={styles.heroAccent}>{typedText || 'soluções digitais'}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Desenvolvemos aplicações web, mobile e sistemas personalizados 
              que impulsionam o crescimento do seu negócio com tecnologia de ponta.
            </p>
            <div className={styles.heroActions}>
              <Link to="/portfolio" className={`${styles.heroButton} ${styles.heroButtonPrimary}`} aria-label="Ver nosso portfólio de projetos">
                <Globe size={20} aria-hidden="true" />
                Ver Portfólio
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link to="/contact" className={`${styles.heroButton} ${styles.heroButtonSecondary}`} aria-label="Entre em contato conosco">
                <MessageCircle size={20} aria-hidden="true" />
                Fale Conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services} aria-labelledby="services-title">
        <div className={styles.servicesContainer}>
          <motion.div
            className={styles.servicesHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 id="services-title" className={styles.servicesTitle}>Nossos Serviços</h2>
            <p className={styles.servicesDescription}>
              Oferecemos soluções completas para todas as suas necessidades digitais
            </p>
          </motion.div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.serviceCardIcon} aria-hidden="true">
                  <service.icon size={48} />
                </div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDescription}>{service.description}</p>
                <Link to="/portfolio" className={styles.serviceCardLink} aria-label={`Saiba mais sobre ${service.title}`}>
                  Saiba mais
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats} aria-label="Estatísticas da empresa">
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.statCardNumber}>{stat.value}</div>
                <div className={styles.statCardLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} aria-label="Chamada para ação">
        <div className={styles.ctaContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>Pronto para começar seu projeto?</h2>
            <p className={styles.ctaDescription}>
              Entre em contato conosco e vamos transformar sua ideia em realidade
            </p>
            <Link to="/contact" className={styles.ctaButton} aria-label="Iniciar novo projeto">
              <MessageCircle size={20} aria-hidden="true" />
              Iniciar Projeto
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
