export type UserRole = 'admin' | 'seller';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
}
