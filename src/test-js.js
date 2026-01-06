const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL);

async function main() {
    try {
        console.log("Testing connection with plain JavaScript...");
        const result = await sql`SELECT 1 as connected`;
        console.log("JavaScript connection successful:", result[0].connected);
    } catch (error) {
        console.error("JavaScript connection failed:", error);
    } finally {
        await sql.end();
    }
}

main();
