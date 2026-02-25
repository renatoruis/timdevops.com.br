+++
author = 'Tim DevOps'
title = 'Como Ter E-mail com Domínio Próprio de Graça (Cloudflare + Gmail)'
date = 2026-02-25T10:09:30Z
+++

Como ter e-mail com domínio próprio de graça usando Cloudflare + Gmail

Muita gente paga Google Workspace ou Microsoft 365 apenas para usar um e-mail como contato@seudominio.com.

Se a necessidade for simples — receber e responder e-mails com um domínio próprio — dá para fazer isso pagando apenas o domínio.

## A solução usa:

- 1 domínio (≈ US$10–15/ano ou ~R$40/ano no registro.br)
- 1 conta Gmail gratuita
- 1 conta Cloudflare gratuita

Abaixo está o passo a passo e as limitações reais.

## Como funciona a arquitetura

O Cloudflare faz apenas o encaminhamento (forward) dos e-mails.

**Fluxo:**

```
Internet
   ↓
MX → Cloudflare Email Routing
   ↓
Forward → Gmail
   ↓
Gmail envia usando SMTP (Send As)
```

Não existe mailbox no domínio. O armazenamento continua sendo o Gmail.

## Passo a passo

### 1. Compre um domínio

Qualquer registrador funciona. Depois disso, aponte o DNS para o Cloudflare.

### 2. Adicione o domínio no Cloudflare

- Crie uma conta gratuita
- Adicione o domínio
- Aponte os nameservers para os da Cloudflare

### 3. Ative o Email Routing

No painel do Cloudflare:

**Email → Email Routing → Enable**

O Cloudflare criará automaticamente os registros MX necessários.

### 4. Defina o Gmail como destino

Você informa qual e-mail receberá os forwards (ex: seu Gmail pessoal). Será necessário validar esse endereço.

### 5. Crie os endereços personalizados

Exemplos:

- contato@seudominio.com
- financeiro@seudominio.com
- qualquercoisa@seudominio.com

Todos podem apontar para o mesmo Gmail.

## Configurar envio pelo Gmail ("Enviar como")

Para responder como seu@seudominio.com:

1. **Gmail → Configurações**
2. "Ver todas as configurações"
3. "Contas e importação"
4. "Enviar e-mail como" → "Adicionar outro endereço"
5. Use SMTP do próprio Gmail

**Importante:**

- Ative verificação em duas etapas
- Gere uma senha de app
- Use essa senha no SMTP (não use sua senha normal)

## Configuração recomendada de SPF

No Cloudflare → **DNS → Adicionar TXT**

- **Name:** `@`
- **Content:** `v=spf1 include:_spf.google.com ~all`

Isso ajuda a reduzir problemas de spam ao enviar pelo Gmail.

## Sobre DKIM (limitação importante)

Gmail pessoal não assina DKIM para domínios customizados.

**Consequências:**

- SPF passa
- DKIM não assina
- Alguns provedores podem marcar como spam dependendo da política DMARC

- Para uso pessoal, geralmente funciona bem
- Para uso comercial sério, entrega crítica ou alto volume, não é a melhor solução

## Limites reais

**Gmail gratuito:**

- Aproximadamente 500 envios/dia
- Limites por minuto
- Pode bloquear se detectar padrão comercial

**Cloudflare Email Routing:**

- Apenas encaminhamento
- Não armazena e-mails
- Não oferece IMAP/POP
- Sem filtros avançados

## Quando essa solução faz sentido

- Marca pessoal
- Freelancer
- Side project
- Portfólio
- Pequeno negócio com baixo volume

## Quando não faz sentido

- Time grande
- Atendimento ao cliente
- E-mail transacional
- Automação de marketing
- Alto volume de envio

## Conclusão

É possível ter um e-mail profissional com domínio próprio pagando apenas o domínio.

Funciona bem para uso individual e baixo volume. Não substitui Google Workspace em cenários corporativos.

Se o objetivo for apenas ter presença profissional com baixo custo, atende perfeitamente.
