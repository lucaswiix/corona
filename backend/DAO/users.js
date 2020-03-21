const User = require('../sequelize').User;

module.exports = {
    findOrCreateUser: async (body) => {
        return await User.findOrCreate({
            where: body,
            raw: true,
            logging: true,
            defaults: body
        });
    }
};