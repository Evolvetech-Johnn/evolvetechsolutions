"use client";

import Container from "@/components/Container";
import { Button, ButtonLink } from "@/components/Button";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Zap, Database } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-primary to-primary py-24 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-300 border border-brand-500/20 mb-6">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Sistemas Sob Medida para Empresas
            </div>
            
            <h1 className="text-hero text-balance font-bold text-white mb-6 leading-tight">
              Transformamos processos manuais em <span className="text-brand-400">sistemas inteligentes</span> que aumentam a produtividade
            </h1>
            
            <p className="text-body text-ink-300 mb-8 max-w-xl">
              Desenvolvimento de softwares, dashboards, plataformas web e automatizações personalizadas para empresas que desejam escalar com tecnologia.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30">
                Agendar Diagnóstico Gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <ButtonLink href="#casos" variant="secondary" size="lg" className="border border-white/20 text-white hover:bg-white/10">
                Ver Casos de Sucesso
              </ButtonLink>
            </div>
            
            <div className="mt-10 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-gradient-to-br from-brand-400 to-accent flex items-center justify-center text-xs font-bold text-primary">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-ink-300">
                <div className="flex items-center gap-1 text-success font-semibold">
                  <span>★★★★★</span>
                </div>
                +50 Projetos Entregues
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-accent/20 to-success/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-2xl">
              <div className="bg-ink-900 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-ink-400">Dashboard EvolveTech</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-ink-800/50 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-ink-400 mb-1">Receitas</div>
                    <div className="text-xl font-bold text-success">+32%</div>
                    <BarChart3 className="mt-1 h-4 w-4 text-success" />
                  </div>
                  <div className="bg-ink-800/50 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-ink-400 mb-1">Produtividade</div>
                    <div className="text-xl font-bold text-brand-400">+58%</div>
                    <Zap className="mt-1 h-4 w-4 text-brand-400" />
                  </div>
                  <div className="bg-ink-800/50 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-ink-400 mb-1">Processos</div>
                    <div className="text-xl font-bold text-accent">+120</div>
                    <Database className="mt-1 h-4 w-4 text-accent" />
                  </div>
                </div>
                
                <div className="h-32 bg-gradient-to-t from-brand-500/20 to-transparent rounded-xl flex items-end justify-center pb-2">
                  <div className="flex items-end gap-2">
                    {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                        className="w-4 bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
