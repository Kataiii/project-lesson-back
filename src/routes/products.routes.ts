// src/routes/product.routes.ts
import { Router } from "express";
import { ProductController } from "../controllers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: Product name
 *         price:
 *           type: integer
 *           description: Product price (in cents or integer units)
 *         image:
 *           type: string
 *           nullable: true
 *           description: URL of product image
 *         description:
 *           type: string
 *           nullable: true
 *           description: Product description
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: integer
 *         image:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *     UpdateProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: integer
 *         image:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/products", authMiddleware, ProductController.getAll);

/**
 * @swagger
 * /api/products-pagination:
 *   get:
 *     summary: Get all products with pagination
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number (default 1)
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page (max 100, default 10)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of products with total pages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalPages:
 *                   type: integer
 */
router.get(
  "/products-pagination",
  authMiddleware,
  ProductController.getAllWithPagination
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product
 *     responses:
 *       200:
 *         description: Product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 */
router.get("/products/:id", authMiddleware, ProductController.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/products", authMiddleware, ProductController.create);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update an existing product (partial update)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductInput'
 *     responses:
 *       200:
 *         description: Updated product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 */
router.patch("/products/:id", authMiddleware, ProductController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product
 *     responses:
 *       204:
 *         description: Product successfully deleted (no content)
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 */
router.delete("/products/:id", authMiddleware, ProductController.delete);

export default router;
