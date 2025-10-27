import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import axios from 'axios'
import styles from './Contact.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@evolvetech.com.br',
      link: 'mailto:contato@evolvetech.com.br'
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '+55 (11) 99999-9999',
      link: 'tel:+5511999999999'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'São Paulo, SP - Brasil',
      link: null
    },
    {
      icon: Clock,
      title: 'Horário',
      value: 'Seg - Sex: 9h às 18h',
      link: null
    }
  ]

  const _services = [
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'APIs e Backend',
    'E-commerce',
    'Dashboards e BI',
    'Sites Institucionais',
    'Consultoria Técnica',
    'Manutenção e Suporte'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await axios.post('http://localhost:5000/api/contact', formData)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.contact}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>Entre em Contato</h1>
            <p className={styles.heroSubtitle}>
              Pronto para transformar sua ideia em realidade? Nossa equipe está 
              aqui para ajudar você a criar soluções digitais incríveis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className={styles.contactContent}>
        <div className={styles.contactContainer}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <motion.div
              className={styles.contactForm}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.formTitle}>Envie sua Mensagem</h2>
              <p className={styles.formDescription}>
                Preencha o formulário abaixo e entraremos em contato em até 24 horas.
              </p>

              {submitStatus === 'success' && (
                <div className={`${styles.message} ${styles.messageSuccess}`}>
                  <CheckCircle size={20} />
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={`${styles.message} ${styles.messageError}`}>
                  <AlertCircle size={20} />
                  Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.formLabel}>
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Nome da sua empresa"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>
                    Assunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="Assunto da sua mensagem"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className={styles.formTextarea}
                    placeholder="Descreva seu projeto ou dúvida..."
                    rows="5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.formButton}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className={styles.contactInfo}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.contactInfoTitle}>Informações de Contato</h2>
              <p className={styles.contactInfoDescription}>
                Entre em contato conosco através dos canais abaixo ou preencha o formulário.
              </p>

              <div className={styles.contactMethods}>
                {contactInfo.map((info, index) => (
                  <div key={index} className={styles.contactMethod}>
                    <div className={styles.contactMethodIcon}>
                      <info.icon size={24} />
                    </div>
                    <div className={styles.contactMethodContent}>
                      <div className={styles.contactMethodLabel}>{info.title}</div>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className={styles.contactMethodValue}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className={styles.contactMethodValue}>{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
