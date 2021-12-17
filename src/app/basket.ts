import { BasketItem } from "./basketItem";
import { Order } from "./order";

export interface Basket {
  _id?: string;
  id?: string;
  userId: string;
  orderId?: string;
  orders: Array<Order>;
  basketItems: Array<BasketItem>;
}
