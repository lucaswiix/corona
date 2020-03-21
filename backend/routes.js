const express = require('express');
const users = require('./api/users');

module.exports = (server) => {
    const router = express.Router();
    server.use('/api', router);
    server.use('/api/user', users);
}
