# API MVC Node.js

A simple **CRUD API** built with **Node.js**, **Express**, **TypeORM**, and **PostgreSQL** running inside Docker.  
Includes automated tests with **Jest** and **Supertest**.

---

## 🚀 Features

- MVC architecture (Models, Controllers, Routes)
- PostgreSQL database with Docker Compose
- TypeORM for ORM and migrations
- CRUD operations for `User` entity
- Error handling with meaningful responses
- Automated tests with Jest + Supertest

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

👉 http://localhost:3000

## Endpoints

Users:

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /users     | List all users    |
| POST   | /users     | Create new user   |
| PUT    | /users/:id | Update user by ID |
| DELETE | /users/:id | Delete user by ID |

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

## 📂 Project Structure

src/
├── app.ts # Express app setup
├── server.ts # Server entry point
├── database/
│ └── data-source.ts # TypeORM config
├── models/
│ └── User.ts # User entity
├── controllers/
│ └── UserController.ts
├── routes/
│ └── userRoutes.ts
tests/
└── user.test.ts # Jest + Supertest CRUD tests
docker-compose.yml # Postgres container setup

## 🛠️ Technologies

- Node.js
- Express
- TypeORM
- PostgreSQL
- Docker & Docker Compose
- Jest & Supertest

## 📜 License

This project is licensed under the MIT License.

## Feito com ❤️ por Roberto de Oliveira.
