import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

export const TodoController = {
  async getAll(req: Request, res: Response) {
    try {
      const todos = await TodoService.getAll();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async getAllWithPagination(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const response = await TodoService.getAllWithPagination(page, limit);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const rawId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(rawId, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const todo = await TodoService.getById(id);
      if (!todo) {
        return res.status(404).json({ error: `Todo with id ${id} not found` });
      }

      res.json(todo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const newTodo = await TodoService.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      // Приводим параметр к строке (если это массив — берём первый элемент)
      const rawId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(rawId, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const updatedTodo = await TodoService.update({
        id,
        ...req.body,
      });

      res.json(updatedTodo);
    } catch (error: any) {
      if (error.message?.includes("not found")) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const rawId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(rawId, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const deleted = await TodoService.delete({ id });
      if (!deleted) {
        return res.status(404).json({ error: `Todo with id ${id} not found` });
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
