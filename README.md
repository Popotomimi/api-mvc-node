# 🚀 API MVC Node - IA Futuro Tec

## 📌 Sobre o Projeto

Este projeto é uma **API REST no padrão MVC** desenvolvida em **Node.js** e **TypeScript**, utilizando **PostgreSQL** como banco de dados e **Docker** para containerização.  
A aplicação foi criada como parte de um experimento com **inteligência artificial**, onde utilizo o **Gemini** para se passar por uma IA chamada **IA Futuro Tec**, capaz de responder de forma induzida conforme o prompt enviado pelo usuário.

⚠️ **Importante:** Nem toda IA é confiável. Sempre utilize soluções oficiais como **Gemini** e **Copilot**, que prezam pela segurança e transparência.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js + TypeScript** → Estrutura robusta e tipada
- **Express** → Criação das rotas da API
- **TypeORM** → ORM para integração com PostgreSQL
- **Docker** → Containerização e deploy simplificado
- **Swagger (swagger-jsdoc + swagger-ui-express)** → Documentação interativa da API
- **JWT + bcrypt** → Autenticação e segurança
- **Jest + Supertest** → Testes automatizados

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (>= 18)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- npm or yarn

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/Popotomimi/api-mvc-node.git
cd api-mvc-node
```

## Create .env

JWT_SECRET=seuSegredoSecreto <br>
JWT_EXPIRES_IN=3600 <br>
GEMINI_API_KEY=your-key

## Install Dependencies

```bash
npm install
```

## Run PostgreSQL with Docker

```bash
docker-compose up -d
```

### This will start a PostgreSQL with Docker

- User: apiuser
- Password: api123
- Database: mydb

## Start the API

```bash
npm run dev
```

### Server will run at:

👉 http://localhost:3000 <br>
👉 http://localhost:3000/api-docs

## Endpoints

Users:

| Method | Endpoint     | Description                 |
| ------ | ------------ | --------------------------- |
| GET    | /users       | List all users              |
| POST   | /users       | Create new user             |
| PUT    | /users/:id   | Update user by ID           |
| DELETE | /users/:id   | Delete user by ID           |
| POST   | /users/login | Login user and generate JWT |
| POST   | /chat        | Chat with Gemini IA         |

## Example POST/users

Json:

{ <br>
"name": "Roberto", <br>
"email": "roberto@example.com", <br>
"password": "123456", <br>
"phone": "999999999" <br>
}

## Running Tests

Automated tests are written with Jest and Supertest.

```bash
npm test
```

Tests cover:

- Create user
- List users
- Update user
- Delete user

## 🛠️ Technologies

- Node.js & TypeScript
- Express
- TypeORM
- PostgreSQL
- Docker & Docker Compose
- Jest & Supertest
- Swagger
- JWT & bcrypt

## 📜 License

This project is licensed under the MIT License.

## Feito com ❤️ por Roberto de Oliveira.
