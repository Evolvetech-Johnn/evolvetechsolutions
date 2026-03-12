import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ArrowUp,
  Heart,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Serviços" },
    { path: "/portfolio", label: "Portfólio" },
    { path: "/about", label: "Sobre" },
    { path: "/contact", label: "Contato" },
  ];

  const services = [
    "Desenvolvimento Web",
    "Aplicativos Mobile",
    "APIs e Backend",
    "Planejamento de Conteúdo em Vídeo",
    "Design para Redes Sociais",
    "Fotografia Corporativa",
    "Fotografia de Produtos",
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.content}>
          {/* Company Info */}
          <div className={styles.section}>
            <div className={styles.brand}>
              <img
                src="/img/logo_evolve-removebg-preview.png"
                alt="EvolveTech Solutions"
                className={styles.brandLogo}
              />
              <h3 className={styles.brandName}>
                <span className={styles.brandText}>Evolve</span>
                <span className={styles.brandAccent}>Tech</span>
              </h3>
              <p className={styles.description}>
                Transformando ideias em soluções digitais inovadoras.
                Desenvolvemos tecnologia que impulsiona o crescimento do seu
                negócio.
              </p>
              <a
                href="https://www.evolvetechsolutions.com.br"
                className={styles.contactLink}
                target="_blank"
                rel="noreferrer"
              >
                www.evolvetechsolutions.com.br
              </a>
            </div>

            {/* Contact Info */}
            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <a
                  href="mailto:contato@evolvetechsolutions.com.br"
                  className={styles.contactLink}
                >
                  contato@evolvetechsolutions.com.br
                </a>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <a
                  href="https://wa.me/5543988704856"
                  className={styles.contactLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  (43) 98870-4856
                </a>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                <span className={styles.contactText}>
                  Londrina, PR - Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4 className={styles.title}>Navegação</h4>
            <ul className={styles.links}>
              {quickLinks.map(({ path, label }) => (
                <li key={path} className={styles.linkItem}>
                  <Link to={path} className={styles.link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.section}>
            <h4 className={styles.title}>Serviços</h4>
            <ul className={styles.links}>
              {services.map((service) => (
                <li key={service} className={styles.linkItem}>
                  <span className={styles.service}>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className={styles.section}>
            <h4 className={styles.title}>Redes Sociais</h4>
            <div className={styles.social}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className={styles.socialLink}
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.bottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} EvolveTech. Todos os direitos reservados.
            </p>
            <p className={styles.madeWith}>
              Feito com <Heart size={16} className={styles.heart} /> pela equipe
              EvolveTech
            </p>
          </div>

          {/* Back to Top Button */}
          <motion.button
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
