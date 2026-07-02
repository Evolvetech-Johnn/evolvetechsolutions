import { useState, useEffect, useCallback } from 'react';
import { Tarefa, TarefaStatus } from '../types/tarefa';
import { tarefasService } from '../services/tarefasService';

export const useTarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTarefas = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await tarefasService.getTarefas();
      // Ordena por data (mais recentes primeiro)
      setTarefas(data.sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime()));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTarefas();
  }, [fetchTarefas]);

  const addTarefa = async (tarefa: Omit<Tarefa, 'id'>) => {
    const newTarefa = await tarefasService.addTarefa(tarefa);
    setTarefas(prev => [...prev, newTarefa].sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime()));
    return newTarefa;
  };

  const toggleStatus = async (id: string) => {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;
    
    const newStatus: TarefaStatus = tarefa.status === 'Pendente' ? 'Concluída' : 'Pendente';
    
    // Otimista
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    try {
      await tarefasService.updateTarefaStatus(id, newStatus);
    } catch (error) {
      await fetchTarefas(); // revert on fail
    }
  };

  const deleteTarefa = async (id: string) => {
    setTarefas(prev => prev.filter(t => t.id !== id));
    try {
      await tarefasService.deleteTarefa(id);
    } catch (error) {
      await fetchTarefas(); // revert on fail
    }
  };

  return { tarefas, isLoading, addTarefa, toggleStatus, deleteTarefa };
};
