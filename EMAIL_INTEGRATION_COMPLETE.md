# Sistema de Notificações por Email - AgriConecta

## Visão Geral

Este documento descreve a implementação completa do sistema de notificações por email para o AgriConecta, um marketplace agrícola para Angola.

## Estrutura de Ficheiros

```
lib/email/
├── resend.ts           # Cliente Resend + configuração central
├── templates.ts        # Todos os templates de email consolidados
└── send.ts             # Funções de envio + lógica de negócio

app/api/
├── checkout/
│   └── route.ts        # ✅ Integrado: envio de emails na criação de pedido
├── pedidos/
│   └── [id]/
│       └── route.ts    # ✅ Integrado: envio de emails na mudança de estado
└── admin/
    └── pedidos/
        └── [id]/
            └── estado/
                └── route.ts  # ✅ Novo: endpoint dedicado para mudança de estado
```

## Componentes Principais

### 1. Configuração do Cliente Resend (`lib/email/resend.ts`)

**Características:**
- Inicialização do cliente Resend com verificação de API key
- Configuração central para remetente, admin e dados bancários
- Função `isEmailEnabled()` para verificar se emails estão activos
- Suporte para modo desenvolvimento (sem API key)

**Variáveis de Ambiente Necessárias:**
```bash
RESEND_API_KEY="re_xxxxxxxxxx"
EMAIL_FROM="AgriConecta <noreply@agriconecta.ao>"
ADMIN_EMAIL="admin@agriconecta.ao"
NEXT_PUBLIC_APP_URL="https://agriconecta.ao"
BANCO_NOME="BFA - Banco de Fomento Angola"
BANCO_IBAN="AO06.0000.0000.0000.0000.0000.0"
BANCO_TITULAR="AgriConecta Lda"
```

### 2. Templates de Email (`lib/email/templates.ts`)

Todos os templates consolidados em um único ficheiro para facilitar manutenção.

**Templates Implementados:**

1. **emailPedidoCriadoCliente** - Email para cliente quando pedido é criado
   - Confirmação de recebimento
   - Lista de itens
   - Dados bancários para pagamento
   - Link de rastreio

2. **emailPedidoCriadoAdmin** - Email para admin quando pedido é criado
   - Alerta de novo pedido
   - Resumo do cliente
   - Valor total
   - Link para painel admin

3. **emailPagamentoConfirmado** - Email quando pagamento é confirmado
   - Notificação de confirmação
   - Próximos passos
   - Link de rastreio

4. **emailEstadoAlterado** - Email quando estado muda (EM_PREPARACAO, EM_TRANSITO, ENTREGUE)
   - Mensagem específica por estado
   - Emoji visual
   - Nota opcional do admin

5. **emailPedidoCancelado** - Email quando pedido é cancelado
   - Notificação de cancelamento
   - Motivo (se fornecido)
   - Informação de reembolso (se aplicável)

**Formatação:**
- Preços em AOA (Kwanza Angolano)
- Layout em texto simples
- Separadores visuais (═══)
- Emojis para melhor UX

### 3. Funções de Envio (`lib/email/send.ts`)

**Funções Principais:**

- `enviarEmailsPedidoCriado(pedido)` - Envia emails para cliente e admin
- `enviarEmailPagamentoConfirmado(pedido)` - Email de confirmação de pagamento
- `enviarEmailEstadoAlterado(pedido, estado, nota)` - Email de mudança de estado
- `enviarEmailPedidoCancelado(pedido, motivo, jaFoiPago)` - Email de cancelamento
- **`enviarEmailPorMudancaEstado(pedido, estadoAnterior, estadoNovo, nota)`** - Função principal que decide qual email enviar baseado na mudança de estado

**Características:**
- Envio assíncrono (não bloqueia operações)
- Tratamento de erros robusto
- Logs detalhados (📧 ✅ ❌)
- Modo desenvolvimento (sem Resend configurado)

## Fluxo de Emails

### 1. Checkout (Cliente faz pedido)
```
POST /api/checkout
  ↓
Cria pedido no banco de dados
  ↓
Envia 2 emails em background:
  ├─ CLIENTE: Confirmação + dados bancários
  └─ ADMIN: Alerta de novo pedido
  ↓
Retorna resposta ao cliente (não aguarda emails)
```

### 2. Mudança de Estado

#### Via API `/api/pedidos/[id]` (PATCH)
```
PATCH /api/pedidos/[id]
body: { estado: "PAGO", nota: "..." }
  ↓
Actualiza estado no banco
  ↓
Chama enviarEmailPorMudancaEstado()
  ↓
Envia email apropriado baseado no novo estado
```

#### Via API Admin `/api/admin/pedidos/[id]/estado` (PATCH) ⭐ NOVO
```
PATCH /api/admin/pedidos/[id]/estado
body: { estado: "EM_TRANSITO", nota: "..." }
  ↓
Verifica autenticação (Supabase)
  ↓
Actualiza estado + timestamps + histórico
  ↓
Envia email via enviarEmailPorMudancaEstado()
```

### 3. Mapeamento Estado → Email

| Estado Anterior | Estado Novo | Email Enviado |
|----------------|-------------|---------------|
| PENDENTE | PAGO | `emailPagamentoConfirmado` |
| PAGO | EM_PREPARACAO | `emailEstadoAlterado` |
| EM_PREPARACAO | EM_TRANSITO | `emailEstadoAlterado` |
| EM_TRANSITO | ENTREGUE | `emailEstadoAlterado` |
| * | CANCELADO | `emailPedidoCancelado` (com reembolso se já pago) |

