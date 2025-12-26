import express from "express";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";

const app = express();
app.use(express.json());

dotenv.config();
AppDataSource.initialize()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use("/users", userRoutes);
app.use("/chat", chatRoutes);

export default app;
