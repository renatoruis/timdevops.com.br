+++
title = 'EKS Agora Permite a Modificação De Sub Redes E Grupos De Segurança'
date = 2023-11-25
+++

## EKS agora permite a modificação de sub-redes e grupos de segurança

### finalmente!

![](1.webp)

Fala gente! Para quem trabalha no mundo do EKS, tem novidades. A partir de agora, é possível atualizar as sub-redes e os grupos de segurança associados aos seus clusters EKS existentes. Isso mesmo! **FINALMENTE!** Se antes você tinha que ficar preso às configurações iniciais ou criar um novo cluster quando algo mudava, agora a vida ficou mais fácil.

A razão por trás dessa mudança? Os clusters EKS operam em VPC, garantindo um ambiente seguro e eficiente para rodar aplicações Kubernetes. _No modelo anterior, as subnets e SG eram definidos na criação do cluster._ Mas sabemos que, às vezes, há mudanças nas VPCs, como a adição de novas subnets. Agora, em vez de criar um cluster do zero, você pode simplesmente atualizar o existente e mantê-lo sincronizado. Legal, né? mas ainda não é possivel trocar de VPC, aí já é querer muito hahahaha.

A melhor parte é que essa atualização já está disponível para todos os clusters EKS existentes e em todas as regiões AWS que suportam o EKS. Então, se você estava esperando um momento para ajustar seu cluster, a hora é agora!

Quer saber mais detalhes técnicos e como começar? Dá uma passada na [documentação](https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html) do EKS. E fiquem ligados, porque sempre trazemos as novidades mais fresquinhas do mundo DevOps pra vocês! Abraço!

[Post oficial da AWS](<https://aws.amazon.com/pt/about-aws/whats-new/2023/10/amazon-eks-modification-cluster-subnets-security/#:~:text=Amazon%20EKS%20now%20allows%20modification%20of%20cluster%20subnets%20and%20security%20groups,-Posted%20On%3A%20Oct&text=Starting%20today%2C%20customers%20can%20update,Kubernetes%20Service%20(EKS)%20clusters.>)
