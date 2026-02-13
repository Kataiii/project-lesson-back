import { query } from "../db";
import {
  CreateTodoInput,
  DeleteTodoInput,
  Todo,
  UpdateTodoInput,
} from "../types/todo.types";

export const TodoService = {
  async getAll(): Promise<Todo[]> {
    const result = await query("SELECT * FROM todos ORDER BY created_at DESC");
    return result.rows;
  },

  async getById(id: number): Promise<Todo | null> {
    const result = await query("SELECT * FROM todos WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async create(todoData: CreateTodoInput): Promise<Todo> {
    const { title, description, is_completed } = todoData;
    const result = await query(
      "INSERT INTO todos (title, description, is_completed) VALUES ($1, $2, $3) RETURNING *",
      [title, description, is_completed]
    );
    return result.rows[0];
  },

  async update(todoData: UpdateTodoInput): Promise<Todo> {
    const { id, title, description, is_completed } = todoData;

    const result = await query(
      `UPDATE todos
       SET title = COALESCE($2, title),
           description = COALESCE($3, description),
           is_completed = COALESCE($4, is_completed),
           updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id, title, description, is_completed]
    );

    if (result.rows.length === 0) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return result.rows[0];
  },

  async delete(deleteInput: DeleteTodoInput): Promise<boolean> {
    const { id } = deleteInput;
    const result = await query("DELETE FROM todos WHERE id = $1 RETURNING id", [
      id,
    ]);
    return result.rows.length > 0;
  },
};
