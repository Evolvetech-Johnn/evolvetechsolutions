import Container from "./Container";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage
  });

  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/LogoVF.png"
                alt="EVOLVETECH SOLUTIONS"
                className="h-11 w-11 rounded-xl object-contain bg-white/5 ring-1 ring-white/10 p-1"
              />
              <div>
                <div className="text-sm font-semibold tracking-tight text-white">
                  EVOLVETECH SOLUTIONS
                </div>
                <div className="text-xs text-white/60">{siteConfig.domain}</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Software house focada em sistemas sob medida que aumentam lucro,
              reduzem retrabalho e trazem controle real para a operação.
            </p>
          </div>

          <div className="grid gap-2 text-sm text-white/70">
            <div className="text-xs font-semibold tracking-wide text-white/60">
              CONTATO
            </div>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="hover:text-white">
              WhatsApp (resposta rápida)
            </a>
            <div className="text-white/60">{siteConfig.location}</div>
          </div>

          <div className="grid gap-2 text-sm text-white/70">
            <div className="text-xs font-semibold tracking-wide text-white/60">
              SERVIÇOS
            </div>
            <a href="#servicos" className="hover:text-white">
              Sistemas personalizados
            </a>
            <a href="#servicos" className="hover:text-white">
              Dashboards & BI operacional
            </a>
            <a href="#servicos" className="hover:text-white">
              Automações e integrações
            </a>
            <div className="mt-3 text-xs font-semibold tracking-wide text-white/60">
              LEGAL
            </div>
            <a href="#privacidade" className="hover:text-white">
              Política de privacidade
            </a>
            <a href="#cookies" className="hover:text-white">
              Política de cookies
            </a>
            <a href="#termos" className="hover:text-white">
              Termos de uso
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} EVOLVETECH SOLUTIONS. Todos os direitos reservados.</div>
          <div className="flex gap-3">
            <a href="#topo" className="hover:text-white">
              Voltar ao topo
            </a>
            <a href="#contato" className="hover:text-white">
              Solicitar orçamento
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

