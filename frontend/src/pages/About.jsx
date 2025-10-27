import { motion } from 'framer-motion'
import { Users, Code2, Rocket, CheckCircle } from 'lucide-react'
import styles from './About.module.css'

const About = () => {
  const values = [
    {
      icon: Code2,
      title: 'Inovação',
      description: 'Utilizamos as tecnologias mais modernas para criar soluções inovadoras.'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Trabalhamos em parceria com nossos clientes para alcançar os melhores resultados.'
    },
    {
      icon: Rocket,
      title: 'Excelência',
      description: 'Buscamos sempre a excelência em cada projeto que desenvolvemos.'
    },
    {
      icon: CheckCircle,
      title: 'Qualidade',
      description: 'Garantimos a qualidade em todos os aspectos do desenvolvimento.'
    }
  ]

  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>Sobre a EvolveTech</h1>
            <p className={styles.heroSubtitle}>
              Somos uma empresa especializada em desenvolvimento de soluções tecnológicas 
              inovadoras, focada em transformar ideias em realidade digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.valuesContainer}>
          <h2 className={styles.valuesTitle}>Nossos Valores</h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={index}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={styles.valueIcon}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About