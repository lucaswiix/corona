import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, HasMany, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { IRequest, RequestStatus } from './RequestInterface';
import UserModel from './User';
import { IUser } from './UserInterface';


@Table({ modelName: 'request' })
export default class RequestModel extends Model<RequestModel> implements IRequest {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  key: string;

  @Column(DataType.INTEGER)
  user_account_key: string;

  @Column(DataType.INTEGER)
  voluntary_user_account_key: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  status: RequestStatus;

  @Column(DataType.INTEGER)
  evaluation: number;

  @Column(DataType.STRING)
  latitude: string;

  @Column(DataType.STRING)
  longitude: string;

  @Column(DataType.INTEGER)
  priority: number;

  @CreatedAt
  @Column(DataType.TIME)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: Date;

  @BelongsTo(() => UserModel, 'user_account_key')
  owner_user: IUser;

  @BelongsTo(() => UserModel, 'voluntary_user_account_key')
  volundary_user: IUser;
}
