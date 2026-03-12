import type { FC, ChangeEvent, FormEvent } from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react"
import { submitContact } from "@domains/lead/services/gateway"
import { getLocale, t } from "@app/i18n"
import styles from "./Contact.module.css"

type ContactFormData = {
  name: string
  email: string
  company: string
  phone: string
  subject: string
  message: string
}

type SubmitStatus = "success" | "error" | null

type ContactInfoItem = {
  icon: typeof Mail
  title: string
  value: string
  link: string | null
}

const Contact: FC = () => {
  const locale = getLocale()
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)

  useEffect(() => {
    document.title =
      locale === "en-US"
        ? "Contact | EvolveTech Solutions"
        : "Contato | EvolveTech Solutions"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute("content", t("contact.subtitle"))
  }, [locale])

  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      title: "Email",
      value: "contato@evolvetechsolutions.com.br",
      link: "mailto:contato@evolvetechsolutions.com.br",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+55 (43) 98870-4856",
      link: "https://wa.me/5543988704856",
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "Londrina, PR - Brasil",
      link: null,
    },
    {
      icon: Clock,
      title: "Horário",
      value: "Seg - Sex: 9h às 18h",
      link: null,
    },
    {
      icon: Globe,
      title: "Website",
      value: "www.evolvetechsolutions.com.br",
      link: "https://www.evolvetechsolutions.com.br",
    },
  ]

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const res = await submitContact(formData)
      if (res?.success) {
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.contact}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>{t("contact.title")}</h1>
            <p className={styles.heroSubtitle}>{t("contact.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.contactContent}>
        <div className={styles.contactContainer}>
          <div className={styles.contactGrid}>
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

              {submitStatus === "success" && (
                <div className={`${styles.message} ${styles.messageSuccess}`}>
                  <CheckCircle size={20} />
                  {t("contact.success")}
                </div>
              )}

              {submitStatus === "error" && (
                <div className={`${styles.message} ${styles.messageError}`}>
                  <AlertCircle size={20} />
                  {t("contact.error")}
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
                    placeholder="(43) 98870-4856"
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
                    rows={5}
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
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  const isExternalLink = info.link?.startsWith("http")
                  return (
                    <div key={`${info.title}-${index}`} className={styles.contactMethod}>
                      <div className={styles.contactMethodIcon}>
                        <Icon size={24} />
                      </div>
                      <div className={styles.contactMethodContent}>
                        <div className={styles.contactMethodLabel}>{info.title}</div>
                        {info.link ? (
                          <a
                            href={info.link}
                            className={styles.contactMethodValue}
                            target={isExternalLink ? "_blank" : undefined}
                            rel={isExternalLink ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className={styles.contactMethodValue}>{info.value}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
