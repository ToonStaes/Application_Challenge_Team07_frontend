import { Order } from "src/app/order";
import { User } from "src/app/user";


export interface Basket {
  _id: string;
  userId: number;
  orderId?: number;
  isActive: boolean;
  order: Order;
  user: User;
}
