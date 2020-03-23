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
  return [...Array(limit - 1).keys()].map((_, index) => ({
    id: index.toString(),
    type: UserTypes.normal,
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    ...data
  }));
}

const functionGenerateRequest = (data: Partial<IRequest>, limit): Partial<IRequest>[] => {
  return [...Array(limit - 1).keys()].map((_, index) => ({
    id: index.toString(),
    voluntary_id: null,
    user_id: UserSeed.data[0].id,
    status: RequestStatus.searching,
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    ...data
  }));
}

export const UserSeed: Seed<IUser> = {
  model: UserModel,
  data: functionGenerateUser({
    type: UserTypes.normal,
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  }, 10)
};

export const RequestSeed: Seed<IRequest> = {
  model: RequestModel,
  data: functionGenerateRequest({
    voluntary_id: null,
    user_id: UserSeed.data[0].id,
    status: RequestStatus.searching,
    latitude: faker.address.latitude,
    longitude: faker.address.longitude
  }, 10)
};