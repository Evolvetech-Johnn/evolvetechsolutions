import React, { useState } from 'react';
import { useLeads } from '../hooks/useLeads';
import KanbanBoard from '../components/leads/KanbanBoard';
import LeadFormModal from '../components/leads/LeadFormModal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plus, Search, Filter } from 'lucide-react';

const LeadsPage = () => {
  const { leads, isLoading, updateLeadStatus, addLead } = useLeads();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(l => 
    l.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Funil de Vendas</h1>
          <p className="text-slate-400">Gerencie seus leads e oportunidades de negócio.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="shrink-0">
          <Plus size={18} className="mr-2" />
          Novo Lead
        </Button>
      </div>

      <div className="flex gap-4 shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Buscar por nome ou empresa..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0 px-3">
          <Filter size={18} className="mr-2" />
          Filtros Avançados
        </Button>
      </div>

      <div className="flex-1 overflow-hidden min-h-[500px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <KanbanBoard leads={filteredLeads} onLeadMove={updateLeadStatus} />
        )}
      </div>

      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          await addLead(data);
        }}
      />
    </div>
  );
};

export default LeadsPage;
