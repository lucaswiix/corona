import faker from 'faker';
import RequestModel from '../model/Request';
import { IRequest, RequestStatus } from '../model/RequestInterface';
import UserModel from '../model/User';
import { IUser, UserTypes } from '../model/UserInterface';

export interface Seed<T> {
  model: any,
  data: Partial<T>[]
}


const functionGenerateUser = (data: Partial<IUser>, limit): Partial<IUser>[] => {
  return [...Array(limit).keys()].map((_, index) => ({
    key: String(((index + 1) * 1000)),
    type: UserTypes.normal,
    name: faker.name.findName(),
    email: `mailtest${index + 1}@mail.com`,
    phone: faker.phone.phoneNumber().replace(/[^0-9+]/g, ''),
    ...data
  }));
}

const functionGenerateRequest = (data: Partial<IRequest>, limit): Partial<IRequest>[] => {
  return [...Array(limit - 1).keys()].map((_, index) => ({
    key: String(((index + 1) * 1000)),
    user_account_key: UserSeed.data[0].key,
    status: RequestStatus.searching,
    priority: 1,
    latitude: '-22.849078',
    longitude: '-47.084030',
    ...data
  }));
}

export const UserSeed: Seed<IUser> = {
  model: UserModel,
  data: functionGenerateUser({
    type: UserTypes.normal,
    name: faker.name.findName(),
  }, 2)
};

export const RequestSeed: Seed<IRequest> = {
  model: RequestModel,
  data: functionGenerateRequest({
    user_account_key: UserSeed.data[0].key,
    status: RequestStatus.searching
  }, 2)
};