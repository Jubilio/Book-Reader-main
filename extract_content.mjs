import { books } from './src/constants/mockData.mjs';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'public', 'content');

if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

books.forEach(book => {
    if (book.content) {
        const filePath = path.join(contentDir, `${book.id}.html`);
        fs.writeFileSync(filePath, book.content);
        console.log(`Extracted content for book ${book.id} to ${filePath}`);
    }
});
