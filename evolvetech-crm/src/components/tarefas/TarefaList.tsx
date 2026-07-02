import React from 'react';
import { Tarefa } from '../../types/tarefa';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TarefaListProps {
  tarefas: Tarefa[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const TarefaList: React.FC<TarefaListProps> = ({ tarefas, onToggleStatus, onDelete }) => {
  if (tarefas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
        <CheckCircle2 size={48} className="mb-4 opacity-20" />
        <p>Nenhuma tarefa encontrada.</p>
      </div>
    );
  }

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'Alta': return <Badge variant="error">Alta</Badge>;
      case 'Média': return <Badge variant="warning">Média</Badge>;
      default: return <Badge variant="outline">Baixa</Badge>;
    }
  };

  return (
    <div className="space-y-3">
      {tarefas.map(tarefa => {
        const isCompleted = tarefa.status === 'Concluída';
        const isOverdue = !isCompleted && new Date(tarefa.dataVencimento) < new Date(new Date().setHours(0,0,0,0));

        return (
          <Card 
            key={tarefa.id} 
            className={cn(
              "transition-all duration-200 hover:border-slate-600",
              isCompleted && "opacity-60 bg-slate-900/80"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <button 
                onClick={() => onToggleStatus(tarefa.id)}
                className="flex-shrink-0 text-slate-500 hover:text-primary transition-colors focus:outline-none"
              >
                {isCompleted ? (
                  <CheckCircle2 size={24} className="text-success" />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={cn(
                    "font-medium text-slate-200 truncate",
                    isCompleted && "line-through text-slate-400"
                  )}>
                    {tarefa.titulo}
                  </h4>
                  {getPriorityBadge(tarefa.prioridade)}
                </div>
                {tarefa.descricao && (
                  <p className="text-xs text-slate-400 truncate mb-2">{tarefa.descricao}</p>
                )}
                
                <div className="flex items-center gap-3 text-xs font-medium">
                  <span className={cn(
                    "flex items-center gap-1",
                    isOverdue ? "text-error" : "text-slate-500",
                    isCompleted && "text-slate-500"
                  )}>
                    <Clock size={12} />
                    {isOverdue && !isCompleted ? 'Atrasada - ' : ''}
                    {new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}
                  </span>
                  
                  {tarefa.relacionadoA && (
                    <span className="text-primary border border-primary/20 bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      Link: {tarefa.relacionadoA.tipo === 'lead' ? 'Lead' : 'Contato'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 ml-4">
                <Button variant="ghost" size="sm" onClick={() => onDelete(tarefa.id)} className="text-slate-500 hover:text-error hover:bg-error/10">
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TarefaList;
