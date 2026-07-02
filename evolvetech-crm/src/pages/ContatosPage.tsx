import React, { useState } from 'react';
import { useContatos } from '../hooks/useContatos';
import ContatosTable from '../components/contatos/ContatosTable';
import ContatoForm from '../components/contatos/ContatoForm';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plus, Search, Filter } from 'lucide-react';

const ContatosPage = () => {
  const { contatos, isLoading, addContato } = useContatos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContatos = contatos.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Contatos e Clientes</h1>
          <p className="text-slate-400">Gerencie sua base de clientes e pessoas de contato.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="shrink-0">
          <Plus size={18} className="mr-2" />
          Novo Contato
        </Button>
      </div>

      <div className="flex gap-4 shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Buscar por nome, e-mail ou empresa..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0 px-3">
          <Filter size={18} className="mr-2" />
          Filtros
        </Button>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <ContatosTable contatos={filteredContatos} />
        )}
      </div>

      <ContatoForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          await addContato(data);
        }}
      />
    </div>
  );
};

export default ContatosPage;
