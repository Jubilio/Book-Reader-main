import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

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
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const book = await prisma.book.create({
            data: {
                title: data.title,
                author: data.author,
                description: data.description,
                coverImage: data.coverImage,
                contentPath: data.contentPath,
                content: data.content
            }
        });
        return NextResponse.json(book);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
    }
}
