import { Lead, LeadStatus } from '../types/lead';
import { mockLeads } from '../data/mockData';

const STORAGE_KEY = '@EvolveCRM:leads';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const leadsService = {
  async getLeads(): Promise<Lead[]> {
    await delay(500);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockLeads));
      return mockLeads;
    }
    return JSON.parse(stored) as Lead[];
  },

  async updateLeadStatus(leadId: string, newStatus: LeadStatus): Promise<void> {
    await delay(300);
    const stored = localStorage.getItem(STORAGE_KEY);
    const leads: Lead[] = stored ? JSON.parse(stored) : mockLeads;
    
    const updatedLeads = leads.map(l => 
      l.id === leadId ? { ...l, status: newStatus } : l
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeads));
  },

  async addLead(lead: Omit<Lead, 'id' | 'dataCriacao'>): Promise<Lead> {
    await delay(600);
    const stored = localStorage.getItem(STORAGE_KEY);
    const leads: Lead[] = stored ? JSON.parse(stored) : mockLeads;
    
    const newLead: Lead = {
      ...lead,
      id: `l-${Date.now()}`,
      dataCriacao: new Date().toISOString().split('T')[0],
    };
    
    leads.push(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return newLead;
  }
};
