import * as dotenv from 'dotenv';
dotenv.config();

async function testQuery() {
  try {
    const postgres = (await import('postgres')).default;
    const sql = postgres(process.env.DATABASE_URL!);
    await sql`
      CREATE TABLE IF NOT EXISTS team_profiles (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text UNIQUE NOT NULL,
        name text NOT NULL,
        role text NOT NULL,
        description text,
        image_url text,
        order_index integer DEFAULT 0 NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log('Table team_profiles created successfully!');

    // Insert initial team profiles if they don't exist
    await sql`
      INSERT INTO team_profiles (slug, name, role, description, image_url, order_index)
      VALUES 
        ('marcos-gusmao', 'Marcos Gusmão', 'Designer Pleno', 'Especialista em criar experiências visuais premium e interfaces envolventes. Conheça um pouco da minha jornada e projetos recentes.', null, 1),
        ('endrius', 'Endrius', 'Especialista', 'Descrição do Endrius em breve.', null, 2),
        ('johnathan', 'Johnathan', 'Especialista', 'Descrição do Johnathan em breve.', null, 3)
      ON CONFLICT (slug) DO NOTHING;
    `;
    console.log('Team profiles seeded successfully!');

    console.log("Criando bucket 'portfolio' se não existir...");
    await sql`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('portfolio', 'portfolio', true)
      ON CONFLICT (id) DO UPDATE SET public = true;
    `;

    console.log("Criando politicas de acesso (RLS) para o bucket 'portfolio'...");
    
    // Drop existing policies if any to avoid errors
    await sql`DROP POLICY IF EXISTS "Permitir Uploads" ON storage.objects;`;
    await sql`DROP POLICY IF EXISTS "Permitir Leitura" ON storage.objects;`;
    
    // Create INSERT policy
    await sql`
      CREATE POLICY "Permitir Uploads"
      ON storage.objects FOR INSERT TO public WITH CHECK (
        bucket_id = 'portfolio'
      );
    `;

    // Create SELECT policy
    await sql`
      CREATE POLICY "Permitir Leitura"
      ON storage.objects FOR SELECT TO public USING (
        bucket_id = 'portfolio'
      );
    `;

    console.log("Tudo pronto! Bucket e políticas criados com sucesso.");
  } catch (error) {
    console.error("Query failed:", error);
  }
  process.exit(0);
}
testQuery();
