import { Tarefa, TarefaStatus } from '../types/tarefa';
import { mockTarefas } from '../data/mockData';

const STORAGE_KEY = '@EvolveCRM:tarefas';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const tarefasService = {
  async getTarefas(): Promise<Tarefa[]> {
    await delay(300);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTarefas));
      return mockTarefas;
    }
    return JSON.parse(stored) as Tarefa[];
  },

  async addTarefa(tarefa: Omit<Tarefa, 'id'>): Promise<Tarefa> {
    await delay(400);
    const tarefas = await this.getTarefas();
    const newTarefa: Tarefa = {
      ...tarefa,
      id: `t-${Date.now()}`,
    };
    tarefas.push(newTarefa);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    return newTarefa;
  },

  async updateTarefaStatus(id: string, status: TarefaStatus): Promise<void> {
    await delay(300);
    const tarefas = await this.getTarefas();
    const updated = tarefas.map((t) => t.id === id ? { ...t, status } : t);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  
  async deleteTarefa(id: string): Promise<void> {
    await delay(300);
    const tarefas = await this.getTarefas();
    const filtered = tarefas.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
