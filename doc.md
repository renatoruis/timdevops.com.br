# Tim DevOps - Comandos

## Criar novo post
```bash
hugo new content/post/nome-do-post/index.md
```

## Preview local (opcional)
A pasta `docs/` é **gerada pelo CI** e está no `.gitignore`. Você não precisa
buildar localmente para deployar — basta commitar `content/`, `layouts/`,
`assets/` ou outros fontes.

Se quiser ver o preview antes de subir:

```bash
hugo server
```

Para preview alinhado com produção (Open Graph, canonical, gtag gate, etc.):

```bash
HUGO_ENV=production hugo server --baseURL "https://timdevops.com.br/"
```

## Deploy
O workflow `.github/workflows/static.yml` faz tudo a cada push na `main`:

1. Checkout com submódulos
2. Setup do Hugo `0.156.0` extended (versão pinada)
3. Cache de `resources/_gen` para builds incrementais
4. Build com `--gc --minify --cleanDestinationDir` e `HUGO_ENV=production`
5. Upload do `docs/` como artefato do GitHub Pages
6. Deploy para `https://timdevops.com.br/`

PRs também rodam o build (sem deploy) e geram um artefato `site-preview-<PR>`
que dura 7 dias — útil para baixar e revisar mudanças antes do merge.

## Atualizar versão do Hugo
Editar `env.HUGO_VERSION` no topo do workflow. Manter pareada com a versão
local quando possível (descobrir local com `hugo version`).

## Limpando o `docs/` do tracking (one-time)
Se o repositório ainda tem `docs/` commitado, rode uma vez:

```bash
git rm -r --cached docs/
git commit -m "chore: untrack docs/, pasta agora é gerada pelo CI"
```
