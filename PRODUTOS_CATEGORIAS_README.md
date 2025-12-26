# Sistema de Gestão de Produtos e Categorias - AgriConecta

## Visão Geral

Este documento descreve a implementação completa do sistema de gestão de produtos e categorias no painel de administração do AgriConecta, incluindo CRUD completo, upload de imagens para Supabase Storage, e controle de permissões baseado em roles.

## Arquitetura

### Estrutura de Ficheiros

```
agriconecta/
├── app/
│   ├── admin/
│   │   ├── produtos/
│   │   │   ├── page.tsx              # Lista de produtos com filtros
│   │   │   ├── novo/page.tsx          # Criar novo produto
│   │   │   └── [id]/page.tsx          # Editar produto
│   │   └── categorias/
│   │       ├── page.tsx              # Lista de categorias
│   │       ├── novo/page.tsx          # Criar nova categoria
│   │       └── [id]/page.tsx          # Editar categoria
│   └── api/
│       └── admin/
│           ├── produtos/
│           │   ├── route.ts                    # GET (lista), POST (criar)
│           │   └── [id]/
│           │       ├── route.ts                # GET, PATCH, DELETE
│           │       ├── imagens/route.ts        # POST (upload), DELETE (remover)
│           │       ├── toggle-activo/route.ts  # POST toggle activo
│           │       └── toggle-destaque/route.ts # POST toggle destaque
│           └── categorias/
│               ├── route.ts                    # GET (lista), POST (criar)
│               ├── [id]/route.ts               # GET, PATCH, DELETE
│               └── reordenar/route.ts          # POST (reordenar)
├── components/
│   └── admin/
│       ├── produtos/
│       │   ├── ProductForm.tsx         # Formulário de produto
│       │   └── ProductsTable.tsx       # Tabela de produtos
│       └── categorias/
│           ├── CategoryForm.tsx        # Formulário de categoria
│           └── CategoriesTable.tsx     # Tabela de categorias
├── lib/
│   ├── db/
│   │   ├── produtos.ts                 # Funções de base de dados para produtos
│   │   └── categorias.ts               # Funções de base de dados para categorias
│   └── supabase/
│       ├── server.ts                   # Cliente Supabase para servidor
│       └── storage.ts                  # Funções de upload/delete de imagens
├── scripts/
│   └── migrate-produtos.ts             # Script de migração de JSON para DB
└── prisma/
    └── schema.prisma                   # Schema da base de dados
```

## Schema da Base de Dados

### Modelo Produto

```prisma
model Produto {
  id                String    @id @default(cuid())
  slug              String    @unique
  nome              String
  descricao         String?   // Descrição curta
  descricaoCompleta String?   // Descrição longa
  preco             Float     // AOA
  unidade           String    @default("unidade")
  
  categoriaId       String
  categoria         Categoria @relation(fields: [categoriaId], references: [id])
  
  imagens           String[]  // URLs do Supabase Storage
  stock             Int       @default(0)
  
  produtor          String?
  provincia         String?   // Província de origem
  
  nutricional       String?   // JSON: { calorias, proteinas, carboidratos, fibras, gorduras }
  conservacao       String?   // Dicas de conservação
  
  activo            Boolean   @default(true)
  destaque          Boolean   @default(false)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([categoriaId])
  @@index([activo])
  @@index([destaque])
}
```

### Modelo Categoria

```prisma
model Categoria {
  id          String    @id @default(cuid())
  slug        String    @unique
  nome        String
  descricao   String?
  imagem      String?
  ordem       Int       @default(0)
  activa      Boolean   @default(true)
  
  produtos    Produto[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([activa])
  @@index([ordem])
}
```

## Permissões de Roles

| Role | Produtos | Categorias |
|------|----------|------------|
| STAFF | Ver apenas | Ver apenas |
| ADMIN | CRUD completo | Ver apenas |
| SUPER_ADMIN | CRUD completo | CRUD completo |

## Funcionalidades Implementadas

### Gestão de Produtos

#### Listar Produtos
- **Endpoint**: `GET /api/admin/produtos`
- **Filtros**: categoria, activo, pesquisa, paginação
- **Permissões**: STAFF, ADMIN, SUPER_ADMIN

#### Criar Produto
- **Endpoint**: `POST /api/admin/produtos`
- **Campos**: nome, descricao, descricaoCompleta, preco, unidade, categoriaId, stock, produtor, provincia, nutricional, conservacao, activo, destaque
- **Validação**: Zod schema
- **Slug**: Gerado automaticamente a partir do nome
- **Permissões**: ADMIN, SUPER_ADMIN

#### Actualizar Produto
- **Endpoint**: `PATCH /api/admin/produtos/:id`
- **Slug**: Regenerado se nome mudar
- **Permissões**: ADMIN, SUPER_ADMIN

#### Eliminar Produto
- **Endpoint**: `DELETE /api/admin/produtos/:id`
- **Acção**: Elimina produto e todas as imagens associadas do Supabase Storage
- **Permissões**: ADMIN, SUPER_ADMIN

#### Toggle Activo/Destaque
- **Endpoints**: 
  - `POST /api/admin/produtos/:id/toggle-activo`
  - `POST /api/admin/produtos/:id/toggle-destaque`
- **Permissões**: ADMIN, SUPER_ADMIN

#### Gestão de Imagens
- **Upload**: `POST /api/admin/produtos/:id/imagens`
  - Suporta múltiplos ficheiros
  - Validação: Tipos (jpeg, png, webp), Tamanho máx. 5MB
  - Storage: Supabase Storage bucket 'produtos'
- **Remover**: `DELETE /api/admin/produtos/:id/imagens`
  - Remove imagem do storage e actualiza produto
- **Permissões**: ADMIN, SUPER_ADMIN

