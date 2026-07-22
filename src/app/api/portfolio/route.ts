import { NextResponse } from 'next/server';
import { db } from '@/db';
import { portfolioItems } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const items = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, imageUrl, orderIndex } = body;

    const newItem = await db.insert(portfolioItems).values({
      title,
      description,
      category,
      imageUrl,
      orderIndex: orderIndex || 0,
    }).returning();

    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
