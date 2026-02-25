# Tim DevOps - Comandos

## Criar novo post
```bash
hugo new content/post/nome-do-post/index.md
```

## Compilar localmente (para preview)
```bash
./build.sh
```

ou

```bash
hugo --baseURL "https://timdevops.com.br/"
```

## Deploy
O GitHub Actions compila o site com `hugo --baseURL "https://timdevops.com.br/"` em cada push na main. Não é necessário commitar a pasta `docs/`.