### Gestão de Categorias

#### Listar Categorias
- **Endpoint**: `GET /api/admin/categorias`
- **Opção**: incluirInactivas
- **Ordenação**: Por ordem crescente
- **Permissões**: Todos os utilizadores autenticados

#### Criar Categoria
- **Endpoint**: `POST /api/admin/categorias`
- **Ordem**: Atribuída automaticamente se não especificada
- **Slug**: Gerado automaticamente
- **Permissões**: SUPER_ADMIN

#### Actualizar Categoria
- **Endpoint**: `PATCH /api/admin/categorias/:id`
- **Permissões**: SUPER_ADMIN

#### Eliminar Categoria
- **Endpoint**: `DELETE /api/admin/categorias/:id`
- **Validação**: Impede eliminação se categoria tem produtos associados
- **Permissões**: SUPER_ADMIN

#### Reordenar Categorias
- **Endpoint**: `POST /api/admin/categorias/reordenar`
- **Payload**: Array de { id, ordem }
- **Permissões**: SUPER_ADMIN

## Configuração

### 1. Variáveis de Ambiente

Criar/actualizar `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://sdwgxoilvpsquqqrzwvv.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

### 2. Supabase Storage

Criar bucket no Supabase:

1. Aceder ao Supabase Dashboard
2. Ir para Storage
3. Criar novo bucket:
   - **Nome**: `produtos`
   - **Público**: Sim (para acesso público às imagens)

### 3. Migração da Base de Dados

Executar migrações Prisma:

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar migração
npx prisma migrate dev --name add_product_fields

# Ou push directo (desenvolvimento)
npx prisma db push
```

### 4. Migração de Dados

Migrar produtos de `data/produtos.json` para a base de dados:

```bash
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/migrate-produtos.ts
```

O script:
- Cria categorias automaticamente
- Migra todos os produtos do JSON
- Preserva imagens existentes (URLs Unsplash)
- Converte informação nutricional para JSON string
- Actualiza produtos se já existirem

## Utilização

### Aceder ao Painel Admin

1. Fazer login como utilizador com role ADMIN ou SUPER_ADMIN
2. Navegar para `/admin/produtos` ou `/admin/categorias`

### Criar Novo Produto

1. Ir para `/admin/produtos`
2. Clicar em "Novo Produto"
3. Preencher formulário:
   - Nome (obrigatório)
   - Categoria (obrigatório)
   - Preço (obrigatório)
   - Unidade (kg, unidade, maço, litro)
   - Descrição curta e completa
   - Stock
   - Produtor e província
   - Dicas de conservação
   - Marcar como activo/destaque
4. Guardar produto

### Gerir Imagens

1. Editar produto existente
2. Utilizar componente ImageUpload (a ser implementado ou adicionar via API)
3. Upload de múltiplas imagens
4. Remover imagens individuais

### Gerir Categorias (SUPER_ADMIN)

1. Ir para `/admin/categorias`
2. Criar/editar/eliminar categorias
3. Reordenar categorias (drag-and-drop - a ser implementado)

## Validação e Segurança

### Validação de Dados

- **Zod Schemas**: Todos os inputs da API são validados
- **TypeScript**: Tipagem estática em toda a aplicação
- **Prisma**: Validação ao nível da base de dados

### Segurança

1. **Autenticação**: Todas as rotas admin requerem utilizador autenticado
2. **Autorização**: Verificação de role em cada operação
3. **Upload Seguro**: 
   - Validação de tipo de ficheiro (whitelist)
   - Limite de tamanho (5MB)
   - Nome de ficheiro sanitizado (timestamp)
4. **Sanitização**: Slugs sanitizados para URLs seguras

## Testes

### Testar Localmente

1. **Criar Produto**:
```bash
curl -X POST http://localhost:3000/api/admin/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tomate Cherry",
    "preco": 450,
    "unidade": "kg",
    "categoriaId": "cat-id-here",
    "activo": true
  }'
```

2. **Listar Produtos**:
```bash
curl http://localhost:3000/api/admin/produtos?pesquisa=tomate
```

3. **Upload Imagem**:
```bash
curl -X POST http://localhost:3000/api/admin/produtos/prod-id/imagens \
  -F "imagens=@/path/to/image.jpg"
```

## Melhorias Futuras

1. **Image Upload Component**: Componente React para upload com drag-and-drop
2. **Bulk Operations**: Operações em lote (activar/desactivar múltiplos produtos)
3. **Image Optimization**: Redimensionamento automático de imagens
4. **Search Enhancement**: Busca full-text com índices
5. **Export/Import**: Exportar produtos para CSV/Excel
6. **Activity Log**: Registo de alterações (audit trail)
7. **Product Variants**: Suporte para variantes de produtos (tamanhos, cores)
8. **Stock Notifications**: Alertas quando stock baixo

## Troubleshooting

### Erro: "Supabase admin client not initialized"
- Verificar que `SUPABASE_SERVICE_ROLE_KEY` está definido em `.env.local`
- Reiniciar o servidor de desenvolvimento

### Erro ao fazer upload de imagens
- Verificar que bucket 'produtos' existe e é público
- Verificar permissões do service role key

### Produtos não aparecem no admin
- Verificar que utilizador tem role STAFF ou superior
- Verificar logs do servidor para erros de autenticação

### Migration script falha
- Verificar que `DATABASE_URL` está correcto
- Executar `npx prisma generate` primeiro
- Verificar que ficheiro `data/produtos.json` existe

## Suporte

Para questões ou problemas, consultar:
- Documentação Prisma: https://www.prisma.io/docs
- Documentação Supabase: https://supabase.com/docs
- Documentação Next.js: https://nextjs.org/docs

## Licença

Este código faz parte do projecto AgriConecta e está sujeito à licença do projecto principal.
