import { NextResponse } from 'next/server';
import { db } from '@/db';
import { teamProfiles } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const profiles = await db.select().from(teamProfiles).orderBy(desc(teamProfiles.orderIndex));
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching team profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, name, role, description, imageUrl, orderIndex } = body;

    const newProfile = await db.insert(teamProfiles).values({
      slug,
      name,
      role,
      description,
      imageUrl,
      orderIndex: orderIndex || 0,
    }).returning();

    return NextResponse.json(newProfile[0]);
  } catch (error) {
    console.error('Error creating team profile:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}
