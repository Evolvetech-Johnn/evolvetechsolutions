import { motion } from "framer-motion";
import Container from "./Container";
import Badge from "./Badge";
import { ButtonLink } from "./Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" }
];

export default function Navbar() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage
  });

  return (
    <div className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/70 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <a href="#topo" className="group inline-flex items-center gap-3">
            <img
              src="/LogoVF.png"
              alt="EVOLVETECH SOLUTIONS"
              className="h-10 w-10 rounded-xl object-contain bg-white/5 ring-1 ring-white/10 p-1"
              loading="eager"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold tracking-tight text-white">
                EVOLVETECH SOLUTIONS
              </div>
              <div className="text-xs text-white/60">
                Sistemas sob medida • Dashboards • Automações
              </div>
            </div>
            <Badge className="ml-2 hidden lg:inline-flex">
              Londrina • Atendimento Brasil
            </Badge>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-5 text-sm text-white/70">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ButtonLink
                href="#contato"
                variant="secondary"
                size="sm"
                aria-label="Solicitar orçamento"
              >
                Solicitar orçamento
              </ButtonLink>
              <ButtonLink
                href={wa}
                target="_blank"
                rel="noreferrer"
                size="sm"
                aria-label="Falar no WhatsApp"
              >
                WhatsApp
              </ButtonLink>
            </div>
          </div>

          <motion.a
            href="#contato"
            className="md:hidden inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10"
            whileTap={{ scale: 0.98 }}
          >
            Orçamento
          </motion.a>
        </div>
      </Container>
    </div>
  );
}

