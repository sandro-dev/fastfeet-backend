<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>


<p align="center">
 <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#computer-instalação">Instalação </a>&nbsp;&nbsp;&nbsp;</p>


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
