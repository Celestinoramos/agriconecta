# Phase 3A: Backend Base - Implementation Complete ✅

## Overview
This phase implements the complete backend infrastructure for AgriConecta with PostgreSQL (Neon), Prisma ORM, and Next.js API Routes.

## What Was Built

### 1. Database Schema (Prisma)
- **User Model**: Support for both guest and registered users
  - Email/phone authentication
  - Password hashing with bcrypt
  - Guest checkout capability
  
- **Endereco Model**: Delivery addresses
  - Multiple addresses per user
  - Primary address marking
  - Complete address details (province, municipality, neighborhood)

- **Pedido Model**: Complete order lifecycle
  - Automatic order number generation (AGC-2024-00001)
  - Automatic invoice number generation (FT-2024-00001)
  - Order state tracking
  - Payment method support (Multicaixa Express, Bank Transfer)
  - Public tracking code for customers

- **ItemPedido Model**: Order line items with product snapshots
- **EstadoHistorico Model**: Complete order state history tracking

### 2. Database Functions (`lib/db/`)

#### Orders (`lib/db/pedidos.ts`)
- `criarPedido()` - Create orders with automatic numbering (race-condition safe)
- `obterPedidoPorId()` - Get order by ID with relations
- `obterPedidoPorNumero()` - Get order by order number
- `obterPedidoPorCodigoRastreio()` - Get order by tracking code
- `listarPedidosDoUsuario()` - List user's orders
- `listarTodosPedidos()` - List all orders with pagination and filtering
- `actualizarEstadoPedido()` - Update order state with history tracking
- `adicionarReferenciaPagamento()` - Add payment reference/proof

#### Users (`lib/db/users.ts`)
- `criarUser()` - Create users with password hashing
- `obterUserPorId()` - Get user by ID
- `obterUserPorEmail()` - Get user by email
- `obterUserPorTelefone()` - Get user by phone
- `adicionarEndereco()` - Add delivery address
- `listarEnderecosDoUser()` - List user addresses
- `actualizarUser()` - Update user details
- `converterConvidadoEmUser()` - Convert guest to registered user

### 3. API Routes

#### `/api/pedidos`
- **GET**: List orders with pagination and state filtering
  - Query params: `estado`, `pagina`, `limite`
- **POST**: Create new order
  - Validates all required fields
  - Automatically generates order and invoice numbers

#### `/api/pedidos/[id]`
- **GET**: Get specific order details
- **PATCH**: Update order
  - Update order state
  - Add payment reference/proof

#### `/api/pedidos/rastreio/[codigo]`
- **GET**: Public order tracking endpoint
  - Returns only public-safe information
  - No authentication required

#### `/api/users`
- **POST**: Create new user
  - Email or phone required
  - Password hashing (bcrypt, 12 rounds)
  - Duplicate checking
  - Password excluded from response

### 4. Type Definitions

#### Order Types (`types/pedido.ts`)
- Prisma-generated types exported
- `PedidoCompleto` - Order with all relations
- `CriarPedidoDTO` - DTO for order creation
- `ActualizarEstadoDTO` - DTO for state updates
- `EnderecoEntrega` - Address structure

#### User Types (`types/user.ts`)
- User and Address types exported
- `CriarUserDTO` - DTO for user creation
- `CriarEnderecoDTO` - DTO for address creation

### 5. Configuration Files

#### `.env.example`
Template with all required environment variables:
- Database URL (Neon PostgreSQL)
- NextAuth configuration (for future phases)
- Email service configuration (for future phases)
- Bank details for invoices

#### `package.json` Scripts
```bash
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database (dev)
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio
```

### 6. Seed Data (`prisma/seed.ts`)
- Test user with address
- Sample order with items
- Example order state history

## Security Features ✅

