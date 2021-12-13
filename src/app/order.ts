export interface Order{
  id: number,
  address : string,
  city: string,
  postalCode: string,
  date: string,
  isPaid: boolean,
  basketId: number
}
