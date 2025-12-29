
# ❄️ Navas Climatização

![Status](https://img.shields.io/badge/STATUS-CONCLUÍDO-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Supported-purple?style=for-the-badge&logo=pwa&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

O **Navas Climatização** é uma plataforma moderna para gestão e agendamento de serviços de climatização e ar-condicionado. O sistema funciona como um **PWA (Progressive Web App)**, permitindo instalação em dispositivos móveis, e inclui funcionalidades completas para agendamento de serviços e controle financeiro da empresa.

---

## 🚀 Funcionalidades Principais

### 📅 Agendamento de Serviços
* **Reserva Online:** Interface intuitiva para clientes selecionarem serviços (Instalação, Manutenção, Limpeza) e horários.
* **Histórico de Agendamentos:** Visualização clara dos serviços passados e futuros (`/bookings`).
* **Catálogo de Serviços:** Listagem dinâmica com preços e descrições detalhadas.

### 💰 Módulo Financeiro
* **Dashboard Financeiro:** Acompanhamento de receitas e despesas da empresa (`/finance`).
* **Gráficos e Métricas:**
    * Resumo de transações recentes.
    * Gráficos de rosca (Pie Chart) para distribuição de categorias.
    * Balanço mensal visual.
* **Gestão de Transações:** Funcionalidade para adicionar e editar entradas e saídas financeiras.

### 📱 Experiência Mobile (PWA)
* **Instalável:** Pode ser instalado como um aplicativo nativo no Android e iOS.
* **Responsivo:** Layout totalmente adaptado para telas móveis e desktop.

### 🔐 Autenticação
* **Login Social:** Integração segura via Google (NextAuth.js).
* **Gestão de Perfil:** Área do usuário com informações pessoais e histórico.

---

## 🛠️ Stack Tecnológica

* **Frontend & Framework:**
    * [Next.js 14](https://nextjs.org/) (App Router)
    * [React](https://react.dev/)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/) (Estilização)
    * [ShadCN UI](https://ui.shadcn.com/) (Componentes de UI)
* **Backend & Dados:**
    * [Prisma ORM](https://www.prisma.io/)
    * [PostgreSQL](https://www.postgresql.org/) (via Supabase ou NeonDB)
    * [NextAuth.js](https://next-auth.js.org/) (Autenticação)
* **Ferramentas Adicionais:**
    * [Recharts](https://recharts.org/) (Visualização de Dados/Gráficos)
    * [Date-fns](https://date-fns.org/) (Manipulação de Datas)
    * [React Hook Form](https://react-hook-form.com/) (Formulários)
    * [PWA Support](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) (Service Workers & Manifest)

---

## ⚡ Instalação e Execução

### 1. Pré-requisitos
* **Node.js** (v18+)
* **Gerenciador de pacotes** (npm, yarn ou pnpm)
* Banco de dados **PostgreSQL** ativo.

### 2. Clonar o repositório

```bash
git clone [https://github.com/victoriacarvalho/navas-climatizacao.git](https://github.com/victoriacarvalho/navas-climatizacao.git)
cd navas-climatizacao

```

### 3. Instalar dependências

```bash
npm install

```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as chaves necessárias:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Autenticação (NextAuth / Google)
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
NEXTAUTH_SECRET="sua_chave_secreta_gerada"
NEXTAUTH_URL="http://localhost:3000"

```

### 5. Configurar o Banco de Dados

Execute as migrações para criar as tabelas no banco de dados:

```bash
npx prisma generate
npx prisma migrate dev --name init

```

### 6. Rodar a Aplicação

```bash
npm run dev

```

Acesse `http://localhost:3000` no seu navegador.

---

## 📂 Estrutura do Projeto

```bash
navas-climatizacao/
├── app/
│   ├── bookings/           # Página de Agendamentos
│   ├── finance/            # Dashboard Financeiro
│   ├── navas/[id]/         # Páginas Dinâmicas de Serviço/Detalhes
│   ├── _components/        # Componentes Reutilizáveis (UI, Header, Sidebar)
│   ├── _actions/           # Server Actions (Backend Logic)
│   ├── _lib/               # Configurações (Auth, Prisma)
│   └── api/                # Rotas de API (NextAuth)
├── prisma/                 # Schema do Banco de Dados
├── public/                 # Assets e Configurações PWA (manifest, sw.js)
└── ...

```

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

## 👩‍💻 Autora

Desenvolvido por **Victória Carvalho**

