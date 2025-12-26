# Sistema de Relatórios e Dashboard - AgriConecta

## Visão Geral

Este documento descreve a implementação completa do sistema de relatórios e dashboard administrativo para o AgriConecta, incluindo métricas, gráficos interativos e exportação de relatórios em PDF.

## Funcionalidades Implementadas

### 1. Dashboard Avançado com Métricas

**Localização:** `/admin/dashboard`

O dashboard avançado fornece uma visão completa das métricas do negócio:

#### Métricas Principais:
- **Total de Vendas (AOA)** - Soma total de vendas no período
- **Número de Pedidos** - Quantidade total de pedidos
- **Ticket Médio** - Valor médio por pedido
- **Novos Clientes** - Clientes registrados no período
- **Pedidos Pendentes** - Pedidos que requerem atenção
- **Taxa de Conversão** - Percentual de conversão de visitantes em compradores

#### Comparação com Período Anterior:
Todas as métricas principais mostram a variação percentual em relação ao período anterior equivalente, com indicadores visuais (↑ verde para crescimento, ↓ vermelho para declínio).

### 2. Seletor de Datas Personalizado

**Componente:** `DateRangePicker`

Oferece múltiplas opções de período:

#### Presets Rápidos:
- **Hoje** - Dados do dia atual
- **7 dias** - Últimos 7 dias
- **30 dias** - Últimos 30 dias
- **Este mês** - Do primeiro ao último dia do mês atual
- **Mês passado** - Mês anterior completo
- **3 meses** - Últimos 3 meses
- **12 meses** - Último ano

#### Personalizado:
- Seleção manual de data de início e fim
- Interface intuitiva com calendário HTML5

### 3. Gráficos Interativos (Recharts)

#### Gráfico de Vendas por Período
**Tipo:** Linha (Line Chart)

Características:
- Visualização de vendas e número de pedidos
- Agrupamento configurável: dia, semana ou mês
- Duas linhas: vendas (verde) e pedidos (azul)
- Tooltip interativo com valores formatados
- Eixo Y com formatação de moeda (Kz)
- Grid suave para facilitar leitura

#### Gráfico de Produtos Mais Vendidos
**Tipo:** Barras Horizontais (Bar Chart)

Características:
- Top 5 produtos por receita
- Cores diferenciadas para cada produto
- Barras horizontais para melhor legibilidade de nomes
- Tooltip com quantidade e receita
- Ordenação automática por receita

### 4. Relatórios Detalhados

#### 4.1 Relatório de Vendas
**Rota:** `/admin/relatorios/vendas`
**API:** `/api/admin/relatorios/vendas`

**Dados incluídos:**
- Número do pedido
- Data e hora
- Nome e email do cliente
- Quantidade de itens
- Valores (subtotal, taxa de entrega, desconto, total)
- Estado do pedido
- Método de pagamento

**Resumo:**
- Período selecionado
- Total de vendas
- Total de pedidos
- Pedidos pagos
- Pedidos cancelados
- Ticket médio

#### 4.2 Relatório de Produtos
**Rota:** `/admin/relatorios/produtos`

**Dados incluídos:**
- Nome do produto
- Categoria
- Quantidade vendida
- Receita gerada
- Stock atual
- Preço

**Resumo:**
- Total de produtos
- Quantidade total vendida
- Receita total

#### 4.3 Relatório de Clientes
**Rota:** `/admin/relatorios/clientes`

**Dados incluídos:**
- Nome do cliente
- Email e telefone
- Total de pedidos
- Total gasto
- Data do último pedido

**Resumo:**
- Total de clientes
- Média de pedidos por cliente
- Total gasto

#### 4.4 Relatório de Stock
**Rota:** `/admin/relatorios/stock`

**Funcionalidades especiais:**
- Filtros: Todos, Stock Baixo, Stock Crítico
- Alerta visual para produtos com stock crítico
- Sistema de status por cor:
  - Verde: Stock OK
  - Amarelo: Stock Baixo
  - Vermelho: Stock Crítico

**Dados incluídos:**
- Nome do produto
- Categoria
- Stock atual
- Stock mínimo
- Status
- Preço

#### 4.5 Relatório Financeiro
**Rota:** `/admin/relatorios/financeiro`

**Dados incluídos:**
- Período (mês)
- Receita
- Custos
- Lucro
- Margem percentual

**Análise:**
- Comparação mês a mês
- Indicadores de margem (verde para ≥30%, amarelo para <30%)

### 5. Exportação PDF

**Componente:** `ExportButton`
**Bibliotecas:** jspdf + jspdf-autotable

#### Características do PDF:
- **Header personalizado:**
  - Logo/Nome "AgriConecta" em verde
  - Título do relatório
  - Data de geração

- **Seção de Resumo:**
  - Apresentação de métricas principais
  - Formato de tabela limpa

- **Tabela de Dados:**
  - Headers com fundo verde (cor do AgriConecta)
  - Linhas alternadas para melhor legibilidade
  - Formatação automática de números
  - Ajuste automático de colunas

- **Footer:**
  - Numeração de páginas
  - Formato: "Página X de Y"

## Estrutura de Arquivos

### Componentes
```
components/admin/
├── DateRangePicker.tsx          # Seletor de datas com presets
├── ExportButton.tsx             # Botão de exportação PDF
└── dashboard/
    ├── DashboardMetrics.tsx     # Cards de métricas
    ├── SalesChart.tsx           # Gráfico de vendas
    └── TopProductsChart.tsx     # Gráfico de produtos
```

