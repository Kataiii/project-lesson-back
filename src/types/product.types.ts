// src/types/product.types.ts

export interface Product {
  id: number;
  name: string;
  price: number; // цена в целых единицах (например, рубли) или копейках — зависит от вашей логики
  image?: string | null; // URL изображения (может отсутствовать)
  description?: string | null;
  created_at: Date;
  updated_at: Date; // поле для отслеживания времени последнего изменения
}

// Входные данные для создания продукта (все поля, кроме id, created_at, updated_at)
export interface CreateProductInput {
  name: string;
  price: number;
  image?: string | null;
  description?: string | null;
}

// Входные данные для обновления продукта (все поля опциональны, кроме id)
export interface UpdateProductInput {
  id: number;
  name?: string;
  price?: number;
  image?: string | null;
  description?: string | null;
}

// Входные данные для удаления продукта (просто id)
export interface DeleteProductInput {
  id: number;
}
