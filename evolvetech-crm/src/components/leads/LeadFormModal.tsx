import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { LeadStatus } from '../../types/lead';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    valorEstimado: '',
    status: 'Novo' as LeadStatus,
    origem: '',
    responsavelId: 'u-1', // Mock admin
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        valorEstimado: Number(formData.valorEstimado) || 0
      });
      setFormData({ nome: '', empresa: '', valorEstimado: '', status: 'Novo', origem: '', responsavelId: 'u-1' });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Lead">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Nome do Contato" 
          required 
          value={formData.nome}
          onChange={e => setFormData({...formData, nome: e.target.value})}
        />
        <Input 
          label="Empresa" 
          required 
          value={formData.empresa}
          onChange={e => setFormData({...formData, empresa: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Valor Estimado (R$)" 
            type="number" 
            required 
            value={formData.valorEstimado}
            onChange={e => setFormData({...formData, valorEstimado: e.target.value})}
          />
          <Select
            label="Estágio Inicial"
            options={[
              { value: 'Novo', label: 'Novo' },
              { value: 'Qualificado', label: 'Qualificado' },
              { value: 'Proposta', label: 'Proposta' }
            ]}
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value as LeadStatus})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
           <Input 
            label="Origem (ex: Site, Indicação)" 
            required 
            value={formData.origem}
            onChange={e => setFormData({...formData, origem: e.target.value})}
          />
          <Select
            label="Responsável"
            options={[
              { value: 'u-1', label: 'Admin User' },
              { value: 'u-2', label: 'Carlos Vendedor' },
              { value: 'u-3', label: 'Marina Vendas' }
            ]}
            value={formData.responsavelId}
            onChange={e => setFormData({...formData, responsavelId: e.target.value})}
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={loading}>
            Salvar Lead
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadFormModal;
