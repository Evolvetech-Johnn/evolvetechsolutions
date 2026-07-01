"use client";

import { motion } from "framer-motion";
import Container from "./Container";
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
          ? "bg-brand-base/80 backdrop-blur-md border-b border-brand-border"
          : "bg-transparent"
      }`}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between gap-3">
          <a href="#topo" className="group inline-flex items-center gap-3">
            <img 
              src="/LogoVF.png" 
              alt="EVOLVETECH SOLUTIONS" 
              className="h-10 sm:h-14 md:h-16 w-auto rounded-2xl object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-base font-bold tracking-tight text-brand-text font-display">
                EVOLVETECH
              </div>
              <div className="text-xs text-brand-text-muted">
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
                  className="text-brand-text-muted hover:text-brand-text font-medium text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <ButtonLink
              href={wa}
              target="_blank"
              rel="noreferrer"
              size="sm"
            >
              Falar no WhatsApp
            </ButtonLink>
          </div>

          <ButtonLink
            href={wa}
            target="_blank"
            rel="noreferrer"
            size="sm"
            className="md:hidden"
          >
            Contato
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

