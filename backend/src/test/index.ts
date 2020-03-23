import { Sequelize } from 'sequelize-typescript';


export const db = new Sequelize({
  host: 'localhost',
  database: 'quarentena',
  username: 'wiix',
  password: 'quarentena',
  port: 25432,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 1,
    min: 1,
    idle: 30000,
    acquire: 30000,
    evict: 30000,
  },
  quoteIdentifiers: true,
  benchmark: true,
});
