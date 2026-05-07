import { ButtonLink } from "@/components/Button";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-ink-950 text-white">
      <Container className="py-20">
        <div className="mx-auto max-w-xl rounded-3xl bg-white/[0.03] p-8 ring-1 ring-white/10 backdrop-blur">
          <h1 className="text-2xl font-semibold tracking-tight">Página não encontrada</h1>
          <p className="mt-3 text-white/70">
            O link pode estar incorreto ou a página foi movida.
          </p>
          <div className="mt-6">
            <ButtonLink href="/" variant="secondary">
              Voltar para o início
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
