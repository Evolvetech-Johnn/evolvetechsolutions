"use client";

import Container from "@/components/Container";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

export default function LeadCapture() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-primary to-ink-900">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-200 mb-6 border border-white/20">
                Próximo Passo
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Vamos transformar seu negócio?
              </h2>
              
              <p className="text-lg text-ink-200 mb-8">
                Solicite um diagnóstico gratuito e sem compromisso. Nossa equipe analisará seus processos e apresentará a melhor solução para você.
              </p>
              
              <div className="space-y-4">
                {[
                  "Diagnóstico completo de seus processos",
                  "Proposta personalizada",
                  "Sem compromisso algum",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-ink-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-white border-0 shadow-2xl">
              {submitted ? (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Obrigado pelo contato!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Entraremos em contato em breve para agendar seu diagnóstico gratuito.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    Enviar nova mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                        Nome completo
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-primary mb-2">
                        Empresa
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nome da empresa"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-semibold text-primary mb-2">
                        Cargo
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Seu cargo"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                        Telefone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                        E-mail
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-brand-600 to-accent hover:from-brand-700 hover:to-brand-600 text-white py-4 text-lg shadow-lg shadow-brand-500/30"
                  >
                    <span>Solicitar Diagnóstico Gratuito</span>
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-xs text-text-secondary text-center mt-4">
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
