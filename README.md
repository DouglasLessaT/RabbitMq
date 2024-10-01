# trabalhosistemadistribuida Rabbit

Ocultar informações da atribuição Instruções Desenvolva um sistema em qualquer linguagem de programação que contemple a seguinte arquitetura de sistema distribuído e que seja deployado em algum serviço cloud:

| AUTHOR | --- HTTP POST ---> ( MICROSERVIÇO 1 ) --- HTTP POST ---> ( MICROSERVIÇO 2 ) ----> SISTEMA DE MENSAGERIA

Requisitos

Deverá ser desenvolvido um microserviço ("Microserviço 1") como cliente em que receberá requisições HTTP em um endpoint chamado "POST /pagar"

Deverá ser desenvolvido um microserviço ("Microserviço 2") como servidor em que receberá requisições HTTP do microserviço 1 no endpoint "POST /notificar"

Este microserviço 2 deverá postar uma mensagem em um tópico de mensageria (Ex. AWS SQS ou Rabbit MQ)

Ambos os serviços deverão ter um Dockerfile ou docker-compose e um arquivo README explicando como subir os serviços
