import { Product } from "./product";

export interface BasketItem {
  id: string;
  basketId: string;
  productId: string;
  amount: number;
  product: Product;
}
