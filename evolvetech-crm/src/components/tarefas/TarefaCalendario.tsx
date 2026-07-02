import React from 'react';
import { Tarefa } from '../../types/tarefa';
import Card, { CardContent } from '../ui/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface TarefaCalendarioProps {
  tarefas: Tarefa[];
}

const TarefaCalendario: React.FC<TarefaCalendarioProps> = ({ tarefas }) => {
  // Apenas uma representação visual simples (mockada) de um calendário para a demo.
  // Em uma implementação real, usaríamos bibliotecas como react-big-calendar ou fullcalendar.
  
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const mesAtual = 'Outubro 2023'; // Fixo para o mock
  
  // Gerando dias vazios e preenchidos
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Card className="h-full flex flex-col bg-slate-900 border-slate-800">
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        <h3 className="font-semibold text-white">{mesAtual}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="px-2"><ChevronLeft size={18} /></Button>
          <Button variant="ghost" size="sm" className="px-2"><ChevronRight size={18} /></Button>
        </div>
      </div>
      
      <CardContent className="flex-1 p-0 flex flex-col">
        <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-800/50">
          {diasDaSemana.map(dia => (
            <div key={dia} className="py-2 text-center text-xs font-medium text-slate-400">
              {dia}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 auto-rows-fr">
          {dias.map((dia, index) => {
             // Mock simples para distribuir tarefas visualmente (apenas para demo)
             const dataMock = `2023-10-${String(dia).padStart(2, '0')}`;
             const tarefasDoDia = tarefas.filter(t => t.dataVencimento === dataMock);
             
             return (
              <div 
                key={index} 
                className={`min-h-[100px] border-b border-r border-slate-800/50 p-1 
                  ${dia === new Date().getDate() ? 'bg-primary/5' : ''}`}
              >
                <span className={`text-xs p-1 ${dia === new Date().getDate() ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold' : 'text-slate-500'}`}>
                  {dia}
                </span>
                
                <div className="mt-1 space-y-1">
                  {tarefasDoDia.map(t => (
                    <div 
                      key={t.id} 
                      className={`text-[10px] truncate px-1.5 py-1 rounded-sm
                        ${t.status === 'Concluída' ? 'bg-slate-800 text-slate-500 line-through' : 'bg-primary/20 text-primary-hover border border-primary/30'}`}
                      title={t.titulo}
                    >
                      {t.titulo}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TarefaCalendario;
