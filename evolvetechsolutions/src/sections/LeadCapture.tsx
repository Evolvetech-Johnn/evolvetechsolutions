"use client";

import Container from "@/components/Container";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createLead } from "@/drizzle/repository";
import { createLeadAction } from "@/actions/create-lead";

const leadFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  company: z.string().min(2, "Empresa deve ter pelo menos 2 caracteres"),
  role: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres"),
  phone: z
    .string()
    .min(11, "O telefone deve conter todos os dígitos, incluindo o DDD."),
  email: z.string().email("E-mail inválido"),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export default function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const lead = {
        id: crypto.randomUUID(),
        name: data.name,
        company: data.company,
        email: data.email,
        role: data.role,
        phone: data.phone.replaceAll(/[+()\s-]/g, ""),
      };
      const response = await createLeadAction(lead);

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErrorMessage(
        "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  return (
    <section
      id="contato"
      className="py-20 bg-gradient-to-br from-brand-base to-brand-surface"
    >
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-brand-text">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-accent mb-6 border border-brand-border">
                Próximo Passo
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Vamos transformar seu negócio?
              </h2>

              <p className="text-lg text-brand-text-muted mb-8">
                Solicite um diagnóstico gratuito e sem compromisso. Nossa equipe
                analisará seus processos e apresentará a melhor solução para
                você.
              </p>

              <div className="space-y-4">
                {[
                  "Diagnóstico completo de seus processos",
                  "Proposta personalizada",
                  "Sem compromisso algum",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-action flex-shrink-0" />
                    <span className="text-brand-text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-0 shadow-2xl">
              {submitted ? (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-brand-action/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-brand-action" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-text mb-2">
                    Obrigado pelo contato!
                  </h3>
                  <p className="text-brand-text-muted mb-6">
                    Entraremos em contato em breve para agendar seu diagnóstico
                    gratuito.
                  </p>
                  <Button
                    onClick={resetForm}
                    variant="secondary"
                    className="w-full"
                  >
                    Enviar nova mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-brand-text mb-2"
                      >
                        Nome completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        className={`w-full px-4 py-3 rounded-xl border bg-brand-surface-alt text-brand-text placeholder:text-brand-text-muted/50 transition-all ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-brand-border focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                        } outline-none`}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-brand-text mb-2"
                      >
                        Empresa
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Nome da empresa"
                        className={`w-full px-4 py-3 rounded-xl border bg-brand-surface-alt text-brand-text placeholder:text-brand-text-muted/50 transition-all ${
                          errors.company
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-brand-border focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                        } outline-none`}
                        {...register("company")}
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.company.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-semibold text-brand-text mb-2"
                      >
                        Cargo
                      </label>
                      <input
                        id="role"
                        type="text"
                        placeholder="Seu cargo"
                        className={`w-full px-4 py-3 rounded-xl border bg-brand-surface-alt text-brand-text placeholder:text-brand-text-muted/50 transition-all ${
                          errors.role
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-brand-border focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                        } outline-none`}
                        {...register("role")}
                      />
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-brand-text mb-2"
                      >
                        Telefone
                      </label>
                      <input
                        id="phone"
                        placeholder="(00) 00000-0000"
                        className={`w-full px-4 py-3 rounded-xl border bg-brand-surface-alt text-brand-text placeholder:text-brand-text-muted/50 transition-all ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-brand-border focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                        } outline-none`}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-brand-text mb-2"
                      >
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-brand-surface-alt text-brand-text placeholder:text-brand-text-muted/50 transition-all ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-brand-border focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                        } outline-none`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-gradient-to-r from-brand-accent to-brand-accent-light hover:from-brand-accent-light hover:to-brand-accent text-white py-4 text-lg shadow-lg shadow-brand-accent/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <>
                        <span>Solicitar Diagnóstico Gratuito</span>
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  {errorMessage && (
                    <p className="mt-4 text-sm text-red-400 text-center">
                      {errorMessage}
                    </p>
                  )}
                  <p className="text-xs text-brand-text-muted text-center mt-4">
                    Ao enviar, você concorda com nossa política de privacidade.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
