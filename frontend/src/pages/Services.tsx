import type { FC } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Code,
  Globe,
  MessageCircle,
  Package,
  Palette,
  Server,
  ShoppingCart,
  Smartphone,
  Video,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import styles from "./Services.module.css";
import { getLocale, t } from "../i18n";

type ServiceCard = {
  icon: typeof Code;
  title: string;
  description: string;
  benefits?: string[];
};

const Services: FC = () => {
  const locale = getLocale();

  useEffect(() => {
    document.title =
      locale === "en-US"
        ? "Services | EvolveTech Solutions"
        : "Serviços | EvolveTech Solutions";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("services.subtitle"));
  }, [locale]);

  const coreServices: ServiceCard[] = [
    {
      icon: Code,
      title: locale === "en-US" ? "Web Development" : "Desenvolvimento Web",
      description:
        locale === "en-US"
          ? "Modern, responsive and performance-focused websites and web apps, built to scale with your business."
          : "Sites e aplicações web modernas, responsivas e orientadas a performance, prontas para escalar com o seu negócio.",
    },
    {
      icon: Smartphone,
      title: locale === "en-US" ? "Mobile Apps" : "Apps Mobile",
      description:
        locale === "en-US"
          ? "Native and hybrid iOS/Android apps with strong UX, speed and maintainability."
          : "Aplicativos iOS e Android (nativos e híbridos) com UX consistente, performance e alta manutenibilidade.",
    },
    {
      icon: Server,
      title: locale === "en-US" ? "APIs & Backend" : "APIs e Backend",
      description:
        locale === "en-US"
          ? "Reliable architectures, integrations and data layers to support critical operations and growth."
          : "Arquiteturas robustas, integrações e camadas de dados confiáveis para sustentar operações críticas e crescimento.",
    },
    {
      icon: ShoppingCart,
      title: locale === "en-US" ? "E-commerce" : "E-commerce",
      description:
        locale === "en-US"
          ? "Online stores with secure checkout, catalog management and integrations designed for conversion."
          : "Lojas virtuais com checkout seguro, gestão de catálogo e integrações pensadas para conversão.",
    },
    {
      icon: BarChart3,
      title: locale === "en-US" ? "Dashboards" : "Dashboards",
      description:
        locale === "en-US"
          ? "Decision-ready analytics dashboards, turning data into operational clarity and performance."
          : "Painéis analíticos prontos para decisão, transformando dados em clareza operacional e performance.",
    },
    {
      icon: Globe,
      title:
        locale === "en-US" ? "Institutional Websites" : "Sites Institucionais",
      description:
        locale === "en-US"
          ? "Premium corporate websites that convey trust, positioning and a clear growth narrative."
          : "Sites corporativos premium que comunicam confiança, posicionamento e uma narrativa clara de crescimento.",
    },
    {
      icon: Cpu,
      title: locale === "en-US" ? "Embedded Systems" : "Sistemas Embarcados",
      description:
        locale === "en-US"
          ? "Development of embedded systems and IoT solutions for smart devices and industrial automation."
          : "Desenvolvimento de sistemas embarcados e soluções IoT para dispositivos inteligentes e automação industrial.",
    },
    {
      icon: Server,
      title: locale === "en-US" ? "Infrastructure Support" : "Suporte de Infraestrutura",
      description:
        locale === "en-US"
          ? "VPS management, VPN setup, network configuration and 24/7 infrastructure monitoring."
          : "Gerenciamento de VPS, configuração de VPN, setup de redes e monitoramento 24/7 de infraestrutura.",
    },
  ];

  const positioningServices: ServiceCard[] = [
    {
      icon: Video,
      title: t("positioning.videoPlanning.title"),
      description: t("positioning.videoPlanning.description"),
      benefits:
        locale === "en-US"
          ? [
              "Stronger brand authority",
              "Higher social engagement",
              "Strategic communication with your audience",
              "More professional market positioning",
            ]
          : [
              "Fortalecimento de autoridade da marca",
              "Aumento de engajamento nas redes sociais",
              "Comunicação estratégica com o público",
              "Posicionamento profissional no mercado",
            ],
    },
    {
      icon: Smartphone,
      title: t("positioning.mobileVideo.title"),
      description: t("positioning.mobileVideo.description"),
      benefits:
        locale === "en-US"
          ? [
              "Agile, modern production",
              "Native content for social-first formats",
              "Greater proximity with your audience",
              "Excellent cost-benefit for audiovisual production",
            ]
          : [
              "Produção ágil e moderna",
              "Conteúdos nativos para redes sociais",
              "Maior proximidade com o público",
              "Excelente custo-benefício em produção audiovisual",
            ],
    },
    {
      icon: Palette,
      title: t("positioning.socialDesign.title"),
      description: t("positioning.socialDesign.description"),
      benefits:
        locale === "en-US"
          ? [
              "Professional visual communication",
              "Stronger, consistent brand identity",
              "Educational, value-driven content",
              "Higher engagement through clarity and narrative",
            ]
          : [
              "Comunicação visual profissional",
              "Fortalecimento da identidade da marca",
              "Conteúdos educativos e de valor",
              "Aumento de engajamento nas redes sociais",
            ],
    },
    {
      icon: Camera,
      title: t("positioning.corporatePhoto.title"),
      description: t("positioning.corporatePhoto.description"),
      benefits:
        locale === "en-US"
          ? [
              "Stronger professional image",
              "Visual language aligned to brand identity",
              "Higher institutional credibility",
              "Consistent visuals across channels",
            ]
          : [
              "Fortalecimento da imagem profissional",
              "Comunicação visual alinhada à identidade da marca",
              "Maior credibilidade institucional",
              "Consistência visual em todos os canais da empresa",
            ],
    },
    {
      icon: Package,
      title: t("positioning.productPhoto.title"),
      description: t("positioning.productPhoto.description"),
      benefits:
        locale === "en-US"
          ? [
              "Better product perceived value",
              "Higher conversion in sales funnels",
              "Assets ready for campaigns and catalogs",
              "Stronger premium quality perception",
            ]
          : [
              "Valorização visual do produto",
              "Aumento de conversão em vendas",
              "Imagens profissionais para campanhas e catálogos",
              "Fortalecimento da percepção de qualidade da marca",
            ],
    },
  ];

  return (
    <div className={styles.servicesPage}>
      <section className={styles.hero} aria-label={t("services.heroAria")}>
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>{t("services.title")}</h1>
            <p className={styles.heroSubtitle}>{t("services.subtitle")}</p>
            <div className={styles.heroActions}>
              <Link to="/contact" className={styles.heroPrimary}>
                <MessageCircle size={20} aria-hidden />
                {t("services.heroPrimary")}
                <ArrowRight size={20} aria-hidden />
              </Link>
              <Link to="/portfolio" className={styles.heroSecondary}>
                {t("services.heroSecondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="services-core-title">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 id="services-core-title" className={styles.sectionTitle}>
              {t("services.coreTitle")}
            </h2>
            <p className={styles.sectionDescription}>
              {t("services.coreDescription")}
            </p>
          </div>

          <div className={styles.grid}>
            {coreServices.map((service, index) => (
              <motion.article
                key={service.title}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={styles.cardIcon} aria-hidden>
                  <service.icon size={44} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="posicionamento-digital"
        className={styles.sectionAlt}
        aria-labelledby="positioning-title"
      >
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 id="positioning-title" className={styles.sectionTitle}>
              {t("positioning.sectionTitle")}
            </h2>
            <p className={styles.sectionDescription}>
              {t("positioning.sectionDescription")}
            </p>
          </div>

          <div className={styles.grid}>
            {positioningServices.map((service, index) => (
              <motion.article
                key={service.title}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={styles.cardIcon} aria-hidden>
                  <service.icon size={44} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                {service.benefits && (
                  <ul
                    className={styles.benefits}
                    aria-label={t("services.benefitsAria")}
                  >
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className={styles.benefitItem}>
                        <CheckCircle2
                          size={18}
                          aria-hidden
                          className={styles.benefitIcon}
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>

          <div className={styles.inlineCta}>
            <div className={styles.inlineCtaContent}>
              <h3 className={styles.inlineCtaTitle}>
                {t("positioning.ctaTitle")}
              </h3>
              <p className={styles.inlineCtaDescription}>
                {t("positioning.ctaDescription")}
              </p>
            </div>
            <Link to="/contact" className={styles.inlineCtaButton}>
              {t("positioning.ctaButton")}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
