import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure the data directory and db.json exist
function ensureDb() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
        // Initial data
        const initialData = {
            profile: {
                name: "Jubílio Maússe",
                role: "Autor • Servo de Deus • Mentor Espiritual",
                bio: "Servo de Deus, dedicado a guiar almas no caminho da restauração e do primeiro amor.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400",
                mission: "Encorajar leitores à restauração espiritual e ao aprofundamento da comunhão com o Criador através da Palavra.",
                testimony: "Minha jornada começou em 2015, após um encontro transformador com a Graça. Desde então, cada obra que escrevo é um reflexo desse chamado eterno.",
                stats: {
                    booksWritten: 5,
                    livesImpacted: "5.0k+",
                    daysPraying: "3,450"
                }
            },
            adminPassword: "admin123" // Simplified for demonstration
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
