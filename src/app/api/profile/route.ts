import { NextResponse } from 'next/server';
import { getData, setData } from '@/lib/db';

export async function GET() {
    try {
        const data = getData();
        return NextResponse.json(data.profile);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password, profile } = body;
        
        const data = getData();
        
        // Simple security check
        if (password !== data.adminPassword) {
            return NextResponse.json({ error: 'Unauthorized: Only administrators can update the profile.' }, { status: 403 });
        }
        
        const updatedData = setData({ profile });
        return NextResponse.json(updatedData.profile);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
