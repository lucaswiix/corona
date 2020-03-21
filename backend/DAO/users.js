const User = require('../sequelize').User;

module.exports = {
    insertUser: (user) => {

        return User.create(user).then(resp => {
            return resp
        }).carch(err => { 
            return err
        });
    },
    findUser: (user) => {
        const filter = {};
        console.log(user)
        if (user.email) {
            filter.email = user.email;
        }

        if (user.cpf) {
            filter.cpf = user.cpf;
        }
        console.log('filter --> ', filter);
        return User.find({
            where: filter,
            raw: true
        }).then(resp => {
            return resp
        }).catch(err => {
            return err
        }) 
    }
};