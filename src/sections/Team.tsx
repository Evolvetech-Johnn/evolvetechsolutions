import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    name: "Marcos Gusmão",
    role: "UI/UX & Web Designer",
    description: "Especialista em criar experiências visuais envolventes, layouts modernos e interfaces otimizadas para conversão.",
    href: "/portfolio/marcos-gusmao",
    available: true,
    image: "/team/marcos.webp", // Pode ser substituído futuramente
    initials: "MG"
  },
  {
    name: "Johnathan",
    role: "Desenvolvedor & Engenheiro de Software",
    description: "Focado na construção de arquiteturas escaláveis, sistemas sob medida e alta performance técnica no backend.",
    href: "#",
    available: false,
    image: "/team/johnathan.webp", 
    initials: "JH"
  },
  {
    name: "Endriys",
    role: "Desenvolvedor Fullstack",
    description: "Transformando designs em interfaces imersivas e criando lógicas complexas para automatizar negócios.",
    href: "#",
    available: false,
    image: "/team/endriys.webp", 
    initials: "EN"
  }
];

export default function Team() {
  return (
    <section id="equipe" className="relative border-y border-white/5 bg-ink-950 py-16 md:py-24">
      <div className="absolute inset-0 bg-hero-grid opacity-10 mix-blend-screen pointer-events-none" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Nossos Talentos"
          title="A mente por trás do código e do design."
          subtitle="Cada projeto incrível da EvolveTech tem a assinatura de especialistas focados em resultados, tecnologia de ponta e estética premium. Conheça nossa equipe."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col rounded-3xl bg-white/[0.02] ring-1 ring-white/10 shadow-glow overflow-hidden hover:ring-white/20 transition-all"
            >
              <div className="relative h-48 w-full bg-ink-900 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-950/80 z-10" />
                {/* Fallback de Iniciais */}
                <div className="text-6xl font-bold text-white/5 tracking-tighter">
                  {member.initials}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6 z-20 -mt-12">
                <div className="h-20 w-20 rounded-2xl bg-ink-950 border border-white/10 shadow-glowStrong flex items-center justify-center text-neon-cyan font-bold text-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,231,255,0.15),transparent)]" />
                  {member.initials}
                </div>

                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-neon-cyan text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-white/60 mb-8 flex-1 leading-relaxed">
                  {member.description}
                </p>

                {member.available ? (
                  <Link 
                    href={member.href}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white/[0.06] hover:bg-neon-cyan hover:text-ink-950 transition-all px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10"
                  >
                    Ver Portfólio <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button 
                    disabled
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white/[0.02] px-4 py-3 text-sm font-semibold text-white/40 ring-1 ring-white/5 cursor-not-allowed"
                  >
                    Em breve <Lock className="h-3 w-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
