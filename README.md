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
- **Página de Produto** - Detalhes do produto com opção de adicionar ao carrinho
- **Carrinho de Compras** - Visualização e gestão de itens no carrinho
- **Checkout** - Formulário de finalização de pedido com validação
- **Rastreamento de Pedidos** - Página dedicada para rastrear pedidos (`/rastreio`)
- **Serviços** - Serviços para agricultores (logística, conservação, embalagem, consultoria)
- **Painel Administrativo** - Sistema completo de gestão (produtos, pedidos, utilizadores)

### Navegação Mobile

A navegação inferior (bottom nav) em dispositivos móveis inclui:
1. **Início** - Página principal
2. **Produtos** - Catálogo de produtos
3. **Rastreio** - Rastreamento de pedidos (novo)
4. **Dicas** - Dicas agrícolas
5. **Conta** - Acesso à conta do utilizador

> **Nota**: O carrinho continua acessível via ícone no header (topo da página).

### Sistema de Checkout

O formulário de checkout possui os seguintes campos:
- **Nome Completo** (obrigatório)
- **Email** (obrigatório) - Para confirmação e fatura
- **Telefone** (opcional) - Formato: 244XXXXXXXXX
- **Endereço de Entrega** (obrigatório)
  - Rua/Avenida
  - Bairro
  - Município
  - Província
- **Notas do Pedido** (opcional)
- **Método de Pagamento**: Transferência Bancária (padrão)

### Sistema de Administração

#### Setup Inicial

Para criar o primeiro Super Administrador:

1. Registar uma conta normal em `/registar`
2. Aceder a `/admin/setup` enquanto autenticado
3. Seguir o processo de setup para promover a conta a SUPER_ADMIN

**Token de Setup (opcional)**:
- Configure `ADMIN_SETUP_TOKEN` no `.env` para adicionar segurança extra
- Se configurado, será necessário inserir o token durante o setup

```env
# .env.local
ADMIN_SETUP_TOKEN=seu-token-secreto-aqui
```

#### Acesso ao Painel Admin

Utilizadores com roles ADMIN ou SUPER_ADMIN têm acesso ao link "Painel Admin" no menu do utilizador (tanto desktop como mobile).

#### Gestão de Utilizadores

**Super Administradores** podem:
- Visualizar todos os utilizadores do sistema
- Alterar roles de qualquer utilizador
- Promover utilizadores a STAFF, ADMIN ou SUPER_ADMIN
- Despromover administradores a CUSTOMER

**Restrições de Segurança**:
- Não é possível alterar a própria role
- Não é possível remover o último SUPER_ADMIN do sistema
- Apenas SUPER_ADMIN pode alterar roles (ADMIN pode apenas visualizar)

#### Hierarquia de Roles

1. **CUSTOMER** (Cliente) - Utilizador padrão, pode fazer compras
2. **STAFF** (Funcionário) - Pode visualizar e atualizar pedidos
3. **ADMIN** (Administrador) - Acesso completo ao painel (exceto gestão de roles)
4. **SUPER_ADMIN** (Super Administrador) - Acesso total, incluindo gestão de utilizadores

### Migração da Base de Dados

**⚠️ Importante**: As últimas alterações incluem mudanças no schema da base de dados:

- `clienteEmail` agora é **obrigatório** na tabela Pedido
- `clienteTelefone` agora é **opcional** na tabela Pedido

Antes de fazer deploy, execute a migração:

```bash
# Desenvolvimento
npx prisma migrate dev --name email_required_phone_optional

# Produção
npx prisma migrate deploy
```

Para aplicar as mudanças sem migração (usar com cuidado):
```bash
npx prisma db push
```

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

- ~~Implementar autenticação de usuários~~ ✅ Implementado
- ~~Sistema de carrinho de compras~~ ✅ Implementado
- ~~Painel de administração~~ ✅ Implementado
- ~~Sistema de gestão de utilizadores~~ ✅ Implementado
- ~~Rastreamento de pedidos~~ ✅ Implementado
- Integração com gateway de pagamento
- Sistema de notificações em tempo real
- Dashboard de analytics para admins
- Sistema de avaliações de produtos
- Chat de suporte ao cliente

## Licença

Este projeto é privado e pertence ao AgriConecta.
