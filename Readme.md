<div align="center">

<img src="https://i.imgur.com/d8VeuPh.jpg" width="120" height="120" alt="Tim DevOps" style="border-radius:50%;" />

# Tim DevOps

**Blog sobre DevOps, Cloud, Kubernetes, Linux e produtividade — escrito por [Renato Ruis](https://www.linkedin.com/in/renatoruis/).**

[**timdevops.com.br →**](https://timdevops.com.br)

[![Site](https://img.shields.io/badge/Site-timdevops.com.br-f97316?style=for-the-badge&labelColor=111)](https://timdevops.com.br)
[![Sobre](https://img.shields.io/badge/Sobre-blue?style=for-the-badge&labelColor=111&color=525252)](https://timdevops.com.br/about/)
[![RSS](https://img.shields.io/badge/RSS-feed-FFA500?style=for-the-badge&logo=rss&logoColor=white&labelColor=111)](https://timdevops.com.br/index.xml)

[![Deploy status](https://github.com/renatoruis/timdevops.com.br/actions/workflows/static.yml/badge.svg)](https://github.com/renatoruis/timdevops.com.br/actions/workflows/static.yml)
[![Hugo](https://img.shields.io/badge/Hugo-0.156-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/)
[![Theme: Paper](https://img.shields.io/badge/theme-Paper-333?logo=hugo&logoColor=white)](https://github.com/nanxiaobei/hugo-paper)
[![GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222?logo=github&logoColor=white)](https://pages.github.com/)
[![Made with love](https://img.shields.io/badge/feito%20com-cafe%CC%81-6F4E37)](https://timdevops.com.br/about/)

</div>

---

## Sobre

Aqui é onde escrevo o que vem na cabeça — e o que vem geralmente envolve _build pipelines_ que acabaram de quebrar, certificações que fiz de graça, NLBs que finalmente aceitam timeout, ergonomia, e dicas para você não pagar o que não precisa pagar.

Conteúdo em **Português (pt-BR)**, atualizado a cada push.

## Categorias frequentes

| Categoria          | Sobre o que rola                                                  |
| ------------------ | ----------------------------------------------------------------- |
| **DevOps**         | Pipelines, automação, observabilidade, dia a dia de SRE/DevOps    |
| **Cloud**          | AWS, GCP, OCI — incluindo certificações e dicas reais             |
| **Kubernetes**     | EKS, dashboard, redes, dicas de operação                          |
| **Linux**          | Terminal, atalhos, produtividade                                  |
| **Certificações**  | Estudo, materiais gratuitos, exames não-supervisionados           |
| **Produtividade**  | Trabalho em pé, ferramentas self-hosted, e-mail próprio           |

Posts populares: [Como ter e-mail com domínio próprio de graça](https://timdevops.com.br/post/como-ter-email-com-dominio-proprio-gratuitamente/) · [Por que todo dev deveria experimentar self-hosting](https://timdevops.com.br/post/todo-dev-precisa-de-self-hosted/) · [Trabalhar em pé](https://timdevops.com.br/post/como-trabalhar-em-pe-melhorou-minha-produtividade-e-bem-estar/) · [Ver todos →](https://timdevops.com.br)

---

## Stack

- **[Hugo](https://gohugo.io/)** _extended_ `0.156` — gerador de site estático.
- **[Tema Paper](https://github.com/nanxiaobei/hugo-paper)** com overrides em `layouts/` e `assets/` (sem editar o tema).
- **[Tailwind](https://tailwindcss.com/)** pré-compilado pelo tema; tokens próprios em [`assets/custom.css`](assets/custom.css).
- **[Bunny Fonts](https://fonts.bunny.net/)** — Inter + JetBrains Mono, privacy-friendly (LGPD).
- **[GitHub Actions](.github/workflows/static.yml)** + **GitHub Pages** para CI/CD.
- **[Giscus](https://giscus.app/)** para comentários via GitHub Discussions.

## Estrutura

```
.
├── archetypes/          # Templates de novos posts
├── assets/              # CSS customizado (custom.css)
├── content/
│   ├── _index.md        # Home
│   ├── about.md         # Página Sobre
│   └── post/            # Posts (cada um em seu bundle)
├── layouts/             # Overrides do tema
│   ├── 404.html
│   ├── _default/        # baseof, list, single, terms, index.json
│   └── partials/        # head, header, footer, consent, share-buttons
├── static/js/           # search.js (busca client-side)
├── themes/paper/        # Tema (submódulo, não editar)
├── hugo.toml            # Configuração principal
└── .github/workflows/
    └── static.yml       # Build + deploy automático
```

## Rodando local

> Você **não precisa** buildar local para deployar — o CI faz isso a cada push na `main`.

Para preview:

```bash
hugo server
```

Para preview alinhado com produção (Open Graph, canonical, schema, gtag gate):

```bash
HUGO_ENV=production hugo server --baseURL "https://timdevops.com.br/"
```

Para criar um post novo:

```bash
hugo new content/post/nome-do-post/index.md
```

Documentação detalhada: [`doc.md`](doc.md).

## Deploy

Cada push em `main` dispara o workflow [`.github/workflows/static.yml`](.github/workflows/static.yml):

1. Checkout com submódulos
2. Setup do Hugo extended (versão pinada)
3. Cache de `resources/_gen` para builds incrementais
4. `hugo --gc --minify --cleanDestinationDir` em modo produção
5. Upload do artefato e deploy no GitHub Pages → **[timdevops.com.br](https://timdevops.com.br)**

PRs também rodam o build (sem deploy) e geram um artefato `site-preview-<PR>` por 7 dias.

## Features de UI/UX

- Tema claro/escuro com toggle persistente
- Busca client-side com atalho `/`, snippet, highlight e estado vazio
- Tag cloud na home + página global de tags
- Tempo de leitura, sumário (TOC) com scroll-spy, barra de progresso e "voltar ao topo"
- Compartilhar em X / LinkedIn / Bluesky / Copiar link
- Banner de consent LGPD (gtag só carrega após aceite)
- Botão "copiar" em todos os blocos de código
- Prefetch on hover para navegação instantânea
- Foco visível, `prefers-reduced-motion`, `aria-current`, skip-link
- 404 customizada em pt-BR com posts recentes

## Contribuindo

Achou um typo, link quebrado ou quer sugerir um post? Abra uma [issue](https://github.com/renatoruis/timdevops.com.br/issues) ou um [PR](https://github.com/renatoruis/timdevops.com.br/pulls) — toda contribuição é bem-vinda.

Para conversar sobre os posts em si, use os [comentários do Giscus](https://timdevops.com.br) (GitHub Discussions) em cada post.

## Conecta

- **Site:** [timdevops.com.br](https://timdevops.com.br)
- **LinkedIn:** [linkedin.com/in/renatoruis](https://linkedin.com/in/renatoruis)
- **GitHub:** [@renatoruis](https://github.com/renatoruis)
- **Instagram:** [@renatoruis](https://instagram.com/renatoruis)

---

<div align="center">

Construído com [Hugo](https://gohugo.io/) · Tema [Paper](https://github.com/nanxiaobei/hugo-paper) · Hospedado no [GitHub Pages](https://pages.github.com/)

<sub>© Renato Ruis. Conteúdo livre para inspiração — apenas dê os créditos.</sub>

</div>
