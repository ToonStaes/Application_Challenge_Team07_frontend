import { Category } from './category';

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  stockCount: number;
  rating: number;
  imageLocation: string;
  expirationDate: string;
  color: string;
  size: string;
  amount: number;
  categoryId: string;
  category: Category;
}