### Páginas
```
app/admin/
├── dashboard/
│   └── page.tsx                 # Dashboard avançado
└── relatorios/
    ├── page.tsx                 # Índice de relatórios
    ├── vendas/page.tsx          # Relatório de vendas
    ├── produtos/page.tsx        # Relatório de produtos
    ├── clientes/page.tsx        # Relatório de clientes
    ├── stock/page.tsx           # Relatório de stock
    └── financeiro/page.tsx      # Relatório financeiro
```

### API Routes
```
app/api/admin/
├── dashboard/
│   ├── metrics/route.ts         # Métricas do dashboard
│   ├── vendas/route.ts          # Dados de vendas para gráfico
│   └── top-produtos/route.ts    # Top produtos vendidos
└── relatorios/
    └── vendas/route.ts          # Dados do relatório de vendas
```

## Tecnologias Utilizadas

### Dependências Principais:
- **recharts** (v2.15.2) - Biblioteca de gráficos React
- **jspdf** (^2.5.2) - Geração de PDFs
- **jspdf-autotable** (^3.8.4) - Tabelas automáticas em PDF
- **date-fns** (^4.1.0) - Manipulação de datas

### Bibliotecas de UI:
- **lucide-react** - Ícones
- **Tailwind CSS** - Estilização

## Navegação

O sistema foi integrado à navegação administrativa através do Sidebar:

```typescript
{ href: "/admin/dashboard", label: "Dashboard Avançado", icon: BarChart3 },
{ href: "/admin/relatorios", label: "Relatórios", icon: FileText },
```

## APIs e Dados

### Endpoint: `/api/admin/dashboard/metrics`

**Parâmetros:**
- `start` - Data de início (ISO string)
- `end` - Data de fim (ISO string)

**Resposta:**
```json
{
  "totalVendas": 1234567,
  "numeroPedidos": 150,
  "ticketMedio": 8230,
  "novosClientes": 25,
  "pedidosPendentes": 12,
  "taxaConversao": 15.5,
  "trends": {
    "vendas": 12.5,
    "pedidos": 8.2,
    "ticketMedio": 3.7,
    "clientes": 15.0
  }
}
```

### Endpoint: `/api/admin/dashboard/vendas`

**Parâmetros:**
- `start` - Data de início
- `end` - Data de fim
- `groupBy` - Agrupamento: 'day', 'week', 'month'

**Resposta:**
```json
[
  {
    "date": "15 Dez",
    "vendas": 45000,
    "pedidos": 12
  },
  ...
]
```

### Endpoint: `/api/admin/dashboard/top-produtos`

**Parâmetros:**
- `start` - Data de início
- `end` - Data de fim
- `limit` - Número de produtos (padrão: 5)

**Resposta:**
```json
[
  {
    "nome": "Tomate Fresco",
    "quantidade": 150,
    "receita": 75000
  },
  ...
]
```

## Cálculos e Lógica

### Taxa de Conversão
```typescript
taxaConversao = (numeroPedidos / totalVisitantes) * 100
```

### Ticket Médio
```typescript
ticketMedio = totalVendas / numeroPedidos
```

### Tendências (Trends)
```typescript
trend = ((valorAtual - valorAnterior) / valorAnterior) * 100
```

### Período Anterior
O período anterior é calculado com a mesma duração do período atual, imediatamente anterior:
```typescript
periodLength = end - start
prevStart = start - periodLength
prevEnd = start - 1
```

## Formatação e Localização

### Moeda
- Formato: `1.234.567 Kz`
- Locale: `pt-AO` (Português de Angola)

### Datas
- Formato curto: `dd/MM/yyyy`
- Formato longo: `dd/MM/yyyy HH:mm`
- Locale: `ptBR` (date-fns não tem pt-AO, usamos pt-BR)

## Melhorias Futuras

1. **Cache de dados** - Implementar cache para métricas frequentemente acessadas
2. **Exportação Excel** - Adicionar opção de exportar para XLSX
3. **Agendamento** - Envio automático de relatórios por email
4. **Gráficos adicionais** - Pizza para categorias, funil de vendas
5. **Comparação de períodos** - Visualização lado a lado de dois períodos
6. **Filtros avançados** - Por categoria, produto, região, etc.
7. **Dashboards personalizados** - Permitir usuários criar seus próprios dashboards
8. **Alertas** - Notificações para métricas críticas

## Notas de Implementação

- Todos os componentes são client-side (`'use client'`) para interatividade
- As APIs usam Prisma para acesso ao banco de dados
- Estados de carregamento implementados em todas as páginas
- Tratamento de erros básico implementado
- Responsividade mobile considerada no design
- Cores consistentes com a identidade visual do AgriConecta (verde #22c55e)

## Suporte e Manutenção

Para adicionar novos relatórios:

1. Criar página em `app/admin/relatorios/[nome]/page.tsx`
2. Criar API route em `app/api/admin/relatorios/[nome]/route.ts`
3. Adicionar card na página principal de relatórios
4. Seguir padrões de componentes existentes

Para modificar gráficos:
- Consultar documentação do Recharts: https://recharts.org/
- Manter cores consistentes com a paleta do AgriConecta
