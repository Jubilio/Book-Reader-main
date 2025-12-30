import fs from 'fs';
import path from 'path';
import { hashPasswordSync } from './password';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure the data directory and db.json exist
function ensureDb() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
        // Initial data with hashed password
        const initialData = {
            profile: {
                name: "Jubílio Maússe",
                role: "Autor • Servo de Deus • Mentor Espiritual",
                bio: "Servo de Deus, dedicado a guiar almas no caminho da restauração e do primeiro amor.",
                image: "/profile.jpg",
                mission: "Encorajar leitores à restauração espiritual e ao aprofundamento da comunhão com o Criador através da Palavra.",
                testimony: "Minha jornada começou em 2015, após um encontro transformador com a Graça. Desde então, cada obra que escrevo é um reflexo desse chamado eterno.",
                stats: {
                    booksWritten: 5,
                    livesImpacted: "5.0k+",
                    daysPraying: "3,450"
                }
            },
            // Password is now stored as bcrypt hash (default: admin123)
            adminPasswordHash: hashPasswordSync("admin123")
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
}

export function getData() {
    ensureDb();
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content);
}

export function setData(data: any) {
    ensureDb();
    const currentData = getData();
    const updatedData = { ...currentData, ...data };
    fs.writeFileSync(DB_PATH, JSON.stringify(updatedData, null, 2));
    return updatedData;
}
