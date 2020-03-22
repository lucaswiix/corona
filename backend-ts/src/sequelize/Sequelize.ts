import { Sequelize } from 'sequelize-typescript';
import GlobaConfig from '../config/GlobalConfig';
import { addModels } from '../model';

const db = new Sequelize({
  host: GlobaConfig.SQL_HOST,
  database: GlobaConfig.SQL_DATABASE,
  username: GlobaConfig.SQL_USER,
  password: GlobaConfig.SQL_PASSWORD,
  port: GlobaConfig.SQL_PORT,
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 1,
    idle: 30000,
    acquire: 30000,
    evict: 30000,
  },
  quoteIdentifiers: false,
  benchmark: true,
} as any);

addModels(db);

export default db;
