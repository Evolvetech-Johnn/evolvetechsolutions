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
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/LogoVF.png" 
                alt="EVOLVETECH SOLUTIONS" 
                className="h-16 w-auto rounded-2xl object-contain"
              />
              <div>
                <div className="text-base font-bold tracking-tight font-display text-text-primary">
                  EVOLVETECH SOLUTIONS
                </div>
                <div className="text-xs text-text-secondary">
                  {siteConfig.domain}
                </div>
              </div>
            </div>
            <p className="text-text-secondary mb-6 max-w-md text-sm">
              Criamos sistemas sob medida que automatizam processos, organizam dados e ajudam empresas a escalar com tecnologia.
            </p>
            <ButtonLink href="#contato">
              Quero automatizar meu negócio
            </ButtonLink>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Navegação
            </h4>
            <div className="space-y-2">
              <a href="#servicos" className="block text-text-secondary hover:text-text-primary text-sm transition-colors">
                Serviços
              </a>
              <a href="#casos" className="block text-text-secondary hover:text-text-primary text-sm transition-colors">
                Casos de Sucesso
              </a>
              <a href="#processo" className="block text-text-secondary hover:text-text-primary text-sm transition-colors">
                Processo
              </a>
              <a href="#faq" className="block text-text-secondary hover:text-text-primary text-sm transition-colors">
                FAQ
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Contato
            </h4>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-text-secondary hover:text-text-primary text-sm transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="block text-text-secondary hover:text-text-primary text-sm transition-colors"
              >
                WhatsApp
              </a>
              <div className="text-text-secondary text-xs">{siteConfig.location}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-text-secondary md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} EVOLVETECH SOLUTIONS. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#topo" className="hover:text-text-primary transition-colors">
              Voltar ao topo
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

