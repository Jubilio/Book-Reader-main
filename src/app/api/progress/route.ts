import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookId = parseInt(searchParams.get('bookId') || '');

    if (!bookId) {
        return NextResponse.json({ error: 'Book ID required' }, { status: 400 });
    }

    try {
        const progress = await prisma.readingProgress.findUnique({
            where: {
                userId_bookId: {
                    userId: (session.user as any).id,
                    bookId: bookId
                }
            }
        });

        return NextResponse.json(progress || { scrollPosition: 0, isFinished: false });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { bookId, scrollPosition, isFinished } = await request.json();

        if (!bookId) {
            return NextResponse.json({ error: 'Book ID required' }, { status: 400 });
        }

        const progress = await prisma.readingProgress.upsert({
            where: {
                userId_bookId: {
                    userId: (session.user as any).id,
                    bookId: parseInt(bookId)
                }
            },
            update: {
                scrollPosition: parseFloat(scrollPosition),
                isFinished: !!isFinished,
                lastRead: new Date()
            },
            create: {
                userId: (session.user as any).id,
                bookId: parseInt(bookId),
                scrollPosition: parseFloat(scrollPosition),
                isFinished: !!isFinished
            }
        });

        return NextResponse.json(progress);
    } catch (error) {
        console.error("Progress save error:", error);
        return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
    }
}
