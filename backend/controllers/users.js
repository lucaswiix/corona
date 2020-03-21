const userUtils = require('../src/users.js');
const userDAO = require('../DAO/users');

const getUser = (req, res) => {
    
}

const postUser = async (req, res) => {
    try {
        console.log('oi  ', req);
        const userCheck = userDAO.findUser(req.body);
        console.log('check --> ', userCheck);
        if (userCheck) return res.send('Alredy exists');
        const response = await userDAO.insertUser(req.body);
        console.log('resp -->> ', response);
        res.json(response);
    } catch (err) {
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