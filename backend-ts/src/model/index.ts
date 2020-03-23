
import { Sequelize } from 'sequelize-typescript';
import RequestModel from './Request';
import UserModel from './User';

export const addModels = (seq: Sequelize) => {
  seq.addModels([
    UserModel,
    RequestModel
  ])
}