import { Basket } from "../../user/basket/basket";


export interface Order{
  _id: string,
  address : string,
  city: string,
  postalCode: string,
  date: string,
  basketId: string,
  basket: Basket
}
