# 📖Library

<div align="center">
  
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![ReactJS](https://img.shields.io/badge/React-087ea4?style=for-the-badge&logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-f6009c?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo-grey?style=for-the-badge&logo=apollographql&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

</div>

## Sobre

Este monorepo integra os projetos backend e frontend da Library, uma aplicação simples dedicada à catalogação e recomendação de livros. Desenvolvida como um exercício prático para fixar os conhecimentos teóricos em GraphQL, a aplicação abrange alguns conceitos e tecnologias relevantes para o ecossistema GraphQL.

**Principais Pontos Abordados:**
* **Apollo Server:** Implementação do servidor GraphQL usando o Apollo Server, proporcionando uma base sólida para a API backend da Library;

* **Schemas:** Definição estruturada dos tipos de dados e suas relações;

* **Queries e Mutations:** Utilização eficaz de queries para leitura de dados e mutations para alteração de dados, permitindo interações com o backend;

* **Resolvers:** Implementação de resolvers para cada tipo de dado, conectando as queries e mutations definidas nos schemas com a lógica de negócios do backend;

* **Apollo Client com ReactJS:** Integração suave entre o frontend e o backend usando o Apollo Client no ambiente ReactJS;

* **Cache:** Exploração do sistema de cache do Apollo Client para otimização do desempenho, minimizando as requisições ao servidor e melhorando a responsividade da aplicação;

* **Fragments:** Uso de fragments para modularizar e reutilizar partes das queries, melhorando a manutenibilidade e a legibilidade do código;

* **Subscriptions:** Integração de subscriptions para permitir atualizações em tempo real, proporcionando uma experiência mais dinâmica e interativa aos usuários.

## Variáveis de Ambiente

Faça uma copia do .env.example e edite com suas configurações:

```bash
  cp .env.example .env
```

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGODB_URI` - uri do banco MongoDB

`PORT` - porta na qual irá rodar o server, por padrão está 4000

`SECRET` - string usada para gerar o token JWT

Obs: Como o foco do projeto foi o estudo do GraphQL, foi deixado de lado a autenticação e o password foi padronizado para "secret".

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/patrickmps/library.git
```
### Backend

Entre no diretório do backend

```bash
  cd backend
```

Instale as dependências

```bash

  npm install
```

Inicie o servidor

```bash
  npm run dev
```
É possível testar a API pelo Apollo Studio Explorer pelo navegador acessando a url do server `http://localhost:4000`.

### Frontend

Entre no diretório do frontend

```bash
  cd frontend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```
Agora com o backend e o frontend rodando basta acessar o endereço `http://localhost:5173` e testar a aplicação.

<div align="center">⚡</div>
