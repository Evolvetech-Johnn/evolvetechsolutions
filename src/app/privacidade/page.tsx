import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Política de Privacidade e Cookies",
  description: "Entenda como a EvolveTech Solutions trata e protege os seus dados.",
};

export default function PrivacidadePage() {
  return (
    <div className="bg-ink-950 pb-20 pt-32">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Legal"
          title="Política de Privacidade e Cookies"
          subtitle="Transparência e segurança na forma como tratamos as suas informações."
        />

        <div className="prose prose-invert prose-neon mt-12 max-w-none text-white/80">
          <h3>1. Coleta de Dados</h3>
          <p>
            Coletamos informações essenciais para garantir o funcionamento do nosso site e viabilizar o contato comercial. Quando você interage conosco através de botões de WhatsApp, seu número de telefone e dados de perfil do WhatsApp poderão ser visualizados pela nossa equipe comercial para dar andamento ao atendimento.
          </p>

          <h3>2. Uso de Cookies (LGPD)</h3>
          <p>
            Nosso site utiliza duas categorias de cookies:
            <ul>
              <li><strong>Essenciais:</strong> Necessários para que o site funcione corretamente (como salvar sua preferência do banner de cookies). Não podem ser desativados.</li>
              <li><strong>Analíticos:</strong> Utilizamos o Google Analytics para entender como os visitantes navegam em nossa página, mas esses scripts <strong>só são carregados se você clicar em Aceitar</strong> no nosso banner de consentimento.</li>
            </ul>
          </p>

          <h3>3. Armazenamento e Proteção</h3>
          <p>
            Não possuímos formulários de cadastro no site institucional atual. Dados analíticos anônimos coletados (caso consentidos) são armazenados e protegidos pela infraestrutura do Google. O código-fonte deste site é hospedado em provedores Cloud modernos com criptografia de ponta a ponta (TLS/HTTPS obrigatório).
          </p>

          <h3>4. Seus Direitos</h3>
          <p>
            De acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), você tem o direito de solicitar a confirmação, correção ou exclusão de qualquer dado seu que tenhamos armazenado em nosso CRM comercial (derivado dos contatos via WhatsApp).
          </p>
          <p>
            Para exercer seus direitos, limpar seu consentimento de cookies ou falar com nosso DPO, basta limpar o cache local do seu navegador e entrar em contato com nossa equipe através dos canais de atendimento oficiais.
          </p>

          <p className="mt-8 text-sm text-white/50">
            Última atualização: Julho de 2026.
          </p>
        </div>
      </Container>
    </div>
  );
}
