import { AutoIncrement, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import RequestModel from './Request';
import { IRequest } from './RequestInterface';
import { IUser, UserTypes } from './UserInterface';


@Table({ modelName: 'user_account' })
export default class UserModel extends Model<UserModel> implements IUser {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  key: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  cpf: string;

  @Column(DataType.DATE)
  birthday: Date;

  @Column(DataType.SMALLINT)
  type: UserTypes;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phone: string;

  @CreatedAt
  @Column(DataType.TIME)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: Date;

  @HasMany(() => RequestModel, 'user_account_key')
  owned_requests: IRequest[];

  @HasMany(() => RequestModel, 'voluntary_user_account_key')
  voluntary_requests: IRequest[];

}
