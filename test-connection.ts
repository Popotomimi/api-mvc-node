import { Client } from "pg";

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "apiuser",
  password: "api123",
  database: "mydb",
});

client
  .connect()
  .then(() => {
    console.log("Conexão bem-sucedida!");
    return client.end();
  })
  .catch((err) => {
    console.error("Erro de conexão:", err);
  });
