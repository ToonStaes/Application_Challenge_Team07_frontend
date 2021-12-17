import { Product } from "./product";

export interface ProductsInProductLists{
  productId: string,
  productListId: string,
  amount: number,
  product: Product
}
