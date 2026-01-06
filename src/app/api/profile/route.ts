import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get the user's profile data
    const profile = await prisma.profile.findUnique({
      where: { id: 1 }
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Check if user has ADMIN role
  if ((session.user as any).role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden: Only administrators can update the profile' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { profile } = body;

    const updatedProfile = await prisma.profile.update({
      where: { id: 1 },
      data: {
        name: profile.name,
        role: profile.role,
        bio: profile.bio,
        image: profile.image,
        mission: profile.mission,
        testimony: profile.testimony,
        booksWritten: parseInt(profile.stats.booksWritten),
        livesImpacted: profile.stats.livesImpacted,
        daysPraying: profile.stats.daysPraying,
      }
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
