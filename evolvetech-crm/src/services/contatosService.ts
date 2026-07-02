import { Contato } from '../types/contato';
import { mockContatos } from '../data/mockData';

const STORAGE_KEY = '@EvolveCRM:contatos';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const contatosService = {
  async getContatos(): Promise<Contato[]> {
    await delay(400);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockContatos));
      return mockContatos;
    }
    return JSON.parse(stored) as Contato[];
  },

  async getContatoById(id: string): Promise<Contato | null> {
    await delay(300);
    const contatos = await this.getContatos();
    return contatos.find((c) => c.id === id) || null;
  },

  async addContato(contato: Omit<Contato, 'id'>): Promise<Contato> {
    await delay(500);
    const contatos = await this.getContatos();
    const newContato: Contato = {
      ...contato,
      id: `c-${Date.now()}`,
    };
    contatos.push(newContato);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contatos));
    return newContato;
  },

  async updateContato(id: string, data: Partial<Contato>): Promise<Contato> {
    await delay(500);
    const contatos = await this.getContatos();
    const index = contatos.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Contato não encontrado');
    
    const updated = { ...contatos[index], ...data };
    contatos[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contatos));
    return updated;
  },

  async deleteContato(id: string): Promise<void> {
    await delay(500);
    const contatos = await this.getContatos();
    const filtered = contatos.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
