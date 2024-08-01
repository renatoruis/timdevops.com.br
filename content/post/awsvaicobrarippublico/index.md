+++
author = "Renato Ruis (Tim)"
title = 'AWS Vai cobrar os IPs Públicos'
description = "Fica ligado..."
date = 2023-08-01
+++

![](0_l6DH2slO0VPpIGvi.jpg)

_— — Este é um resumo do [post](https://aws.amazon.com/pt/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/) do [Jeff Barr](https://aws.amazon.com/blogs/aws/author/jbarr/)_

A partir de 1º de fevereiro de 2024, a AWS vai começar a cobrar **$0.005** por hora por cada endereço público IPv4, independentemente se estiverem vinculados a um serviço ou não. Isso vale pra todos os serviços AWS como Amazon EC2, RDS, EKS e outros.

Sabe por quê? Os endereços IPv4 estão cada vez mais escassos e o custo pra conseguir um endereço público aumentou mais de 300% nos últimos 5 anos. Então, a ideia é que a gente seja mais econômico no uso de endereços públicos IPv4 e comece a pensar em adotar o IPv6.

Aqui vai um resumo dos preços no AWS:

- Endereços IPv4 públicos em uso: antes era grátis, agora vai ser $0.005 por hora.

- Endereços Elastic IP adicionais em uma instância EC2 em execução: continua $0.005 por hora.

- Endereço Elastic IP ocioso na conta: continua $0.005 por hora.

_Ah, e tem um detalhe importante: **o AWS Free Tier para EC2 vai incluir 750 horas de uso de endereço IPv4 público por mês**, durante os primeiros 12 meses, a partir de 1º de fevereiro de 2024._

E mais, você não será cobrado por endereços IP que você trouxer pro AWS usando o [Amazon BYOIP](https://aws.amazon.com/pt/blogs/networking-and-content-delivery/introducing-bring-your-own-ip-byoip-for-amazon-vpc/).

Já a partir de hoje, os seus Relatórios de Custo e Uso da AWS vão incluir o uso do endereço IPv4 público. Quando essa mudança de preço entrar em vigor no próximo ano, você também poderá usar o AWS Cost Explorer pra ver e entender melhor o seu uso.

Pra ajudar a entender e monitorar melhor o uso dos endereços IPv4 públicos, a AWS lançou uma nova ferramenta gratuita chamada [Public IP Insights](https://docs.aws.amazon.com/pt_br/vpc/latest/ipam/view-public-ip-insights.html).

**Então, a dica é:** dê uma olhada nos recursos sobre como usar o IPv6 e tente minimizar o efeito dessa nova cobrança. Você também pode considerar usar o AWS Direct Connect pra configurar uma conexão de rede dedicada à AWS.
