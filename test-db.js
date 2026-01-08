const fs = require('fs');
const path = require('path');

// Manually load .env to be sure
try {
    const envPath = path.resolve(process.cwd(), '.env');
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, ...values] = line.split('=');
        if (key && values.length > 0) {
            const val = values.join('=').trim().replace(/^["']|["']$/g, '');
            process.env[key.trim()] = val;
        }
    });
    console.log("Loaded .env file manually.");
} catch (e) {
    console.log("Could not load .env file manually:", e.message);
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    console.log('--- STARTING DATABASE TEST ---');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? "Defined (Hidden)" : "UNDEFINED");
    
    console.log('Attempting to connect...');
    await prisma.$connect();
    console.log('Connected! Fetching books...');
    
    const books = await prisma.book.findMany({ take: 1 });
    console.log('Query successful!');
    console.log(`Found ${books.length} books.`);
    
  } catch (e) {
    console.error('--- ERROR OCCURRED ---');
    console.error('Error Name:', e.name);
    console.error('Error Message:', e.message);
    if (e.code) console.error('Error Code:', e.code);
    if (e.meta) console.error('Error Meta:', JSON.stringify(e.meta));
    console.error('Full Error:', e);
  } finally {
    await prisma.$disconnect();
    console.log('--- TEST FINISHED ---');
  }
}

main();
