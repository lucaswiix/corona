const userUtils = require('../src/users.js');
const requestDAO = require('../DAO/request');

const get = (req, res) => {
    const { id } = req.headers;
}

const post = async (req, res) => {
    try {
        const [request, check] = await requestDAO.createRequest(req.body);
        console.log(check)
        if (!check) {
            res.json({'status': '0', 'msg': 'Alredy exists'});
            return;
        }
        res.json({'status': '1', 'msg': 'success'});
    } catch (err) {
        console.error(err);
        res.json(err);
    };
};

const deleteRequest = async (req, res) => {
    
};

const patch = async (req, res) => {
    try {
        const { requestid } = req.headers;
        const filter = { id: ~~requestid }; 
        const [ check ] = await requestDAO.updateRequest(req.body, filter);
        if (!check) {
            res.json({'status': '0', 'msg': 'not found'});
            return;
        };
        res.json({'status': '1', 'msg': 'success'});
    } catch (err) {
        console.log(err);
        res.json({'status': '0', 'msg': err});
    }
};

module.exports = {
    get,
    post,
    deleteRequest,
    patch
}