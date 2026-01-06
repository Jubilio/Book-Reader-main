import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    try {
        console.log("Using URL:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
        const result = await prisma.$queryRaw`SELECT 1`;
        console.log("Connection successful:", result);
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
