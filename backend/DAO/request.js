const Request = require('../sequelize').Request;

module.exports = {
    createRequest: async (body) => {
        return await Request.findOrCreate({
            where: body,
            raw: true,
            logging: true,
            defaults: body
        });
    }
};