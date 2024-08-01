+++
author = "Renato Ruis (Tim)"
title = 'CROC já usou?'
description = "Testados e aprovados por mim :)Testados e aprovados por mim :)"
date = 2023-11-01
+++

![](0_1jc4AtDCx9XsykIl.jpg)

Não sei se você já preciso transferir um arquivo de forma rápida, um log, um certificado, uma chave ou algo do tipo, para um amigo, outro datacenter, outra VM outro país haha, o que vem na cabeça? tem muitas ferramentas pra fazer isso algumas com interface, browser e até CLI dependendo do cenário.

Já precisei fazer isso algumas vezes e do outro lado tinha um Windows, bloqueios, RDP etc etc etc muitas coisas que dificulta isso.

Mas sem delongas quero te mostrar o [\*\*CROC](https://github.com/schollz/croc)\*\* é uma ferramenta incrível e simples, olha só.

Funciona em Windão, Linux, Mac, Unix

Veja como é simples.

### Para instalar:

    curl https://getcroc.schollz.com | bash

    brew install croc

    choco install croc

### Para enviar um arquivo:

    croc send arquivo.txt

Isso vai gerar um código aleatório

    croc send teste.txt
    Sending 'teste.txt' (6 B)
    Code is: 4112-beyond-caramel-express
    On the other computer run

    croc 4112-beyond-caramel-express

o código gerado foi "**_4112-beyond-caramel-express_**"

### Para receber o arquivo

Simples na outra maquina execute: "**_croc 4112-beyond-caramel-express_**"

    croc 4112-beyond-caramel-express
    Accept 'teste.txt' (6 B)? (Y/n)

    Receiving (<-127.0.0.1:49291)
    teste.txt 100% |████████████████████| ( 6/ 6 B, 181 B/s)

### Outras opções:

- Se você quiser, pode definir seu próprio código de acesso.

- Use a opção --overwrite para permitir a sobrescrita automática de arquivos.

- Você pode usar pipes para transferência via stdin e stdout. Por exemplo, para enviar um arquivo usando cat:

Repo: [https://github.com/schollz/croc](https://github.com/schollz/croc)

Pronto é só isso :)
