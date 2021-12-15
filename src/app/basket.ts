import { BasketItem } from "./basketItem";
import { Order } from "./order";

export interface Basket {
  _id: string;
  userId: number;
  orderId?: number;
  orders: Array<Order>;
  basketItems: Array<BasketItem>;
}
