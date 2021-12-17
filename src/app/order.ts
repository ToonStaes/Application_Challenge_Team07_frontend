import { Basket } from "./basket";

export interface Order{
  _id: string,
  address : string,
  city: string,
  postalCode: string,
  date: string,
  basketId: string,
  basket: Basket
}
