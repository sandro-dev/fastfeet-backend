<h1 align="center">
  <img alt="FastFeet" height="215" title="FastFeet" src=".github/logo.png" />
</h1>


<p align="center">
 <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#computer-instalação-execução-e-desenvolvimento">Instalação </a>&nbsp;&nbsp;&nbsp;</p>

<strong>Links dos desafios:</strong>

- Backend:
  [Etapa 1](https://github.com/sandro-dev/fastfeet-backend) |  [Etapa 2](https://github.com/sandro-dev/fastfeet-backend)
- Frontend:
  [Etapa 3](https://github.com/sandro-dev/fastfeet-frontend)
- Mobile:
[Etapa 4]((https://github.com/sandro-dev/fastfeet-mobile))

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Postgre](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://github.com/expressjs/express)
- [Redis](https://redis.io/)
- [Bee-Queue](https://github.com/bee-queue/bee-queue)

## :computer: Instalação

Faça um clone desse repositório.

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Backend

- A partir da raiz do projeto, entre na pasta rodando `cd server`;
- Execute o comando `yarn` para instalar sua dependências;
- Execute o comando `cp .env.example .env` e preencha o arquivo `.env` com `suas` variáveis ambiente;
- Execute o comando `docker-compose up -d` para montar o ambiente;
- Execute o comando `yarn sequelize db:migrate` para executar as migrations;


---

Desenvolvido por [sandro-dev](https://www.linkedin.com/in/sandrossantos/)
