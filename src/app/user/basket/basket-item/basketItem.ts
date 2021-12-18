import { Basket } from "../basket";
import { Product } from "../../../admin/product/product";

export interface BasketItem {
  _id?: string;
  id?: string;
  basketId: string;
  productId: string;
  amount: number;
  product: Product;
  basket: Basket;
}
