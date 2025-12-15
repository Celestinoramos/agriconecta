# AgriConecta - Marketplace Agrícola de Angola

Este é o marketplace agrícola que conecta agricultores e consumidores em Angola, agora implementado com Next.js 14 e App Router.

## Sobre o Projeto

AgriConecta é uma plataforma que permite aos consumidores angolanos comprar produtos frescos diretamente dos agricultores locais, apoiando a economia local e garantindo qualidade.

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **PWA Ready** - Progressive Web App

## Instalação e Execução

### Instalar Dependências

```bash
npm install
```

### Modo de Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

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
