import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  amountInStock: number;
  rating: number;
  categoryId: number;
  category: Category
}
