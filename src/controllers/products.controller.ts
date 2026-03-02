// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { ProductService } from "../services/products.service";

export const ProductController = {
  /**
   * Получить все продукты
   */
  async getAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  /**
   * Получить продукты с пагинацией
   * Query params: page, limit
   */
  async getAllWithPagination(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const response = await ProductService.getAllWithPagination(page, limit);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  /**
   * Получить продукт по ID
   */
  async getById(req: Request, res: Response) {
    try {
      const rawId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(rawId, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const product = await ProductService.getById(id);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with id ${id} not found` });
      }

      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Создать новый продукт
   */
  async create(req: Request, res: Response) {
    try {
      const newProduct = await ProductService.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  /**
   * Обновить существующий продукт
   */
  async update(req: Request, res: Response) {
    try {
      const rawId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(rawId, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const updatedProduct = await ProductService.update({
        id,
        ...req.body,
      });

      res.json(updatedProduct);
    } catch (error: any) {
      if (error.message?.includes("not found")) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  /**
   * Удалить продукт по ID
   */
  async delete(req: Request, res: Response) {
    try {
      const rawId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(rawId, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const deleted = await ProductService.delete({ id });
      if (!deleted) {
        return res
          .status(404)
          .json({ error: `Product with id ${id} not found` });
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
