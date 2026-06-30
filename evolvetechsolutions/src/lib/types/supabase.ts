// Arquivo de tipos para o Supabase
// Gerar automaticamente usando o schema do banco de dados no futuro com:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          name: string
          company: string
          role: string
          phone: string
          email: string
          // Adicione mais campos conforme necessário
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          company: string
          role: string
          phone: string
          email: string
          // Adicione mais campos conforme necessário
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          company?: string
          role?: string
          phone?: string
          email?: string
          // Adicione mais campos conforme necessário
        }
        Relationships: []
      }
    }
  }
}
