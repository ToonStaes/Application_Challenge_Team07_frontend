import { Product } from "src/app/admin/product/product";
import { Basket } from "./basket";

export interface BasketItem {
  _id?: string;
  id?: string;
  basketId: string;
  productId: string;
  amount: number;
  product: Product;
  basket: Basket;
}
