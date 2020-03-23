export interface IUser {
  key: string;
  name: string;
  cpf: string;
  birthday: Date;
  email: string;
  type: UserTypes;
  phone: string;
  created_at: Date;
  updated_at: Date;

}

export enum UserTypes {
  normal = 1,
  quarentine = 2
}