import { Product } from "./product";

export interface BasketItem {
  _id?: string;
  id?: string;
  basketId: string;
  productId: string;
  amount: number;
  product: Product;
}
