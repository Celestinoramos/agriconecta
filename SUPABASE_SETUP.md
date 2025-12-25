# Configuração do Supabase Auth

Este documento descreve como configurar a autenticação do Supabase para o AgriConecta.

## Pré-requisitos

- Conta no Supabase
- Projeto Supabase criado
- Variáveis de ambiente configuradas no `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## 1. Configuração de Providers OAuth

Acesse o Supabase Dashboard → Authentication → Providers

### Google OAuth

1. Ative o provider Google
2. Configure as credenciais:
   - **Client ID**: Obtenha no [Google Cloud Console](https://console.cloud.google.com/)
   - **Client Secret**: Obtenha no Google Cloud Console
3. Adicione as URLs de redirecionamento autorizadas:
   - Desenvolvimento: `http://localhost:3000/auth/callback`
   - Produção: `https://agriconecta.ao/auth/callback`

#### Como obter credenciais do Google

1. Aceda ao [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para "APIs & Services" → "Credentials"
4. Clique em "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure as origens autorizadas:
   - `http://localhost:3000` (desenvolvimento)
   - `https://agriconecta.ao` (produção)
6. Configure os URIs de redirecionamento:
   - `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`
7. Copie o Client ID e Client Secret para o Supabase

### Facebook OAuth

1. Ative o provider Facebook
2. Configure as credenciais:
   - **App ID**: Obtenha no [Facebook Developers](https://developers.facebook.com/)
   - **App Secret**: Obtenha no Facebook Developers
3. Adicione as URLs de redirecionamento autorizadas no Facebook:
   - `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`

#### Como obter credenciais do Facebook

1. Aceda ao [Facebook Developers](https://developers.facebook.com/)
2. Crie uma nova aplicação ou selecione uma existente
3. Vá para "Settings" → "Basic"
4. Copie o "App ID" e "App Secret"
5. Em "Facebook Login" → "Settings":
   - Adicione os URIs de redirecionamento OAuth válidos
   - `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`

## 2. URLs de Redirecionamento

No Supabase Dashboard → Authentication → URL Configuration:

### Site URL
- Desenvolvimento: `http://localhost:3000`
- Produção: `https://agriconecta.ao`

### Redirect URLs (Adicione ambos)
- `http://localhost:3000/auth/callback` (desenvolvimento)
- `https://agriconecta.ao/auth/callback` (produção)

### Additional Redirect URLs
Se necessário, adicione outras URLs específicas:
- `http://localhost:3000/reset-password`
- `https://agriconecta.ao/reset-password`

## 3. Configuração de Email

### Templates de Email

Personalize os templates em Supabase Dashboard → Authentication → Email Templates:

#### Confirmação de Email
```
<h2>Bem-vindo ao AgriConecta!</h2>
<p>Clique no link abaixo para confirmar o seu email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar Email</a></p>
<p>Se não criou esta conta, ignore este email.</p>
```

#### Recuperação de Password
```
<h2>Recuperação de Password</h2>
<p>Recebemos um pedido para redefinir a sua password.</p>
<p>Clique no link abaixo para criar uma nova password:</p>
<p><a href="{{ .ConfirmationURL }}">Redefinir Password</a></p>
<p>Se não solicitou esta alteração, ignore este email.</p>
<p>Este link expira em 1 hora.</p>
```

#### Magic Link (opcional)
```
<h2>Login no AgriConecta</h2>
<p>Clique no link abaixo para fazer login:</p>
<p><a href="{{ .ConfirmationURL }}">Entrar</a></p>
<p>Se não solicitou este email, ignore-o.</p>
<p>Este link expira em 1 hora.</p>
```

## 4. Configuração de Segurança

### Email Confirmation
- ✅ Ative "Enable email confirmations" para requerer verificação de email

### Password Requirements
Configure em Authentication → Settings:
- Comprimento mínimo: 8 caracteres
- Requer maiúsculas: Sim
- Requer minúsculas: Sim
- Requer números: Sim

### Rate Limiting
Configure limites para prevenir abuso:
- Email sign-ups: 5 por hora por IP
- Password reset: 5 por hora por email

### PKCE Flow
- ✅ Já está ativo por padrão no Supabase (recomendado para OAuth)

## 5. Database Trigger (Opcional)

Para sincronização automática de utilizadores entre Supabase Auth e Prisma, pode criar uma função e trigger no PostgreSQL:

```sql
-- Função para sincronizar novo utilizador
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."User" (id, email, "emailVerified", role, "createdAt", "updatedAt")
  VALUES (
    NEW.id,
    NEW.email,
    NEW.email_confirmed_at,
    'CUSTOMER',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar após inserção na tabela auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**Nota**: Esta sincronização é opcional. O sistema já tem uma API route (`/api/auth/sync-user`) que sincroniza utilizadores quando fazem login.

## 6. Variáveis de Ambiente

Certifique-se de que o ficheiro `.env.local` contém:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 7. Testes

### Testar Email/Password
1. Aceda a `/registar`
2. Crie uma conta com email e password
3. Verifique o email de confirmação
4. Faça login em `/login`

### Testar Google OAuth
1. Aceda a `/login`
2. Clique em "Continuar com Google"
3. Autorize a aplicação
4. Verifique se foi redirecionado para a página inicial

### Testar Facebook OAuth
1. Aceda a `/login`
2. Clique em "Continuar com Facebook"
3. Autorize a aplicação
4. Verifique se foi redirecionado para a página inicial

### Testar Recuperação de Password
1. Aceda a `/recuperar-password`
2. Insira o seu email
3. Verifique o email de recuperação
4. Clique no link e defina nova password
5. Faça login com a nova password

## 8. Troubleshooting

### "Email rate limit exceeded"
- Aguarde 1 hora ou contacte o suporte do Supabase para aumentar limites

### "Invalid redirect URL"
- Verifique se a URL está configurada nas Redirect URLs do Supabase
- Certifique-se de que não há espaços ou caracteres inválidos

### "OAuth error"
- Verifique se as credenciais OAuth estão corretas
- Confirme que as URLs de callback estão configuradas no provider (Google/Facebook)

### "User not found" após OAuth
- Verifique se a API route `/api/auth/sync-user` está funcional
- Confirme que a conexão com a base de dados Prisma está correta

## 9. Segurança em Produção

- ✅ Use HTTPS em produção
- ✅ Configure CORS adequadamente
- ✅ Ative rate limiting
- ✅ Use cookies httpOnly (padrão do Supabase)
- ✅ Mantenha as chaves secretas seguras
- ✅ Nunca exponha SUPABASE_SERVICE_ROLE_KEY no cliente

## Recursos Adicionais

- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Configuração OAuth](https://supabase.com/docs/guides/auth/social-login)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
