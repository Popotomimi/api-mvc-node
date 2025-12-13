import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.list);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
