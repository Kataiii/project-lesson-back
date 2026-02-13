export interface Todo {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: Date;
}

export type CreateTodoInput = Omit<Todo, "id" | "created_at">;

export type UpdateTodoInput = Omit<Partial<Todo>, "id"> & Pick<Todo, "id">;

export type DeleteTodoInput = Pick<Todo, "id">;
