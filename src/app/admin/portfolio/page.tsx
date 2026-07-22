'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
  }, [isAuthenticated]);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'evolvetech2024') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const uploadImage = async (file: File) => {
    const { supabase } = await import('@/lib/supabase');
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = formData.imageUrl;

      if (file) {
        finalImageUrl = await uploadImage(file);
      }

      const payload = { ...formData, imageUrl: finalImageUrl };

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setFormData({ title: '', description: '', category: '', imageUrl: '' });
        setFile(null);
        fetchItems();
        alert('Projeto adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar projeto.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Erro no upload ou no salvamento. Verifique se as chaves do Supabase e o bucket "portfolio" existem.');
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center p-4 relative text-white">
        <div className="absolute inset-0 bg-hero-grid opacity-40 mix-blend-screen pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong rounded-3xl p-8 backdrop-blur relative z-10"
        >
          <div className="flex justify-center mb-6 text-neon-cyan">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Admin Portfólio</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Senha de Acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              />
            </div>
            <button type="submit" className="w-full bg-neon-cyan text-ink-950 font-bold py-3 rounded-xl hover:bg-neon-cyan/90 transition-colors">
              Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 text-white p-8 relative">
      <div className="absolute inset-0 bg-hero-grid opacity-20 mix-blend-screen pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gerenciar Portfólio</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white/[0.03] ring-1 ring-white/10 rounded-3xl p-6 backdrop-blur">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="text-neon-cyan" /> Novo Projeto
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Título do Projeto" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none"
              />
              <textarea 
                placeholder="Descrição Breve" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none h-24"
              />
              <input 
                type="text" 
                placeholder="Categoria (ex: Web Design, Branding)" 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none"
              />
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Opção 1: Fazer upload de arquivo (Supabase Storage)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none text-sm text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Opção 2: Ou cole uma URL de imagem direto</label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none"
                />
              </div>
              <button type="submit" disabled={uploading} className="w-full bg-neon-cyan text-ink-950 font-bold py-3 rounded-xl hover:bg-neon-cyan/90 transition-colors disabled:opacity-50">
                {uploading ? 'Salvando...' : 'Salvar Projeto'}
              </button>
            </form>
          </div>

          {/* Listagem */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Projetos Cadastrados</h2>
            {loading ? (
              <p className="text-gray-400">Carregando...</p>
            ) : items.length === 0 ? (
              <p className="text-gray-400">Nenhum projeto cadastrado ainda.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="bg-ink-900/50 border border-white/10 rounded-xl p-4 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-ink-800">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                  <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
