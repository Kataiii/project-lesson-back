import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - is_completed
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the todo
 *         title:
 *           type: string
 *           description: Todo title
 *         description:
 *           type: string
 *           description: Todo description (optional)
 *         is_completed:
 *           type: boolean
 *           description: Completion status
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *     CreateTodoInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         is_completed:
 *           type: boolean
 *           default: false
 *     UpdateTodoInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         is_completed:
 *           type: boolean
 */

// Теперь можно использовать ссылки на схемы

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: List of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/todos", authMiddleware, TodoController.getAll);

/**
 * @swagger
 * /api/todos-pagination:
 *   get:
 *     summary: Get all todos with pagination
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Номер страницы
 *         schema:
 *           type: integet
 *       - name: limit
 *         in: query
 *         description: Кол-во элементов на странице
 *         schema:
 *           type: integet
 *     responses:
 *       200:
 *         description: List of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get(
  "/todos-pagination",
  authMiddleware,
  TodoController.getAllWithPagination
);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the todo
 *     responses:
 *       200:
 *         description: Todo object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Todo not found
 */
router.get("/todos/:id", authMiddleware, TodoController.getById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoInput'
 *     responses:
 *       201:
 *         description: The created todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post("/todos", authMiddleware, TodoController.create);

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Update an existing todo (partial update)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoInput'
 *     responses:
 *       200:
 *         description: Updated todo object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Todo not found
 */
router.patch("/todos/:id", authMiddleware, TodoController.update);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the todo
 *     responses:
 *       204:
 *         description: Todo successfully deleted (no content)
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Todo not found
 */
router.delete("/todos/:id", authMiddleware, TodoController.delete);

export default router;
