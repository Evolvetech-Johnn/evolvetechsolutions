import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Smartphone,
  Server,
  ShoppingCart,
  BarChart3,
  Globe,
  Video,
  Palette,
  Camera,
  Package,
  MessageCircle,
  Star,
  Users,
  Award,
  Zap,
} from "lucide-react";
import styles from "./Home.module.css";
import { getLocale, t } from "@app/i18n";

type Service = {
  icon: typeof Code;
  title: string;
  description: string;
  color: string;
};

type PositioningService = {
  icon: typeof Code;
  title: string;
  description: string;
};

type Stat = {
  icon: typeof Users;
  value: string;
  label: string;
};

const Home: FC = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = getLocale();

  useEffect(() => {
    const texts = [
      "Desenvolvimento Web",
      "Aplicativos Mobile",
      "APIs e Backend",
      "E-commerce",
      "Dashboards",
    ];

    const currentText = texts[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setTypedText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const services: Service[] = [
    {
      icon: Code,
      title: "Desenvolvimento Web",
      description:
        "Sites e aplicações web modernas, responsivas e otimizadas para performance.",
      color: "var(--accent-blue)",
    },
    {
      icon: Smartphone,
      title: "Apps Mobile",
      description:
        "Aplicativos nativos e híbridos para iOS e Android com excelente UX.",
      color: "var(--accent-green)",
    },
    {
      icon: Server,
      title: "APIs e Backend",
      description:
        "Arquiteturas robustas e escaláveis para suportar suas aplicações.",
      color: "var(--accent-purple)",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description:
        "Lojas virtuais completas com integração de pagamentos e gestão.",
      color: "var(--accent-orange)",
    },
    {
      icon: BarChart3,
      title: "Dashboards",
      description:
        "Painéis analíticos e de controle para visualização de dados.",
      color: "var(--accent-red)",
    },
    {
      icon: Globe,
      title: "Sites Institucionais",
      description: "Presença digital profissional para sua empresa ou marca.",
      color: "var(--accent-teal)",
    },
  ];

  const positioningServices: PositioningService[] = [
    {
      icon: Video,
      title: t("positioning.videoPlanning.title"),
      description: t("positioning.videoPlanning.shortDescription"),
    },
    {
      icon: Smartphone,
      title: t("positioning.mobileVideo.title"),
      description: t("positioning.mobileVideo.shortDescription"),
    },
    {
      icon: Palette,
      title: t("positioning.socialDesign.title"),
      description: t("positioning.socialDesign.shortDescription"),
    },
    {
      icon: Camera,
      title: t("positioning.corporatePhoto.title"),
      description: t("positioning.corporatePhoto.shortDescription"),
    },
    {
      icon: Package,
      title: t("positioning.productPhoto.title"),
      description: t("positioning.productPhoto.shortDescription"),
    },
  ];

  const stats: Stat[] = [
    { icon: Users, value: "50+", label: "Clientes Satisfeitos" },
    { icon: Award, value: "100+", label: "Projetos Entregues" },
    { icon: Star, value: "5.0", label: "Avaliação Média" },
    { icon: Zap, value: "24h", label: "Suporte Rápido" },
  ];

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-label="Seção principal">
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              {t("home.heroTitlePrefix")}{" "}
              <span className={styles.heroAccent}>
                {typedText || "soluções digitais"}
              </span>
            </h1>
            <p className={styles.heroSubtitle}>{t("home.heroSubtitle")}</p>
            <div className={styles.heroActions}>
              <Link
                to="/portfolio"
                className={`${styles.heroButton} ${styles.heroButtonPrimary}`}
                aria-label="Ver nosso portfólio de projetos"
              >
                <Globe size={20} aria-hidden />
                {t("home.portfolioButton")}
                <ArrowRight size={20} aria-hidden />
              </Link>
              <Link
                to="/contact"
                className={`${styles.heroButton} ${styles.heroButtonSecondary}`}
                aria-label="Entre em contato conosco"
              >
                <MessageCircle size={20} aria-hidden />
                {t("home.contactButton")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="services-title">
        <div className={styles.servicesContainer}>
          <motion.div
            className={styles.servicesHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 id="services-title" className={styles.servicesTitle}>
              {t("home.servicesTitle")}
            </h2>
            <p className={styles.servicesDescription}>
              {t("home.servicesDescription")}
            </p>
          </motion.div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.serviceCardIcon} aria-hidden>
                  <service.icon size={48} />
                </div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDescription}>
                  {service.description}
                </p>
                <Link
                  to="/portfolio"
                  className={styles.serviceCardLink}
                  aria-label={`Saiba mais sobre ${service.title}`}
                >
                  {t("home.serviceLearnMore")}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.positioning}
        aria-labelledby="positioning-title"
      >
        <div className={styles.servicesContainer}>
          <motion.div
            className={styles.servicesHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 id="positioning-title" className={styles.servicesTitle}>
              {t("positioning.sectionTitle")}
            </h2>
            <p className={styles.servicesDescription}>
              {t("positioning.sectionDescription")}
            </p>
          </motion.div>

          <div className={styles.servicesGrid}>
            {positioningServices.map((service, index) => (
              <motion.div
                key={service.title}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className={styles.serviceCardIcon} aria-hidden>
                  <service.icon size={48} />
                </div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDescription}>
                  {service.description}
                </p>
                <Link
                  to="/services#posicionamento-digital"
                  className={styles.serviceCardLink}
                  aria-label={
                    locale === "en-US"
                      ? `View details about ${service.title}`
                      : `Ver detalhes sobre ${service.title}`
                  }
                >
                  {t("home.serviceLearnMore")}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className={styles.positioningCta}>
            <div className={styles.positioningCtaContent}>
              <h3 className={styles.positioningCtaTitle}>
                {t("positioning.ctaTitle")}
              </h3>
              <p className={styles.positioningCtaDescription}>
                {t("positioning.ctaDescription")}
              </p>
            </div>
            <Link
              to="/contact"
              className={styles.positioningCtaButton}
              aria-label={t("positioning.ctaButton")}
            >
              <MessageCircle size={20} aria-hidden />
              {t("positioning.ctaButton")}
              <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stats} aria-label="Estatísticas da empresa">
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
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

      <section className={styles.cta} aria-label="Chamada para ação">
        <div className={styles.ctaContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>
              Pronto para começar seu projeto?
            </h2>
            <p className={styles.ctaDescription}>{t("home.ctaSubtitle")}</p>
            <Link
              to="/contact"
              className={styles.ctaButton}
              aria-label="Iniciar novo projeto"
            >
              <MessageCircle size={20} aria-hidden />
              {t("home.ctaPrimary")}
              <ArrowRight size={20} aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
