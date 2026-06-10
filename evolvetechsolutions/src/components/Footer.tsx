import Container from "./Container";
import { ButtonLink } from "./Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage,
  });

  return (
    <footer className="border-t border-border bg-ink-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-600 to-accent flex items-center justify-center p-2">
                <span className="text-white font-bold text-lg">ET</span>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">
                  EVOLVETECH SOLUTIONS
                </div>
                <div className="text-sm text-ink-400">
                  {siteConfig.domain}
                </div>
              </div>
            </div>
            <p className="text-ink-300 mb-6 max-w-md">
              Software house especializada em sistemas sob medida, dashboards e automações que transformam a operação das empresas.
            </p>
            <ButtonLink href="#contato" className="bg-brand-600 hover:bg-brand-700 text-white">
              Solicitar Diagnóstico
            </ButtonLink>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-ink-400">
              Navegação
            </h4>
            <div className="space-y-2">
              <a href="#servicos" className="block text-ink-300 hover:text-white transition-colors">
                Serviços
              </a>
              <a href="#casos" className="block text-ink-300 hover:text-white transition-colors">
                Casos de Sucesso
              </a>
              <a href="#processo" className="block text-ink-300 hover:text-white transition-colors">
                Processo
              </a>
              <a href="#faq" className="block text-ink-300 hover:text-white transition-colors">
                Dúvidas Frequentes
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-ink-400">
              Contato
            </h4>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-ink-300 hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="block text-ink-300 hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <div className="text-ink-400">{siteConfig.location}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-800 pt-8 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} EVOLVETECH SOLUTIONS. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#topo" className="hover:text-white transition-colors">
              Voltar ao topo
            </a>
            <a href="#contato" className="hover:text-white transition-colors">
              Contato
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

