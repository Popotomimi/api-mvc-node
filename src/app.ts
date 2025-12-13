import express from "express";
import userRoutes from "./routes/userRoutes";
import { AppDataSource } from "./database/data-source";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use("/users", userRoutes);

export default app;
