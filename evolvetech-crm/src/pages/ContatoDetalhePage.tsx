import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { contatosService } from '../services/contatosService';
import { Contato } from '../types/contato';
import ContatoHistorico from '../components/contatos/ContatoHistorico';
import ContatoForm from '../components/contatos/ContatoForm';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { ArrowLeft, Mail, Phone, Building2, Briefcase, Edit, Trash2 } from 'lucide-react';

const ContatoDetalhePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contato, setContato] = useState<Contato | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchContato = async () => {
      if (!id) return;
      try {
        const data = await contatosService.getContatoById(id);
        if (data) setContato(data);
        else navigate('/contatos');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContato();
  }, [id, navigate]);

  const handleUpdate = async (data: Omit<Contato, 'id'>) => {
    if (!id) return;
    const updated = await contatosService.updateContato(id, data);
    setContato(updated);
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Tem certeza que deseja excluir este contato?')) return;
    await contatosService.deleteContato(id);
    navigate('/contatos');
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center">Carregando...</div>;
  }

  if (!contato) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <Link to="/contatos" className="flex items-center text-sm text-slate-400 hover:text-white transition-colors w-fit">
        <ArrowLeft size={16} className="mr-1" /> Voltar para Contatos
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Coluna Esquerda: Dados do Contato */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <Avatar 
                initials={contato.nome.substring(0, 2).toUpperCase()} 
                size="xl" 
                className="mx-auto mb-4 bg-primary/20 text-primary-hover border-primary/30" 
              />
              <h2 className="text-xl font-bold text-white">{contato.nome}</h2>
              <p className="text-slate-400 text-sm mb-4">{contato.cargo} em {contato.empresa}</p>
              
              <div className="flex justify-center gap-2 mb-6">
                <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
                  <Edit size={14} className="mr-2" /> Editar
                </Button>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400"><Mail size={16} /></div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">E-mail</p>
                  <p className="text-slate-200 font-medium">{contato.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400"><Phone size={16} /></div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Telefone</p>
                  <p className="text-slate-200 font-medium">{contato.telefone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400"><Building2 size={16} /></div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Empresa</p>
                  <p className="text-slate-200 font-medium">{contato.empresa}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400"><Briefcase size={16} /></div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Cargo</p>
                  <p className="text-slate-200 font-medium">{contato.cargo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita: Histórico e Funil */}
        <div className="w-full md:w-2/3 space-y-6">
          {contato.leadId && (
             <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-primary font-medium">Este contato possui um Lead no Funil</h4>
                  <p className="text-sm text-slate-400">ID do Lead: {contato.leadId}</p>
                </div>
                <Button size="sm" onClick={() => navigate('/leads')}>Ver no Funil</Button>
             </div>
          )}
          
          <ContatoHistorico />
        </div>
      </div>

      <ContatoForm 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={contato}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default ContatoDetalhePage;
