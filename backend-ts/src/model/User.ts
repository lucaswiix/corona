import { AutoIncrement, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import RequestModel from './Request';
import { IRequest } from './RequestInterface';
import { IUser, UserTypes } from './UserInterface';


@Table({ modelName: 'user' })
export default class UserModel extends Model<UserModel> implements IUser {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: string;

  @Column(DataType.STRING)
  name: string;

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

  @HasMany(() => RequestModel, 'user_id')
  owned_requests: IRequest[];

  @HasMany(() => RequestModel, 'voluntary_id')
  voluntary_requests: IRequest[];

}
