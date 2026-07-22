'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, Trash2, Edit2, Users, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPortfolioPage() {
  const [activeTab, setActiveTab] = useState<'projetos' | 'equipe'>('projetos');
  const [items, setItems] = useState<any[]>([]);
  const [teamProfiles, setTeamProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Formulário Projetos
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    teamProfileSlug: '',
  });

  // Formulário Equipe
  const [editingProfileSlug, setEditingProfileSlug] = useState<string | null>(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    role: '',
    description: '',
    imageUrl: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
      fetchTeamProfiles();
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

  const fetchTeamProfiles = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setTeamProfiles(data);
    } catch (error) {
      console.error('Error fetching team profiles', error);
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

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  // --- Funções de Projetos ---
  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = formData.imageUrl;
      if (file) {
        finalImageUrl = await uploadImage(file);
      }

      const payload = { ...formData, imageUrl: finalImageUrl };
      const url = editingProjectId ? `/api/portfolio/${editingProjectId}` : '/api/portfolio';
      const method = editingProjectId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setFormData({ title: '', description: '', category: '', imageUrl: '', teamProfileSlug: '' });
        setFile(null);
        setEditingProjectId(null);
        fetchItems();
        alert(editingProjectId ? 'Projeto atualizado!' : 'Projeto adicionado!');
      } else {
        alert('Erro ao salvar projeto.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Erro no upload ou salvamento.');
    } finally {
      setUploading(false);
    }
  };

  const handleEditProject = (item: any) => {
    setEditingProjectId(item.id);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      imageUrl: item.imageUrl,
      teamProfileSlug: item.teamProfileSlug || '',
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchItems();
      }
    } catch (error) {
      alert('Erro ao excluir projeto.');
    }
  };

  // --- Funções da Equipe ---
  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfileSlug) return;
    
    setUploading(true);
    try {
      let finalImageUrl = teamFormData.imageUrl;
      if (file) {
        finalImageUrl = await uploadImage(file);
      }

      const payload = { ...teamFormData, imageUrl: finalImageUrl };

      const res = await fetch(`/api/team/${editingProfileSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setTeamFormData({ name: '', role: '', description: '', imageUrl: '' });
        setFile(null);
        setEditingProfileSlug(null);
        fetchTeamProfiles();
        alert('Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar perfil.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Erro no upload ou salvamento.');
    } finally {
      setUploading(false);
    }
  };

  const handleEditProfile = (profile: any) => {
    setEditingProfileSlug(profile.slug);
    setTeamFormData({
      name: profile.name,
      role: profile.role,
      description: profile.description || '',
      imageUrl: profile.imageUrl || '',
    });
    setFile(null);
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
          <h1 className="text-2xl font-bold text-center mb-6">Painel Admin</h1>
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Painel de Gerenciamento</h1>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('projetos')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'projetos' ? 'bg-neon-cyan text-ink-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FolderKanban size={18} /> Projetos
            </button>
            <button
              onClick={() => setActiveTab('equipe')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'equipe' ? 'bg-neon-cyan text-ink-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users size={18} /> Equipe
            </button>
          </div>
        </div>

        {activeTab === 'projetos' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/[0.03] ring-1 ring-white/10 rounded-3xl p-6 backdrop-blur">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Plus className="text-neon-cyan" /> {editingProjectId ? 'Editar Projeto' : 'Novo Projeto'}
              </h2>
              <form onSubmit={handleSubmitProject} className="space-y-4">
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
                <select
                  required
                  value={formData.teamProfileSlug}
                  onChange={(e) => setFormData({...formData, teamProfileSlug: e.target.value})}
                  className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none text-gray-300"
                >
                  <option value="" disabled>Selecione o dono do projeto</option>
                  {teamProfiles.map(p => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Opção 1: Fazer upload (Supabase Storage)</label>
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
                <div className="flex gap-4">
                  <button type="submit" disabled={uploading} className="flex-1 bg-neon-cyan text-ink-950 font-bold py-3 rounded-xl hover:bg-neon-cyan/90 transition-colors disabled:opacity-50">
                    {uploading ? 'Salvando...' : (editingProjectId ? 'Atualizar Projeto' : 'Salvar Projeto')}
                  </button>
                  {editingProjectId && (
                    <button type="button" onClick={() => { setEditingProjectId(null); setFormData({ title: '', description: '', category: '', imageUrl: '', teamProfileSlug: ''}); }} className="px-6 bg-ink-800 text-white font-bold py-3 rounded-xl hover:bg-ink-700 transition-colors">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

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
                    <button onClick={() => handleEditProject(item)} className="p-2 hover:bg-neon-cyan/20 text-neon-cyan rounded-lg transition-colors">
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => handleDeleteProject(item.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'equipe' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/[0.03] ring-1 ring-white/10 rounded-3xl p-6 backdrop-blur">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Edit2 className="text-neon-cyan" /> {editingProfileSlug ? 'Editar Perfil' : 'Selecione um perfil ao lado'}
              </h2>
              {editingProfileSlug ? (
                <form onSubmit={handleSubmitProfile} className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Nome" 
                    required
                    value={teamFormData.name}
                    onChange={(e) => setTeamFormData({...teamFormData, name: e.target.value})}
                    className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Cargo (ex: Designer Pleno)" 
                    required
                    value={teamFormData.role}
                    onChange={(e) => setTeamFormData({...teamFormData, role: e.target.value})}
                    className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none"
                  />
                  <textarea 
                    placeholder="Descrição sobre a pessoa" 
                    value={teamFormData.description}
                    onChange={(e) => setTeamFormData({...teamFormData, description: e.target.value})}
                    className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none h-32"
                  />
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Nova Foto de Perfil (Opcional)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none text-sm text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Ou cole uma URL direta da foto</label>
                    <input 
                      type="url" 
                      placeholder="https://..." 
                      value={teamFormData.imageUrl}
                      onChange={(e) => setTeamFormData({...teamFormData, imageUrl: e.target.value})}
                      className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-cyan outline-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={uploading} className="flex-1 bg-neon-cyan text-ink-950 font-bold py-3 rounded-xl hover:bg-neon-cyan/90 transition-colors disabled:opacity-50">
                      {uploading ? 'Salvando...' : 'Atualizar Perfil'}
                    </button>
                    <button type="button" onClick={() => { setEditingProfileSlug(null); setFile(null); }} className="px-6 bg-ink-800 text-white font-bold py-3 rounded-xl hover:bg-ink-700 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Users size={48} className="mb-4 opacity-50" />
                  <p>Clique no botão de editar em um membro da equipe.</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-6">Membros da Equipe</h2>
              {teamProfiles.length === 0 ? (
                <p className="text-gray-400">Nenhum membro cadastrado.</p>
              ) : (
                teamProfiles.map((profile) => (
                  <div key={profile.slug} className="bg-ink-900/50 border border-white/10 rounded-xl p-4 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-ink-800 border-2 border-neon-cyan/30 flex items-center justify-center text-gray-500 font-bold">
                      {profile.imageUrl ? (
                        <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{profile.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{profile.name}</h3>
                      <p className="text-sm text-neon-cyan">{profile.role}</p>
                    </div>
                    <button onClick={() => handleEditProfile(profile)} className="p-2 hover:bg-neon-cyan/20 text-neon-cyan rounded-lg transition-colors">
                      <Edit2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
