import { NextResponse } from 'next/server';
import { getData } from '@/lib/db';
import { verifyPassword } from '@/lib/password';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const data = getData();
        
        const isValid = await verifyPassword(password || '', data.adminPasswordHash || '');
        
        if (isValid) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Senha incorreta' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
    }
}
