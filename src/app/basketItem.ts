import { Product } from "./product";

export interface BasketItem {
  id: number;
  basketId: number;
  productId: number;
  amount: number;
  product: Product;
}
