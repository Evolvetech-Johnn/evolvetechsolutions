import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { TarefaPrioridade, TarefaStatus } from '../../types/tarefa';

interface TarefaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const TarefaFormModal: React.FC<TarefaFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    dataVencimento: new Date().toISOString().split('T')[0],
    prioridade: 'Média' as TarefaPrioridade,
    status: 'Pendente' as TarefaStatus,
    responsavelId: 'u-1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        titulo: '',
        descricao: '',
        dataVencimento: new Date().toISOString().split('T')[0],
        prioridade: 'Média',
        status: 'Pendente',
        responsavelId: 'u-1',
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Tarefa">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Título da Tarefa" 
          required 
          value={formData.titulo}
          onChange={e => setFormData({...formData, titulo: e.target.value})}
        />
        
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-slate-300">Descrição</label>
          <textarea
            className="flex w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={3}
            value={formData.descricao}
            onChange={e => setFormData({...formData, descricao: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Data de Vencimento" 
            type="date" 
            required 
            value={formData.dataVencimento}
            onChange={e => setFormData({...formData, dataVencimento: e.target.value})}
          />
          <Select
            label="Prioridade"
            options={[
              { value: 'Baixa', label: 'Baixa' },
              { value: 'Média', label: 'Média' },
              { value: 'Alta', label: 'Alta' }
            ]}
            value={formData.prioridade}
            onChange={e => setFormData({...formData, prioridade: e.target.value as TarefaPrioridade})}
          />
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={loading}>
            Salvar Tarefa
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TarefaFormModal;
