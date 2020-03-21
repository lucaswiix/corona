const Request = require('../sequelize').Request;

module.exports = {
    createRequest: async (body) => {
        return await Request.findOrCreate({
            where: body,
            raw: true,
            logging: true,
            defaults: body
        });
    },
    updateRequest: async (body, filter) => {
        return await Request.update(body, {
            where: filter,
            raw: true,
            logging: true,
        });
    }
};