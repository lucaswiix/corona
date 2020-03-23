import childProcess from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_ENV = 'test';

const DROP_QUERY = `
    DROP DATABASE IF EXISTS quarentenatest;
    CREATE DATABASE quarentenatest;
`;

module.exports = async () => {
  console.time('setup');
  await Promise.all([
    // runMigrations(),
    // appInitialization(),
  ]);
  if (process.send) {
    process.send('jest-setup-done');
  }
  console.timeEnd('setup');
};

async function runMigrations() {
  console.time('migrations');

  let Seeds;

  const { Sequelize } = require('sequelize-typescript');

  const db = new Sequelize({
    host: '0.0.0.0',
    database: 'quarentenatest',
    username: 'root',
    password: 'root',
    port: 3308,
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
  });
  await Promise.all([
    db.query(DROP_QUERY, { logging: false }),
    (async () => {
      require('shelljs').cd(process.env.PWD);
      require('../model').addModels(db);
      Seeds = require('./exports').default;
    })()
  ]);

  console.log('Running migrations...');
  await exec(`yarn run sqlmigrate up -config=${process.env.PWD}/dbconfig.yml -env="test"`);
  for (const seed of Seeds as any[]) {
    try {
      await seed.model.bulkCreate(seed.data, { logging: false });
    } catch (e) {
      console.log(e);
    }
  }

  console.timeEnd('migrations');
}

async function appInitialization() {
  console.time('app');
  const PORT = 3308;
  await exec(`kill -9 $(lsof -t -i:${PORT})`);
  const { initApp } = require('../app');
  await initApp({ port: PORT });

  console.timeEnd('app');
}

if (require.main === module) {
  module.exports();
}

function exec(cmd) {
  return new Promise((resolve) => {
    childProcess
      .exec(cmd, { cwd: './' }, (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error) {
          return resolve(error);
        }
        if (stderr) {
          return resolve(stderr);
        }
        return resolve(stdout);
      });
  });
}
