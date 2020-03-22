
import { Sequelize } from 'sequelize-typescript';
import UserModel from './User';

export const addModels = (seq: Sequelize) => {
  seq.addModels([
    UserModel
  ])
}