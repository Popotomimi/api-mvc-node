import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";

const userRepo = AppDataSource.getRepository(User);

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const user = userRepo.create(req.body);

      if (
        !req.body.password ||
        !req.body.phone ||
        !req.body.email ||
        !req.body.name
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      await userRepo.save(user);

      return res.status(201).json(user);
    } catch (err: any) {
      if (err.code === "23505") {
        return res.status(400).json({ message: "Email is already in use" });
      }
      return res.status(500).json({ message: "Failed to create user" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      if (req.body) {
      }
      const users = await userRepo.find();
      return res.json(users);
    } catch {
      return res.status(500).json({ message: "Failed to fetch users" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await userRepo.update(id, req.body);
      return res.json({ message: "User updated successfully" });
    } catch {
      return res.status(500).json({ message: "Failed to update user" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await userRepo.delete(id);
      return res.json({ message: "User deleted successfully" });
    } catch {
      return res.status(500).json({ message: "Failed to delete user" });
    }
  }
}
