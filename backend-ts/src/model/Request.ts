import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, HasMany, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { IRequest, RequestStatus } from './RequestInterface';
import UserModel from './User';
import { IUser } from './UserInterface';


@Table({ modelName: 'request' })
export default class RequestModel extends Model<RequestModel> implements IRequest {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: string;

  @Column(DataType.INTEGER)
  user_id: string;

  @Column(DataType.INTEGER)
  voluntary_id: string;

  @Column(DataType.STRING)
  status: RequestStatus;

  @Column(DataType.STRING)
  latitude: string;

  @Column(DataType.STRING)
  longitude: string;

  @Column(DataType.INTEGER)
  priority: number;

  @Column(DataType.TEXT)
  description: string;

  @CreatedAt
  @Column(DataType.TIME)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: Date;

  @BelongsTo(() => UserModel, 'user_id')
  owner_user: IUser;

  @BelongsTo(() => UserModel, 'voluntary_id')
  volundary_user: IUser;
}
