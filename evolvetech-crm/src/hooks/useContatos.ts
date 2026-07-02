import { useState, useEffect, useCallback } from 'react';
import { Contato } from '../types/contato';
import { contatosService } from '../services/contatosService';

export const useContatos = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContatos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await contatosService.getContatos();
      setContatos(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar contatos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContatos();
  }, [fetchContatos]);

  const addContato = async (contato: Omit<Contato, 'id'>) => {
    const newContato = await contatosService.addContato(contato);
    setContatos(prev => [...prev, newContato]);
    return newContato;
  };

  const updateContato = async (id: string, data: Partial<Contato>) => {
    const updated = await contatosService.updateContato(id, data);
    setContatos(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const deleteContato = async (id: string) => {
    await contatosService.deleteContato(id);
    setContatos(prev => prev.filter(c => c.id !== id));
  };

  return { contatos, isLoading, error, addContato, updateContato, deleteContato, refreshContatos: fetchContatos };
};
