import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || !parts[1]) {
    return res.status(401).json({ message: "Token format invalid" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
