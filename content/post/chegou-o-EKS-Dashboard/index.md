---
author: "Tim DevOps"
title: "Chegou o AWS EKS Dashboard"
date: 2025-05-22
tags:
  [
    "aws",
    "eks",
    "kubernetes",
    "monitoring",
    "cloud",
    "devops",
  ]
---

Recentemente a AWS lançou uma funcionalidade que me fez pensar: "Ué, como isso ainda não existia nativamente?" — Tô falando do novo EKS Dashboard.

![AWS EKS Dashboard - Visão Geral](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/05/19/eks-dashboard-01-1024x854.png)

## O cenário

Se você já trabalhou com múltiplas contas ou múltiplas regiões usando Amazon EKS, sabe a dor: a gente tem que ficar alternando de conta, região, contexto do kubectl, role assumida... tudo pra conseguir saber o que tá acontecendo com nossos clusters. E claro, isso só piora quando você precisa dar visibilidade pra time de segurança ou gestão, que só quer saber se tá tudo saudável ou não 😅

## A novidade

Agora dá pra ter visibilidade centralizada dos clusters EKS em várias contas e regiões direto no console da AWS. Sem gambiarra, sem precisar montar stack com Prometheus remoto, sem federar clusters na marra.

![AWS EKS Dashboard - Interface](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/05/19/eks-dashboard-04-1024x795.png)

### Funciona assim:

1. Você acessa o console da AWS (região us-east-1 por enquanto)
2. Habilita o acesso da sua organização ou contas específicas
3. E pronto: vai visualizar todos os clusters EKS de forma consolidada

### Você consegue ver:

- ✅ Clusters ativos e suas regiões
- ✅ Status dos grupos de nós
- ✅ Add-ons instalados (tipo CNI, CoreDNS, etc)
- ✅ E claro, links rápidos pra navegar pro detalhe de cada cluster

## Por que isso é útil de verdade?

Pra mim, isso resolve dois problemas:

1. **Visão centralizada real** — principalmente pra quem tem ambientes multi-conta e usa Organizations. Antes disso, só com solução customizada ou ferramenta paga.

2. **Onboarding e gestão mais simples** — imagina ter que explicar pra outro time como acessar cada cluster manualmente? Agora é só pedir pra acessar a conta central, e pronto.

## Custo

Zero. É nativo no console. Você só precisa estar na região us-east-1 pra acessar esse dashboard (mesmo que os clusters estejam em outras regiões).

## Observações

- Ainda não mostra métricas detalhadas como CPU ou memória (isso ainda é com CloudWatch ou Prometheus mesmo).
- Mas já dá uma bela ajuda pra quem quer pelo menos saber se o cluster tá ok ou não.

## Conclusão

Simples, funcional e resolve um problema real. É o tipo de feature que a gente espera que vá evoluindo e apareça em mais regiões.

Se você trabalha com EKS multi-região ou multi-conta, dá uma olhada nisso. Pode ser aquele atalho que você nem sabia que precisava.

👉 [Leia mais no blog da AWS](https://aws.amazon.com/pt/blogs/aws/centralize-visibility-of-kubernetes-clusters-across-aws-regions-and-accounts-with-eks-dashboard/)