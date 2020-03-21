const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        type: {
          type: type.INTEGER,
          allowNull: false
        },
        phone: { 
            type: Sequelize.STRING,
            allowNull: false 
        }, 
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}