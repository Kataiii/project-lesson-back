import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.register(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res
        .status(
          (error as Error).message === "Пользователь уже существует" ? 400 : 500
        )
        .json({ error: (error as Error).message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.auth(email, password);
      res.status(200).json({ token: data[0], user: data[1] });
    } catch (error) {
      res
        .status(
          (error as Error).message === "Неверный email или пароль" ? 400 : 500
        )
        .json({ error: (error as Error).message });
    }
  },
};
