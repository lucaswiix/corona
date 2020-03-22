const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('request', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        local: {
            type: Sequelize.STRING,
            allowNull: false
        },
        priority: { 
            type: type.INTEGER,
            allowNull: true 
        }, 
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        voluntaryId: {
            type: type.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    });
};