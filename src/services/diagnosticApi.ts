import { DiagnosticResult, DiagnosticSession, Lead } from "../types/diagnostic";

// Base URL provida por env ou usa default para testes locais
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const diagnosticApi = {
  // Iniciar uma nova sessão
  async startSession(): Promise<{ id: string }> {
    // Mock
    await delay(500);
    return { id: Math.random().toString(36).substring(7) };
  },

  // Atualizar sessão em andamento
  async updateSession(id: string, data: Partial<DiagnosticSession>): Promise<void> {
    // Mock
    // console.log(`Atualizando sessão ${id}...`);
    await delay(300);
  },

  // Finalizar e gerar resultado
  async submitSession(id: string, data: DiagnosticSession): Promise<{ resultId: string }> {
    // Mock: Na vida real, o backend receberia as respostas, calcularia e devolveria um ID de resultado
    await delay(1000);
    return { resultId: id }; // Usa o mesmo ID por praticidade no mock
  },

  // Obter um resultado salvo (usado na página de resultado)
  async getResult(id: string): Promise<DiagnosticResult | null> {
    // Mock: Na vida real buscaria do banco. 
    // Como estamos apenas no frontend agora, o estado final será passado via localStorage no hook.
    // Retornamos null para forçar a leitura local ou tratar erro.
    await delay(500);
    return null;
  },

  // Enviar PDF por email
  async sendEmail(resultId: string, email: string): Promise<void> {
    await delay(1000);
    console.log(`Enviando PDF do resultado ${resultId} para ${email}`);
  },

  // Solicitar contato de especialista
  async requestContact(resultId: string, lead: Lead): Promise<void> {
    await delay(1000);
    console.log(`Contato solicitado pelo lead ${lead.nome} (Resultado ${resultId})`);
  },
  
  // Track events (Analytics)
  async trackEvent(eventName: string, payload?: any): Promise<void> {
    // Mock analytics
    // console.log(`[ANALYTICS] ${eventName}`, payload);
  }
};
