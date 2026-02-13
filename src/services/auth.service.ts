import { query } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const users = await query("SELECT * FROM users");
    const existingUser = users.rows.find((user) => user.email === email);

    if (existingUser) {
      throw new Error("Пользователь уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return result.rows[0];
  },

  async auth(email: string, password: string) {
    const users = await query("SELECT * FROM users");
    const existingUser = users.rows.find((user) => user.email === email);

    if (!existingUser) {
      throw new Error("Неверный email или пароль");
    }

    const valid = await bcrypt.compare(password, existingUser.password);

    if (!valid) {
      throw new Error("Неверный email или пароль");
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "1h" }
    );

    return [token, { name: existingUser.name, email: existingUser.email }];
  },
};
