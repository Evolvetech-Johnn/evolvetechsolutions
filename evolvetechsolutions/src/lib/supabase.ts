import { createClient } from '@supabase/supabase-js';

// Essas variáveis devem estar no arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verifica se as credenciais estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não estão configuradas no .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
