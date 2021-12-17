export interface User{
  _id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isAdmin: boolean,
  isSuperAdmin: boolean,
  token: string
}
