import postgres from 'postgres';
import "dotenv/config";

const sql = postgres(process.env.DATABASE_URL as string);

async function main() {
    try {
        console.log("Testing connection with raw postgres...");
        const result = await sql`SELECT 1 as connected`;
        console.log("Raw connection successful:", result);
    } catch (error) {
        console.error("Raw connection failed:", error);
    } finally {
        await sql.end();
    }
}

main();
