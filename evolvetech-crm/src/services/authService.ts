import { Usuario } from '../types/usuario';
import { mockUsers, MOCK_PASSWORD } from '../data/mockData';

// Simula delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, senha: string): Promise<Usuario> {
    await delay(1000); // Simulando delay de 1s

    const user = mockUsers.find((u) => u.email === email);

    if (!user || senha !== MOCK_PASSWORD) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // Na vida real, retornaríamos um token JWT. Aqui guardamos o usuário direto.
    localStorage.setItem('@EvolveCRM:user', JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    await delay(500);
    localStorage.removeItem('@EvolveCRM:user');
  },

  async resetPassword(email: string): Promise<void> {
    await delay(1500);
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      // Por segurança na vida real não diríamos se existe, mas aqui para a demo vamos dizer.
      throw new Error('Usuário não encontrado.');
    }
  },

  getCurrentUser(): Usuario | null {
    const userJson = localStorage.getItem('@EvolveCRM:user');
    if (userJson) {
      try {
        return JSON.parse(userJson) as Usuario;
      } catch {
        return null;
      }
    }
    return null;
  },
};
