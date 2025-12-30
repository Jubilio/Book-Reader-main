# 📚 Book-Reader

Uma experiência premium de leitura de livros digitais construída com Next.js 14.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![License](https://img.shields.io/badge/License-ISC-green)

## ✨ Features

- 📖 **Leitura Imersiva** - Interface limpa e focada na leitura
- 🌙 **Temas** - Suporte a Light, Dark e Sepia mode
- 🔍 **Busca Inteligente** - Encontre livros por título, autor ou descrição
- 👤 **Perfil Personalizável** - Gerencie suas informações de autor
- 🔐 **Segurança** - Senhas hashadas com bcrypt
- 📱 **Responsivo** - Funciona em qualquer dispositivo
- 🎨 **Animações Fluidas** - Transições suaves com Framer Motion

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Jubilio/Book-Reader.git

# Entre no diretório
cd Book-Reader

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```text
src/
├── app/                    # Rotas Next.js (App Router)
│   ├── api/               # API Routes
│   ├── book/              # Página de leitura
│   ├── discover/          # Descoberta de livros
│   ├── library/           # Biblioteca pessoal
│   ├── profile/           # Perfil do usuário
│   └── settings/          # Configurações
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx        # Cabeçalho com busca e tema
│   ├── SideBar.tsx       # Menu lateral
│   └── BookCard.tsx      # Card de livro
├── context/               # Context API
│   ├── UserContext.tsx   # Estado do usuário
│   ├── ThemeContext.tsx  # Gerenciamento de tema
│   └── SidebarContext.tsx
└── lib/                   # Utilitários
    ├── db.ts             # Persistência de dados
    └── password.ts       # Hash de senhas (bcrypt)
```

## 🛠️ Stack Tecnológica

| Tecnologia | Propósito |
| --- | --- |
| **Next.js 14** | Framework React com SSR |
| **React 18** | Biblioteca UI |
| **TypeScript** | Tipagem estática |
| **Framer Motion** | Animações |
| **bcryptjs** | Hash de senhas |
| **FontAwesome** | Ícones |

## 🎨 Temas Disponíveis

| Tema | Descrição |
| --- | --- |
| ☀️ Light | Tema claro padrão |
| 🌙 Dark | Tema escuro para leitura noturna |
| 📜 Sepia | Tom sépia para conforto visual |

## 📜 Scripts

```bash
npm run dev    # Servidor de desenvolvimento
npm run build  # Build de produção
npm run start  # Servidor de produção
npm run lint   # Verificar linting
npm run clean  # Limpar cache
```

## 👤 Autor

**Jubílio Maússe**  
Autor • Servo de Deus • Mentor Espiritual

---

Feito com ❤️ para a glória de Deus
