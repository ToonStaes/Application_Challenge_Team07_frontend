import { Order } from "src/app/shared/services/order";
import { User } from "src/app/shared/services/user";

export interface Basket {
  _id: string;
  userId: number;
  orderId?: number;
  isActive: boolean;
  order: Order;
  user: User;
}
