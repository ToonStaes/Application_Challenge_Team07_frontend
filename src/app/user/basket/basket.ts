import { Order } from "src/app/user/account/order";
import { User } from "src/app/security/user";


export interface Basket {
  _id: string;
  userId: number;
  orderId?: number;
  isActive: boolean;
  order: Order;
  user: User;
}
