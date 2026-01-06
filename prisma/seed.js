const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// CRITICAL: Load .env from project root explicitly
// __dirname = prisma/, we need to go up one level
const envPath = path.join(process.cwd(), '.env');
require('dotenv').config({ path: envPath });

// Validate DATABASE_URL before proceeding
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables!');
    console.error('Expected .env location:', envPath);
    console.error('File exists:', fs.existsSync(envPath));
    process.exit(1);
}

console.log('✅ DATABASE_URL loaded successfully');

// Instantiate Prisma Client (uses env vars automatically)
const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando migração de dados...');

    // Lendo db.json
    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    if (!fs.existsSync(dbPath)) {
        console.error('Arquivo data/db.json não encontrado.');
        return;
    }
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // Hash password securely
    // Default to 'admin123' if no hash in db.json, or always override for safety/clarity?
    // Let's use a clear default password "admin123" for this seed to ensure access.
    // The user can change it later via the app.
    const passwordRaw = 'admin123';
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    // Criando Usuário Admin
    console.log(`Criando usuário admin (Password: ${passwordRaw})...`);
    
    // Check if user exists to avoid overwriting usage data if run later? 
    // Upsert is fine, but let's be careful about existing passwords.
    // Actually, for seed we usually want to ensure admin access.
    
    await prisma.user.upsert({
        where: { email: 'admin@bookreader.com' },
        update: {
            role: 'ADMIN',
        },
        create: {
            email: 'admin@bookreader.com',
            name: dbData.profile.name,
            passwordHash: passwordHash, 
            role: 'ADMIN',
        },
    });

    await prisma.profile.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: dbData.profile.name,
            role: dbData.profile.role,
            bio: dbData.profile.bio,
            image: dbData.profile.image,
            mission: dbData.profile.mission,
            testimony: dbData.profile.testimony,
            booksWritten: dbData.profile.stats.booksWritten,
            livesImpacted: dbData.profile.stats.livesImpacted,
            daysPraying: dbData.profile.stats.daysPraying,
        },
    });

    // Migrando Livros
    console.log('Migrando livros...');
    const mockDataPath = path.join(process.cwd(), 'src', 'constants', 'mockData.mjs');
    if (fs.existsSync(mockDataPath)) {
        const content = fs.readFileSync(mockDataPath, 'utf8');
        const booksMatch = content.match(/export const books = (\[[\s\S]*?\]);/);
        if (booksMatch) {
             // Limpeza básica para converter de MJS string para JSON aproximado
            let booksJsonStr = booksMatch[1]
                .replace(/'/g, '"')
                .replace(/(\w+):/g, '"$1":')
                .replace(/,(\s*\])/g, '$1');
            
            try {
                const books = JSON.parse(booksJsonStr);
                for (const book of books) {
                    await prisma.book.upsert({
                        where: { id: book.id },
                        update: {},
                        create: {
                            id: book.id,
                            title: book.title,
                            author: book.author,
                            description: book.description,
                            coverImage: book.image,
                            contentPath: `/content/${book.id}.html`
                        }
                    });
                }
                console.log(`${books.length} livros migrados.`);
            } catch (e) {
                console.warn('Falha ao processar mockData.mjs automaticamente:', e.message);
            }
        }
    }

    console.log('Migração concluída com sucesso!');
}

main()
    .catch((e) => {
        console.error('Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
