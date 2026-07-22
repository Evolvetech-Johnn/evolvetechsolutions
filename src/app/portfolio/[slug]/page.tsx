import React from 'react';
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery';
import { BadgeCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProfile(slug: string) {
  // Use absolute URL since fetch in RSC requires absolute URL or we can query DB directly
  const { db } = await import('@/db');
  const { teamProfiles } = await import('@/db/schema');
  const { eq } = await import('drizzle-orm');
  
  const profiles = await db.select().from(teamProfiles).where(eq(teamProfiles.slug, slug));
  if (profiles.length === 0) {
    return null;
  }
  return profiles[0];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getProfile(slug);
  
  if (!profile) {
    return {
      title: 'Perfil não encontrado',
    };
  }
  
  return {
    title: `Portfólio - ${profile.name}`,
    description: profile.description || `Projetos e trabalhos selecionados por ${profile.name} na EvolveTech.`,
  };
}

export default async function DynamicPortfolio({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getProfile(slug);

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ink-950 text-white relative">
      <div className="absolute inset-0 bg-hero-grid opacity-30 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-soft-noise opacity-30 pointer-events-none mix-blend-overlay" />
      
      {/* Header Section */}
      <section className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-sm font-semibold mb-6">
            <BadgeCheck className="w-4 h-4" />
            {profile.role}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {profile.name}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            {profile.description || `Conheça os projetos e trabalhos de ${profile.name}.`}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link 
              href="/#contato" 
              className="px-6 py-3 bg-neon-cyan text-ink-950 font-bold rounded-xl hover:bg-neon-cyan/90 transition-colors flex items-center gap-2"
            >
              Falar com EvolveTech <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Profile Image */}
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-neon-cyan/30 relative shadow-glowStrong flex-shrink-0 bg-ink-900 flex items-center justify-center">
          {profile.imageUrl ? (
            <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500 font-bold text-4xl">
              {profile.name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Projetos em Destaque</h2>
          <p className="text-gray-400">Uma seleção dos melhores trabalhos recentes.</p>
        </div>
        
        <PortfolioGallery />
      </section>
    </div>
  );
}
