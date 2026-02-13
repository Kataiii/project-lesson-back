import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { query } from "../db";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = JSON.parse(
      String(jwt.verify(token, process.env.JWT_SECRET ?? ""))
    );
    const users = await query("SELECT * FROM users");
    const existingUser = users.rows.find(
      (user) => user.email === decoded.email
    );
    if (!existingUser) {
      return res.status(401).json({ message: "Токен не действительный" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Токен не действительный" });
  }
};
