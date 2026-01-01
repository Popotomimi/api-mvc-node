import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { password, phone, email, name } = req.body;

      if (!password || !phone || !email || !name) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepo.create({
        ...req.body,
        password: hashedPassword,
      });

      await userRepo.save(user);

      return res.status(201).json(user);
    } catch (err: any) {
      if (err.code === "23505") {
        return res.status(400).json({ message: "Email is already in use" });
      }
      return res.status(500).json({ message: "Failed to create user" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Missing required email and password" });
      }

      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const secret: string = process.env.JWT_SECRET || "default_secret";

      const options: SignOptions = {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600,
      };

      const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        options
      );

      return res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to login, try again later" });
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
