'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PortfolioGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-cyan"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        Em breve novos projetos serão adicionados.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-white/[0.02] ring-1 ring-white/10 hover:ring-neon-cyan/50 transition-all cursor-pointer aspect-video md:aspect-[4/5]"
          >
            <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-transparent transition-colors z-10" />
            
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent opacity-80 z-20" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <span className="inline-block px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-semibold mb-3">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
