import { Order } from "./order";
import { ProductsInProductLists } from "./productsInProductLists";

export interface ProductList {
  _id?: string;
  id?: string;
  userId: string;
  isActive: boolean;
  orders: Array<Order>;
  productInProductLists: Array<ProductsInProductLists>;
}
