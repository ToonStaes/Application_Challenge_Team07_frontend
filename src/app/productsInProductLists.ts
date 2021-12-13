import { Product } from "./product";

export interface ProductsInProductLists{
  productId:number,
  productListId:number,
  amount: number,
  product: Product
}
