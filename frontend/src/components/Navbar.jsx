import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Briefcase, User, Mail } from "lucide-react";
import styles from "./Navbar.module.css";
import { t, getLocale, setLocale } from "@app/i18n";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [locale, setLocaleState] = useState(getLocale());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleLocaleChange = () => {
      setLocaleState(getLocale());
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("localechange", handleLocaleChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("localechange", handleLocaleChange);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", labelKey: "nav.home", icon: Home },
    { path: "/portfolio", labelKey: "nav.portfolio", icon: Briefcase },
    { path: "/about", labelKey: "nav.about", icon: User },
    { path: "/contact", labelKey: "nav.contact", icon: Mail },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.navbarContainer}>
          <Link to="/" className={styles.navbarLogo}>
            <motion.div
              className={styles.navbarLogoContent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/img/logo_evolve-removebg-preview.png"
                alt="EvolveTech Solutions"
                className={styles.navbarLogoImage}
              />
              <span className={styles.navbarLogoText}>EvolveTech</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navbarNav}>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navbarLink} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.navbarRight}>
            <div
              className={styles.localeSwitcher}
              aria-label="Selecionar idioma"
            >
              <button
                type="button"
                className={`${styles.localeButton} ${locale === "pt-BR" ? styles.localeButtonActive : ""}`}
                onClick={() => setLocale("pt-BR")}
              >
                PT
              </button>
              <button
                type="button"
                className={`${styles.localeButton} ${locale === "en-US" ? styles.localeButtonActive : ""}`}
                onClick={() => setLocale("en-US")}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={styles.navbarToggle}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className={styles.navbarMobile}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${styles.navbarMobileLink} ${
                      location.pathname === item.path ? styles.active : ""
                    }`}
                  >
                    <IconComponent size={20} />
                    <span>{t(item.labelKey)}</span>
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.navbarOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
