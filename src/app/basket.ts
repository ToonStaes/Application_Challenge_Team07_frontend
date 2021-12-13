import { BasketItem } from "./basketItem";
import { Order } from "./order";

export interface Basket {
  id: number;
  userId: number;
  orderId?: number;
  orders: Array<Order>;
  basketItems: Array<BasketItem>;
}
