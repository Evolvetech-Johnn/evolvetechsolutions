import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { User, Bell, Shield, Moon, Sun } from 'lucide-react';
import { cn } from '@/utils/cn';

const ConfiguracoesPage = () => {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'perfil' | 'preferencias' | 'seguranca'>('perfil');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        email: user.email,
      });
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Configurações salvas com sucesso! (Simulação)');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full space-y-6 max-w-5xl mx-auto pb-12">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-slate-400">Gerencie seu perfil e preferências do sistema.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Sidebar de Configurações */}
        <Card className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col p-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('perfil')}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === 'perfil' ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <User size={18} /> Meu Perfil
            </button>
            <button
              onClick={() => setActiveTab('preferencias')}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === 'preferencias' ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <Bell size={18} /> Preferências
            </button>
            <button
              onClick={() => setActiveTab('seguranca')}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === 'seguranca' ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              <Shield size={18} /> Segurança
            </button>
          </nav>
        </Card>

        {/* Conteúdo Principal */}
        <div className="flex-1 w-full space-y-6">
          {activeTab === 'perfil' && (
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
                    <Avatar initials={user?.nome.substring(0,2).toUpperCase() || 'US'} size="xl" />
                    <div>
                      <Button type="button" variant="outline" size="sm" className="mb-2">Alterar Foto</Button>
                      <p className="text-xs text-slate-500">Recomendado: JPG ou PNG quadrado de até 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="Nome Completo" 
                      value={formData.nome}
                      onChange={e => setFormData({...formData, nome: e.target.value})}
                      required
                    />
                    <Input 
                      label="E-mail" 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" isLoading={isSaving}>Salvar Alterações</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'preferencias' && (
            <Card>
              <CardHeader>
                <CardTitle>Preferências do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-200 mb-3">Tema da Interface</h4>
                  <div className="flex gap-4">
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-slate-900 text-primary w-24 gap-2 transition-all">
                      <Moon size={24} />
                      <span className="text-xs font-medium">Escuro</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-800 hover:border-slate-700 bg-slate-800 text-slate-400 w-24 gap-2 transition-all opacity-50 cursor-not-allowed" title="Em breve">
                      <Sun size={24} />
                      <span className="text-xs font-medium">Claro</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h4 className="text-sm font-medium text-slate-200 mb-3">Notificações</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-sm text-slate-300">
                      <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary/50" />
                      Notificar-me por e-mail quando um Lead mudar de estágio
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-300">
                      <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary/50" />
                      Lembretes diários de tarefas pendentes
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} isLoading={isSaving}>Salvar Preferências</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'seguranca' && (
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4 max-w-md">
                  <Input label="Senha Atual" type="password" required />
                  <Input label="Nova Senha" type="password" required />
                  <Input label="Confirmar Nova Senha" type="password" required />
                  
                  <div className="flex justify-start pt-4">
                    <Button type="submit" isLoading={isSaving}>Atualizar Senha</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
