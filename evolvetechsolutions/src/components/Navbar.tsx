import { motion } from "framer-motion";
import Container from "./Container";
import Badge from "./Badge";
import { ButtonLink } from "./Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#demos", label: "Demos" },
  { href: "#casos", label: "Casos" },
  { href: "#processo", label: "Processo" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage,
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between gap-3">
          <a href="#topo" className="group inline-flex items-center gap-3">
            <img src="/img/LogoVF.png" alt="Evolvetech Solutions" className="h-12 w-auto rounded-2xl" />
            <div className="hidden sm:block">
              <div className="text-lg font-bold tracking-tight text-primary">
                EVOLVETECH
              </div>
              <div className="text-sm text-text-secondary">
                Sistemas sob medida
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-text-secondary hover:text-primary font-medium transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <ButtonLink
                href="#contato"
                variant="secondary"
                size="sm"
              >
                Fale conosco
              </ButtonLink>
              <ButtonLink
                href={wa}
                target="_blank"
                rel="noreferrer"
                size="sm"
              >
                WhatsApp
              </ButtonLink>
            </div>
          </div>

          <ButtonLink
            href="#contato"
            size="sm"
            className="md:hidden bg-brand-600 hover:bg-brand-700 text-white"
          >
            Contato
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

