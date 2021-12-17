import { BasketItem } from "./basketItem";
import { Order } from "./order";

export interface Basket {
  id: string;
  userId: string;
  orderId?: string;
  orders: Array<Order>;
  basketItems: Array<BasketItem>;
}
