const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUser);
router.post('/', usersController.postUser);
router.delete('/', usersController.deleteUser);
router.patch('/', usersController.patchUser);


module.exports = router;