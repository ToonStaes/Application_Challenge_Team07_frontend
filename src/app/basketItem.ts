import { Product } from "./product";

export interface BasketItem {
  id: number;
  basketId: number;
  productId: string;
  amount: number;
  product: Product;
}
