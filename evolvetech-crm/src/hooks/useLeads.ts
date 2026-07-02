import { useState, useEffect, useCallback } from 'react';
import { Lead, LeadStatus } from '../types/lead';
import { leadsService } from '../services/leadsService';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await leadsService.getLeads();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar leads');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    // Atualização otimista
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    try {
      await leadsService.updateLeadStatus(leadId, newStatus);
    } catch (err) {
      // Reverter se falhar
      await fetchLeads();
      throw err;
    }
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'dataCriacao'>) => {
    const newLead = await leadsService.addLead(lead);
    setLeads(prev => [...prev, newLead]);
    return newLead;
  };

  return { leads, isLoading, error, updateLeadStatus, addLead, refreshLeads: fetchLeads };
};
