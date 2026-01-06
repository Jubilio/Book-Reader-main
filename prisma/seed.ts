import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Load data from db.json
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  // 2. Upsert Profile
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {
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
  console.log('Profile seeded:', profile.name);

  // 3. Create Admin User
  const adminEmail = 'admin@bookreader.com'; // Default admin email
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
        passwordHash: dbData.adminPasswordHash,
        role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      name: dbData.profile.name,
      passwordHash: dbData.adminPasswordHash,
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded:', admin.email);

  // 4. Load books from mockData.mjs (Simplified extraction)
  // Since we can't easily dynamic import .mjs in this script context without complexity,
  // we'll use a hardcoded list of the initial books or parse it.
  // For safety and speed, I'll extract common data.
  
  const books = [
    { id: 1, title: 'Retornando às Raízes', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', description: 'Uma jornada de arrependimento, restauração e propósito. Descubra como voltar ao primeiro amor.' },
    { id: 2, title: 'O Poder da Oração', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=600&auto=format&fit=crop', description: 'Mergulhe na intimidade com o Pai. Um guia prático para uma vida de oração constante e fervorosa.' },
    { id: 3, title: 'Nova Criatura', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop', description: 'As coisas velhas já passaram. Entenda sua nova identidade em Cristo e viva o propósito eterno.' },
    { id: 4, title: 'Salmos & Provérbios', author: 'Autores Clássicos', coverImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600&auto=format&fit=crop', description: 'Sabedoria milenar para o dia a dia. Uma coleção de versículos para meditação diária.' },
    { id: 5, title: 'Comunhão', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop', description: 'A importância de caminhar juntos. Cultive relacionamentos que fortalecem sua fé.' },
    { id: 6, title: 'A Grande Jornada', author: 'Estudos Bíblicos', coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop', description: 'Estudos aprofundados sobre a caminhada do cristão em tempos modernos.' },
    { id: 7, title: 'Binth Buque: Minha Musa', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop', description: 'Uma celebração do amor que floresce sob o luar. Versos dedicados à musa encantada.' },
    { id: 8, title: 'Binth Buque: R&B do Amor', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop', description: 'A melodia de um amor verdadeiro. Uma canção em forma de poesia para minha amada.' },
    { id: 9, title: 'O Mito do Amor', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=600&auto=format&fit=crop', description: 'Uma reflexão profunda e provocativa sobre a natureza do amor, suas dores, o egoísmo e a incansável busca por ele.' },
    { id: 10, title: 'Não Foi Por Acaso', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1510520434124-5bc7e699bf43?q=80&w=600&auto=format&fit=crop', description: 'Uma carta reveladora sobre os encontros que parecem acaso, mas são destinos traçados há muito tempo.' },
    { id: 11, title: 'Sem Querer: O Despertar', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1531323386183-298a09ba729d?q=80&w=600&auto=format&fit=crop', description: 'Um manifesto sobre a passividade da vida e o despertar necessário para a mudança social e pessoal.' },
    { id: 12, title: 'Ku Kotisa Mhalamhala', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?q=80&w=600&auto=format&fit=crop', description: 'Um poema de admiração silenciosa e conquista. "Pomba minha, que andas pelas fendas das penhas..."' },
    { id: 13, title: 'Amor Aparente', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=600&auto=format&fit=crop', description: 'Um desabafo sincero sobre ilusões amorosas, vulnerabilidade e a dor de perder uma chance única.' },
    { id: 14, title: 'Eu e Ela: O Peso da Inocência', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1511553677255-b939aa2bea48?q=80&w=600&auto=format&fit=crop', description: 'Um relato profundo sobre paixão secreta, a arte de se comunicar e a coragem de assumir sentimentos guardados.' },
    { id: 15, title: 'Louco Por Ela', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?q=80&w=600&auto=format&fit=crop', description: 'A confissão de um amor silencioso, a loucura de querer quem parece distante e a esperança de um final feliz.' },
    { id: 16, title: 'O Garimpo do Amor', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=600&auto=format&fit=crop', description: 'Uma metáfora rica sobre a busca pelo amor verdadeiro, comparada à difícil mas recompensadora tarefa de garimpar ouro.' },
    { id: 17, title: 'O Anjo Que Você Perdeu', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1595123550441-d377e8a7feae?q=80&w=600&auto=format&fit=crop', description: 'Uma reflexão sobre a percepção humana, a espiritualidade e como nossa intimidade com Deus pode ser mal interpretada.' },
    { id: 18, title: 'Jubílio Também Ama', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=600&auto=format&fit=crop', description: 'Um grito de um coração que ama e não é correspondido. Um desabafo cru sobre a dor da indiferença.' },
    { id: 19, title: 'A Dose do Interesse', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1496345962527-29757c3a3d94?q=80&w=600&auto=format&fit=crop', description: 'Uma carta sobre tentativas falhas e intenções puras. Sobre passagens para a lua e a busca pelo brilho verdadeiro nos olhos de quem se ama.' },
    { id: 20, title: 'Por que não?', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop', description: 'Um questionamento profundo sobre a existência, fé e a coragem de assumir nossos caminhos. A vida como um tabuleiro de xadrez.' },
    { id: 21, title: 'A Melhor Chance', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=600&auto=format&fit=crop', description: 'Um manifesto de quem acredita ser a pessoa certa. Um convite para esquecer os erros do passado e apostar em um futuro a dois.' },
    { id: 22, title: 'The Silent Game!', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=600&auto=format&fit=crop', description: 'A vida encarada como um jogo de estratégia e silêncio. Um manual sobre como dominar as próprias emoções e fazer a jogada certa.' },
    { id: 23, title: 'Amor: Uma Heresia', author: 'Jubílio Maússe', coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop', description: 'Uma contradição ardente entre querer abolir o amor e simultaneamente confessar o desejo ardente de amar. Fogo e paixão entrelaçados.' },
  ];

  for (const bookData of books) {
    const book = await prisma.book.upsert({
      where: { id: bookData.id },
      update: {
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        coverImage: bookData.coverImage,
        contentPath: `/content/${bookData.id}.html`,
      },
      create: {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        coverImage: bookData.coverImage,
        contentPath: `/content/${bookData.id}.html`,
      },
    });
    console.log('Book seeded:', book.title);
  }

  console.log('Seed finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
