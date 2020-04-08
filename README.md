  ![logo](.github/logo.png)

# Fastfeet REST API
Esse é o Desafio do Bootcamp GoStack 10 da Rocketseat. Esse código corresponde ao backend do app Fastfeet

[](https://img.shields.io/badge/made%20by-Sandro%20Santos-blue)
[](https://img.shields.io/github/license/sandro-dev/fastfeet-backend?color=blue&label=license&logo=MIT)
[](https://img.shields.io/github/repo-size/sandro-dev/fastfeet-backend)

> “A sabedoria é a coisa principal; adquire pois a sabedoria, emprega tudo o que possuis na aquisição de entendimento.” (Provérbios 4:7)”

[Tecnologias](#rocket-tecnologias) | [Instalação](#computer-instalação)

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com)
- [Handlebars](https://handlebarsjs.com/)
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
Desenvolvido por [Sandro Santos](https://www.linkedin.com/in/sandrossantos/) | https://github.com/sandro-dev


