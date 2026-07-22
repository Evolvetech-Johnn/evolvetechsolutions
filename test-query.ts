import * as dotenv from 'dotenv';
dotenv.config();

async function testQuery() {
  try {
    const postgres = (await import('postgres')).default;
    const sql = postgres(process.env.DATABASE_URL!);
    
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
