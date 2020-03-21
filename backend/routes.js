const express = require('express');
const users = require('./api/users');
const requests = require('./api/request');

module.exports = (server) => {
    const router = express.Router();
    server.use('/api', router);
    server.use('/api/user', users);
    server.use('/api/request', requests);
}
