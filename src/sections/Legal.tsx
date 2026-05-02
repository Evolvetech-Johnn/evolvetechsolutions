import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import { siteConfig } from "@/config/site";

export default function Legal() {
  return (
    <section className="relative border-y border-white/5 bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="LGPD"
          title="Transparência, privacidade e controle de dados."
          subtitle="A EVOLVETECH SOLUTIONS leva a privacidade a sério. Abaixo estão informações claras sobre dados pessoais, cookies e direitos do titular."
        />

        <div className="mt-12 grid gap-6">
          <div id="privacidade" className="scroll-mt-24">
            <Card
              title="Política de Privacidade"
              description="Como tratamos dados pessoais (LGPD)."
            >
              <div className="space-y-4 text-sm leading-relaxed text-white/70">
                <p>
                  <span className="font-semibold text-white">Controladora:</span>{" "}
                  {siteConfig.name} ({siteConfig.domain}).
                </p>
                <p>
                  <span className="font-semibold text-white">Finalidade:</span>{" "}
                  atendimento comercial, retorno de contato, qualificação de demanda e
                  execução de serviços contratados.
                </p>
                <p>
                  <span className="font-semibold text-white">Dados que podem ser tratados:</span>{" "}
                  nome, telefone, e-mail, mensagem enviada e informações do projeto
                  fornecidas pelo próprio usuário ao entrar em contato (ex.: WhatsApp).
                </p>
                <p>
                  <span className="font-semibold text-white">Base legal:</span>{" "}
                  consentimento e/ou execução de procedimentos preliminares a contrato, a
                  depender do contexto do contato.
                </p>
                <p>
                  <span className="font-semibold text-white">Compartilhamento:</span>{" "}
                  não vendemos dados. Podemos compartilhar somente quando necessário para
                  operação (ex.: provedor de e-mail) ou por obrigação legal.
                </p>
                <p>
                  <span className="font-semibold text-white">Retenção:</span>{" "}
                  mantemos dados pelo tempo necessário para atender a solicitação,
                  cumprir obrigações legais e resguardar direitos.
                </p>
                <p>
                  <span className="font-semibold text-white">Direitos do titular:</span>{" "}
                  confirmação, acesso, correção, anonimização, portabilidade, eliminação,
                  informação sobre compartilhamento e revogação do consentimento, quando
                  aplicável.
                </p>
                <p>
                  <span className="font-semibold text-white">Contato:</span>{" "}
                  para solicitações relacionadas a privacidade, envie e-mail para{" "}
                  <a
                    className="font-semibold text-white/80 hover:text-white"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </div>
            </Card>
          </div>

          <div id="cookies" className="scroll-mt-24">
            <Card
              title="Política de Cookies"
              description="O que usamos e como você controla preferências."
            >
              <div className="space-y-4 text-sm leading-relaxed text-white/70">
                <p>
                  Este site foi construído para ser rápido e objetivo. No momento, não
                  utilizamos cookies de marketing por padrão. Podemos usar cookies
                  estritamente necessários para funcionamento básico, quando aplicável.
                </p>
                <p>
                  Você pode aceitar ou recusar cookies não essenciais pelo banner de
                  consentimento. A preferência fica salva no seu navegador.
                </p>
                <p>
                  Links externos (ex.: portfólio e WhatsApp) podem ter políticas próprias
                  de privacidade e cookies, que não controlamos.
                </p>
              </div>
            </Card>
          </div>

          <div id="termos" className="scroll-mt-24">
            <Card
              title="Termos de Uso"
              description="Regras básicas de uso do site."
            >
              <div className="space-y-4 text-sm leading-relaxed text-white/70">
                <p>
                  O conteúdo deste site tem caráter informativo e pode ser atualizado sem
                  aviso prévio. A contratação de serviços ocorre mediante proposta e
                  aceite formal.
                </p>
                <p>
                  É proibida a reprodução de materiais do site sem autorização. Marcas e
                  nomes mencionados pertencem a seus respectivos proprietários.
                </p>
                <p>
                  Ao navegar, você concorda em usar o site de forma lícita e respeitando
                  a legislação aplicável.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