## Integração nos Endpoints

### `/api/checkout/route.ts` ✅

```typescript
// Após criar pedido
const pedido = await criarPedido(...)

// Enviar emails (não bloqueia resposta)
const pedidoParaEmail = {
  id: pedido.id,
  numero: pedido.numero,
  clienteNome: pedido.clienteNome,
  // ... outros campos
}

enviarEmailPedidoCriado(pedidoParaEmail).catch(console.error)

return NextResponse.json({ pedidoId, numero })
```

### `/api/pedidos/[id]/route.ts` ✅

```typescript
// No PATCH, após actualizar estado
if (estadoAnterior !== estadoNovo) {
  const pedidoParaEmail: PedidoEmailData = {
    // ... preparar dados
  }
  
  enviarEmailPorMudancaEstado(
    pedidoParaEmail, 
    estadoAnterior, 
    estadoNovo, 
    body.nota
  ).catch(console.error)
}
```

### `/api/admin/pedidos/[id]/estado/route.ts` ⭐ NOVO

Endpoint dedicado para admin actualizar estado com:
- ✅ Autenticação obrigatória
- ✅ Validação com Zod
- ✅ Actualização de timestamps automática
- ✅ Criação de histórico de estado
- ✅ Envio de email automático

## Tratamento de Erros

### Princípios:
1. **Emails nunca bloqueiam operações principais**
   - Checkout continua mesmo se email falhar
   - Actualização de estado continua mesmo se email falhar

2. **Logs detalhados**
   - 📧 Enviando email
   - ✅ Email enviado com sucesso
   - ⚠️ Resend não configurado
   - ❌ Erro ao enviar email

3. **Modo desenvolvimento**
   - Sem RESEND_API_KEY: emails são logados no console
   - Permite testar fluxo sem enviar emails reais

### Exemplo de logs:

```
📧 Enviando email para: joao@example.com
   Assunto: Pedido AGC-2024-00001 recebido - AgriConecta
⚠️ Resend não configurado - email logado mas não enviado
--- CONTEÚDO DO EMAIL ---
Olá João!
O seu pedido foi recebido com sucesso!
...
--- FIM DO EMAIL ---
```

## Testes

### Verificar configuração:
```bash
# Ver configuração
node -e "require('./lib/email/resend').EMAIL_CONFIG"
```

### Testar templates:
```typescript
import { emailPedidoCriadoCliente } from '@/lib/email/templates'

const email = emailPedidoCriadoCliente({
  // ... dados de teste
})

console.log(email.subject)
console.log(email.text)
```

### Testar envio (em desenvolvimento):
```bash
# Sem API key - logs no console
npm run dev

# Fazer checkout ou actualizar estado
# Verificar logs no terminal
```

### Testar envio (em produção):
```bash
# Configurar API key no .env
RESEND_API_KEY="re_your_key"

# Fazer checkout ou actualizar estado
# Verificar no dashboard do Resend
```

## Critérios de Aceitação

### Configuração ✅
- [x] Resend SDK instalado
- [x] Cliente configurado em `lib/email/resend.ts`
- [x] Templates em `lib/email/templates.ts`
- [x] Funções de envio em `lib/email/send.ts`

### Integração Checkout ✅
- [x] Email enviado ao cliente após criar pedido
- [x] Email enviado ao admin após criar pedido
- [x] Checkout NÃO falha se email falhar

### Integração Admin ✅
- [x] Endpoint `/api/admin/pedidos/[id]/estado` funcional
- [x] Email enviado quando estado muda para PAGO
- [x] Email enviado quando estado muda para EM_PREPARACAO
- [x] Email enviado quando estado muda para EM_TRANSITO
- [x] Email enviado quando estado muda para ENTREGUE
- [x] Email enviado quando estado muda para CANCELADO

### Robustez ✅
- [x] Sistema funciona sem RESEND_API_KEY (apenas logs)
- [x] Erros de email não bloqueiam operações
- [x] Logs claros para debug (📧 ✅ ❌)

### Conteúdo ✅
- [x] Templates em português (pt-AO)
- [x] Preços formatados em AOA
- [x] Links de rastreio correctos
- [x] Dados bancários incluídos

### Geral ✅
- [x] Sem erros TypeScript
- [x] Variáveis de ambiente documentadas
- [x] Build passa com sucesso

## Próximos Passos (Opcional)

1. **Templates HTML**
   - Actualmente usa texto simples
   - Pode adicionar HTML para melhor aparência

2. **Mais templates**
   - Email de boas-vindas
   - Email de recuperação de senha
   - Newsletter de produtos

3. **Tracking de emails**
   - Verificar se email foi aberto
   - Verificar se link foi clicado

4. **Testes automatizados**
   - Unit tests para templates
   - Integration tests para envio

## Suporte

Para problemas com emails:

1. Verificar logs do servidor
2. Verificar dashboard do Resend
3. Verificar variáveis de ambiente
4. Verificar que domínio está verificado no Resend

## Conclusão

O sistema de notificações por email está **totalmente integrado** em todos os fluxos da aplicação:
- ✅ Checkout
- ✅ Mudança de estado via API pública
- ✅ Mudança de estado via API admin
- ✅ Todos os estados de pedido cobertos
- ✅ Tratamento de erros robusto
- ✅ Logs detalhados
- ✅ Modo desenvolvimento

A implementação segue as melhores práticas:
- Código limpo e bem documentado
- Type-safe com TypeScript
- Não bloqueia operações principais
- Fácil de testar e manter
