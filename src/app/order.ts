export interface Order {
  _id?: string;
  id?: string;
  address: string;
  city: string;
  postalCode: string;
  date: string;
  isPaid: boolean;
  basketId: string;
}
