export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserTypes;
  created_at: Date;
  updated_at: Date;

}

export enum UserTypes {
  normal = 1,
  quarentine = 2
}