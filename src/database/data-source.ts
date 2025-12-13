import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5433,
  username: "apiuser",
  password: "api123",
  database: "mydb",
  synchronize: true,
  logging: true,
  entities: [User],
});
