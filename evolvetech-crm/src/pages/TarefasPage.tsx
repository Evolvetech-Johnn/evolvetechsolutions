import React, { useState } from 'react';
import { useTarefas } from '../hooks/useTarefas';
import TarefaList from '../components/tarefas/TarefaList';
import TarefaCalendario from '../components/tarefas/TarefaCalendario';
import TarefaFormModal from '../components/tarefas/TarefaFormModal';
import Button from '../components/ui/Button';
import { Plus, ListTodo, CalendarDays } from 'lucide-react';
import { cn } from '@/utils/cn';

const TarefasPage = () => {
  const { tarefas, isLoading, addTarefa, toggleStatus, deleteTarefa } = useTarefas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Filtros simples para as abas
  const [activeTab, setActiveTab] = useState<'pendentes' | 'concluidas'>('pendentes');
  
  const filteredTarefas = tarefas.filter(t => 
    activeTab === 'pendentes' ? t.status === 'Pendente' : t.status === 'Concluída'
  );

  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Tarefas e Agenda</h1>
          <p className="text-slate-400">Gerencie seus compromissos e tarefas diárias.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === 'list' ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <ListTodo size={18} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === 'calendar' ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <CalendarDays size={18} />
            </button>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} className="mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-[500px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            <div className="flex gap-6 border-b border-slate-800">
              <button 
                onClick={() => setActiveTab('pendentes')}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors border-b-2",
                  activeTab === 'pendentes' ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-300"
                )}
              >
                Pendentes
              </button>
              <button 
                onClick={() => setActiveTab('concluidas')}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors border-b-2",
                  activeTab === 'concluidas' ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-300"
                )}
              >
                Concluídas
              </button>
            </div>
            <TarefaList 
              tarefas={filteredTarefas} 
              onToggleStatus={toggleStatus}
              onDelete={deleteTarefa}
            />
          </div>
        ) : (
          <TarefaCalendario tarefas={tarefas} />
        )}
      </div>

      <TarefaFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          await addTarefa(data);
        }}
      />
    </div>
  );
};

export default TarefasPage;
