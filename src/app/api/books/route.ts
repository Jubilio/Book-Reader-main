import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const books = await prisma.book.findMany({
            orderBy: { id: 'asc' }
        });
        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
    }
}
