# AgriConecta - Marketplace Agrícola de Angola

Este é o marketplace agrícola que conecta agricultores e consumidores em Angola, agora implementado com Next.js 14 e App Router.

## Sobre o Projeto

AgriConecta é uma plataforma que permite aos consumidores angolanos comprar produtos frescos diretamente dos agricultores locais, apoiando a economia local e garantindo qualidade.

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Prisma** - ORM para base de dados
- **SQLite** - Base de dados local para desenvolvimento
- **PWA Ready** - Progressive Web App

### Base de Dados

O projeto está configurado para usar **SQLite** por padrão para desenvolvimento local, o que permite desenvolvimento fácil sem necessidade de configurar uma base de dados externa.

Para produção, recomenda-se usar **PostgreSQL** (por exemplo, Neon). Para mudar para PostgreSQL, altere o `provider` no `prisma/schema.prisma` de `"sqlite"` para `"postgresql"` e atualize a `DATABASE_URL` no `.env`.

## Instalação e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar base de dados local

```bash
npm run db:setup
```

Este comando irá:
- Gerar o cliente Prisma
- Criar a base de dados SQLite local
- Popular com dados de teste

### 3. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

### 4. (Opcional) Visualizar base de dados

```bash
npm run db:studio
```

### Comandos úteis

- `npm run db:reset` - Limpar e recriar base de dados
- `npm run db:seed` - Popular com dados de teste
- `npm run db:studio` - Abrir interface visual da BD
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:push` - Sincronizar schema com base de dados

### Build de Produção

```bash
npm run build
npm start
```

### Verificação de Código

```bash
# Linting
npm run lint

# Verificação TypeScript
npx tsc --noEmit
```

## Estrutura do Projeto

```
agriconecta/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout raiz (pt-AO)
│   ├── page.tsx           # Página inicial
│   ├── produtos/          # Catálogo de produtos
│   ├── servicos/          # Serviços para agricultores
│   └── globals.css        # Estilos globais
├── components/            # Componentes reutilizáveis
│   └── ui/               # Componentes UI (Radix)
├── data/                 # Dados mock
│   └── produtos.json     # Catálogo de produtos
├── lib/                  # Utilitários
│   └── utils.ts          # Funções auxiliares
└── public/               # Assets estáticos
    └── manifest.json     # PWA manifest
```

## Funcionalidades

### Páginas Implementadas

- **Página Inicial** - Hero section, produtos em destaque, benefícios
- **Catálogo de Produtos** - Grid de produtos com filtros por categoria
- **Serviços** - Serviços para agricultores (logística, conservação, embalagem, consultoria)

### Características de Segurança

- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restritivo

### Localização

- Idioma: Português de Angola (pt-AO)
- Moeda: Kwanza (AOA)
- Formatação local angolana

## Próximos Passos

- Implementar autenticação de usuários
- Sistema de carrinho de compras
- Integração com gateway de pagamento
- Painel de administração
- Sistema de notificações
- Rastreamento de pedidos

## Licença

Este projeto é privado e pertence ao AgriConecta.
