import { Category } from "./category";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  // isActive: boolean;
  stockCount: number;
  rating: number;
  categoryId: number;
  // category: Category
}
