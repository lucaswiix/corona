export interface IUser {
  key: string;
  name: string;
  email: string;
  phone: string;
  type: UserTypes
}

export enum UserTypes {
  normal = 1,
  quarentine = 2
}