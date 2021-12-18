import { BasketItem } from "./basket-item/basketItem";
import { Order } from "../order";
import { User } from "../user";

export interface Basket {
  _id: string;
  userId: number;
  orderId?: number;
  isActive: boolean;
  order: Order;
  user: User;
}
