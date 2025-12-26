import { Router } from "express";
import { ChatController } from "../controllers/ChatController";

const router = Router();

router.post("/", ChatController.chat);

export default router;
