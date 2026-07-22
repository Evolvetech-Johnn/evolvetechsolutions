import { NextResponse } from 'next/server';
import { db } from '@/db';
import { teamProfiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const profiles = await db.select().from(teamProfiles).where(eq(teamProfiles.slug, slug));
    
    if (profiles.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(profiles[0]);
  } catch (error) {
    console.error('Error fetching team profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { name, role, description, imageUrl, orderIndex } = body;

    const updatedProfile = await db.update(teamProfiles).set({
      name,
      role,
      description,
      imageUrl,
      orderIndex: orderIndex || 0,
      updatedAt: new Date(),
    }).where(eq(teamProfiles.slug, slug)).returning();

    if (updatedProfile.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProfile[0]);
  } catch (error) {
    console.error('Error updating team profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
