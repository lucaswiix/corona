const Sequelize = require('sequelize');

const sequelize = new Sequelize('root', 'root', 'BHU*nji9', {
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

const UserModel = require('./models/user');
const User = UserModel(sequelize, Sequelize);

module.exports = {
    User
};
