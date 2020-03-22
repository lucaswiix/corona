import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { IUser, UserTypes } from './UserInterface';


@Table({ modelName: 'user' })
export default class UserModel extends Model<UserModel> implements IUser {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  key: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.SMALLINT)
  type: UserTypes;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phone: string;
}
