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
- A partir da raiz do projeto, entre na pasta backend:

```bash
  cd backend
  ```

- Execute o comando `yarn` para instalar as dependências:
```bash
    yarn
  ```

- Execute o comando `cp .env.example .env` e preencha o arquivo `.env` com `suas` variáveis de ambiente, para que tudo funcione perfeitamente;

Agora vamos instalar duas imagens de bancos de dados: 

- Primeiro vamos instalar o Postgres, para armazenar nossas tabelas. Execute o seguinte comando no terminal:

```bash
  docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

- Posteriormente, vamos instalar o Redis, o banco que vai gerenciar o envio de e-mails com filas com alta performance. Execute o comando:

```bash    
  docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Vamos configurar o banco de dados da aplicação:

- Crie um novo banco de dados *postgres* com o nome que colocou em *DB_HOST*

- Rode o comando abaixo para executar as migrations, e criar as tabelas no banco de dados;

```bash    
  yarn sequelize db:migrate
```

Agora, vamos popular a tabela `users` com o usuário administrador:

```bash    
  yarn sequelize db:seed:all
```

Ainda na pasta backend, vamos colocar o servidor para rodar.

```bash
  yarn dev
```

Em outro prompt/terminal, execute o seguinte comando e deixe rodando para gerenciar a fila de emails
```bash
  yarn queue
```


---
Desenvolvido por [Sandro Santos](https://www.linkedin.com/in/sandrossantos/) | https://github.com/sandro-dev


