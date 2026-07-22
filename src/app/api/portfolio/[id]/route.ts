import { NextResponse } from 'next/server';
import { db } from '@/db';
import { portfolioItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, category, imageUrl, orderIndex } = body;

    const updatedItem = await db.update(portfolioItems).set({
      title,
      description,
      category,
      imageUrl,
      orderIndex: orderIndex || 0,
      updatedAt: new Date(),
    }).where(eq(portfolioItems.id, id)).returning();

    if (updatedItem.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem[0]);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const deletedItem = await db.delete(portfolioItems).where(eq(portfolioItems.id, id)).returning();

    if (deletedItem.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
