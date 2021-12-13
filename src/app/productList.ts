import { Order } from "./order";
import { ProductsInProductLists } from "./productsInProductLists";

export interface ProductList{
  id: number,
  userId: number,
  isActive: boolean,
  orders: Array<Order>
  productInProductLists: Array<ProductsInProductLists>
}
