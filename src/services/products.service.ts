import { query } from "../db";
import {
  CreateProductInput,
  DeleteProductInput,
  Product,
  UpdateProductInput,
} from "../types/product.types";

export const ProductService = {
  /**
   * Получить все продукты (без пагинации, сортировка по дате создания)
   */
  async getAll(): Promise<Product[]> {
    const result = await query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return result.rows;
  },

  /**
   * Получить продукты с пагинацией
   * @param page номер страницы (начиная с 1)
   * @param limit количество записей на странице (макс. 100)
   */
  async getAllWithPagination(
    page: number,
    limit: number
  ): Promise<{ products: Product[]; totalPages: number }> {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit));

    const offset = (validPage - 1) * validLimit;

    const result = await query(
      "SELECT * FROM products ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [validLimit, offset]
    );

    const countResult = await query("SELECT COUNT(*) FROM products");
    const totalCount = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / validLimit);

    return {
      products: result.rows,
      totalPages,
    };
  },

  /**
   * Получить продукт по ID
   */
  async getById(id: number): Promise<Product | null> {
    const result = await query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  /**
   * Создать новый продукт
   */
  async create(data: CreateProductInput): Promise<Product> {
    const { name, price, image, description } = data;
    // image и description могут быть undefined, поэтому подставляем null, если их нет
    const result = await query(
      `INSERT INTO products (name, price, image, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, price, image ?? null, description ?? null]
    );
    return result.rows[0];
  },

  /**
   * Обновить существующий продукт
   * Обновляются только переданные поля (через COALESCE). Если поле не передано, остаётся старое значение.
   * Также автоматически обновляется updated_at.
   */
  async update(data: UpdateProductInput): Promise<Product> {
    const { id, name, price, image, description } = data;

    const result = await query(
      `UPDATE products
       SET
         name = COALESCE($2, name),
         price = COALESCE($3, price),
         image = COALESCE($4, image),
         description = COALESCE($5, description),
         updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id, name, price, image ?? null, description ?? null]
    );

    if (result.rows.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }
    return result.rows[0];
  },

  /**
   * Удалить продукт по ID
   * @returns true, если продукт был удалён, false — если продукт с таким ID не найден
   */
  async delete(deleteInput: DeleteProductInput): Promise<boolean> {
    const { id } = deleteInput;
    const result = await query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [id]
    );
    return result.rows.length > 0;
  },
};