1. **Password Hashing**: bcrypt with 12 rounds
2. **Input Validation**: All API routes validate inputs
3. **Sensitive Data Filtering**: Passwords never returned in responses
4. **Race Condition Protection**: Database transactions for number generation
5. **Error Handling**: Proper error responses without exposing internals

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
1. Create a PostgreSQL database on [Neon](https://neon.tech)
2. Copy `.env.example` to `.env`
3. Update `DATABASE_URL` in `.env` with your Neon connection string

### 3. Generate Prisma Client
```bash
npm run db:generate
```

### 4. Push Schema to Database
```bash
npm run db:push
```

### 5. Seed Database (Optional)
```bash
npm run db:seed
```

### 6. Start Development Server
```bash
npm run dev
```

## Testing the API

### Create an Order
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteNome": "João Silva",
    "clienteTelefone": "244923456789",
    "clienteEmail": "joao@example.com",
    "enderecoEntrega": {
      "rua": "Rua da Missão, 123",
      "bairro": "Maianga",
      "municipio": "Luanda",
      "provincia": "Luanda",
      "referencia": "Próximo ao mercado"
    },
    "itens": [
      {
        "produtoId": "1",
        "produtoSlug": "tomate-cereja",
        "produtoNome": "Tomate Cereja",
        "produtoPreco": 3500,
        "produtoUnidade": "kg",
        "quantidade": 2
      }
    ],
    "metodoPagamento": "TRANSFERENCIA_BANCARIA"
  }'
```

### List Orders
```bash
curl http://localhost:3000/api/pedidos?estado=PENDENTE&pagina=1&limite=10
```

### Track Order
```bash
curl http://localhost:3000/api/pedidos/rastreio/[tracking-code]
```

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "telefone": "244912345678",
    "nome": "Maria Costa",
    "password": "securepassword123"
  }'
```

## Order State Flow

```
PENDENTE → PAGO → EM_PREPARACAO → EM_TRANSITO → ENTREGUE
           ↓
       CANCELADO
```

## Payment Methods

1. **MULTICAIXA_EXPRESS**: Mobile payment (Multicaixa)
2. **TRANSFERENCIA_BANCARIA**: Bank transfer (BFA)

## Database Performance

- **Indexes** on frequently queried fields:
  - Order number, tracking code, state, user ID, created date
  - User email and phone (for login)
  - Address user ID

- **Transactions** for atomic operations:
  - Order and invoice number generation
  - Order creation with items and history

## Future Phases

- **Phase 3B**: NextAuth.js integration for authentication
- **Phase 3C**: Email notifications (Resend)
- **Phase 3D**: Invoice PDF generation
- **Phase 3E**: Payment integration (Multicaixa API)

## File Structure

```
prisma/
  schema.prisma       # Database schema
  seed.ts            # Seed data script

app/api/
  pedidos/
    route.ts         # List/create orders
    [id]/
      route.ts       # Get/update specific order
    rastreio/
      [codigo]/
        route.ts     # Public tracking endpoint
  users/
    route.ts         # Create users

lib/
  prisma.ts          # Prisma client singleton
  utils-server.ts    # Server utilities (sanitization)
  db/
    pedidos.ts       # Order database functions
    users.ts         # User database functions

types/
  pedido.ts          # Order types
  user.ts            # User types

.env.example         # Environment variables template
```

## Acceptance Criteria ✅

- [x] Prisma configured with complete schema
- [x] Migrations work without errors
- [x] Prisma client singleton implemented
- [x] API `/api/pedidos` functional (GET, POST)
- [x] API `/api/pedidos/[id]` functional (GET, PATCH)
- [x] API `/api/pedidos/rastreio/[codigo]` functional
- [x] API `/api/users` functional (POST)
- [x] Seed data executes without errors
- [x] TypeScript types correct
- [x] Environment variables documented
- [x] No TypeScript or ESLint errors
- [x] Race conditions in number generation fixed
- [x] Security best practices implemented

## Notes

- Uses Prisma 5.x for stability
- All monetary values stored as Decimal(12,2) for precision
- Order and invoice numbers auto-increment by year
- Public tracking endpoint doesn't expose sensitive data
- Guest checkout supported (optional user relation)
- Complete order state history preserved
