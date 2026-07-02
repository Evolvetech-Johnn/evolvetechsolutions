import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Contato } from '../../types/contato';

interface ContatoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Contato, 'id'>) => Promise<void>;
  initialData?: Contato | null;
}

const ContatoForm: React.FC<ContatoFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    cargo: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        email: initialData.email,
        telefone: initialData.telefone,
        empresa: initialData.empresa,
        cargo: initialData.cargo,
      });
    } else {
      setFormData({ nome: '', email: '', telefone: '', empresa: '', cargo: '' });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Contato" : "Novo Contato"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Nome Completo" 
          required 
          value={formData.nome}
          onChange={e => setFormData({...formData, nome: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="E-mail" 
            type="email" 
            required 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            label="Telefone" 
            required 
            value={formData.telefone}
            onChange={e => setFormData({...formData, telefone: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Empresa" 
            required 
            value={formData.empresa}
            onChange={e => setFormData({...formData, empresa: e.target.value})}
          />
          <Input 
            label="Cargo" 
            required 
            value={formData.cargo}
            onChange={e => setFormData({...formData, cargo: e.target.value})}
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={loading}>
            {initialData ? "Salvar Alterações" : "Salvar Contato"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ContatoForm;
