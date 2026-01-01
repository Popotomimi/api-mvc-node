"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../database/data-source");
const User_1 = require("../models/User");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
class UserController {
    static async register(req, res) {
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
        }
        catch (err) {
            if (err.code === "23505") {
                return res.status(400).json({ message: "Email is already in use" });
            }
            return res.status(500).json({ message: "Failed to create user" });
        }
    }
    static async login(req, res) {
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
            const secret = process.env.JWT_SECRET || "default_secret";
            const options = {
                expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600,
            };
            const token = jwt.sign({ id: user.id, email: user.email }, secret, options);
            return res.json({
                success: true,
                token,
                user: { id: user.id, name: user.name, email: user.email },
            });
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: "Failed to login, try again later" });
        }
    }
    static async list(req, res) {
        try {
            if (req.body) {
            }
            const users = await userRepo.find();
            return res.json(users);
        }
        catch {
            return res.status(500).json({ message: "Failed to fetch users" });
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            await userRepo.update(id, req.body);
            return res.json({ message: "User updated successfully" });
        }
        catch {
            return res.status(500).json({ message: "Failed to update user" });
        }
    }
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await userRepo.delete(id);
            return res.json({ message: "User deleted successfully" });
        }
        catch {
            return res.status(500).json({ message: "Failed to delete user" });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map