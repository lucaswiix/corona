const Sequelize = require('sequelize');

const sequelize = new Sequelize('root', 'root', 'root', {
    host: '0.0.0.0',
    port: '3306',
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

const RequestModel = require('./models/request');
const Request = RequestModel(sequelize, Sequelize);

const UserModel = require('./models/user');
const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log('----- success');
  }).catch((error) => {
    console.log('- error \n', error);
});

module.exports = {
    User,
    Request
};
