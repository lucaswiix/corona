const userUtils = require('../src/users.js');
const userDAO = require('../DAO/users');

const getUser = (req, res) => {
    
}

const postUser = async (req, res) => {
    try {
        const [user, check] = await userDAO.findOrCreateUser(req.body);
        if (!check) return res.json({'status': '0', 'msg': 'Alredy Exists'});
        res.json({'status': '1', 'msg': 'success'});
    } catch (err) {
        console.error(err);
        res.json(err);
    };
};

const deleteUser = (req, res) => {
    
}

const patchUser = (req, res) => {
    
}

module.exports = {
    getUser,
    postUser,
    deleteUser,
    patchUser
}