const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request');

router.get('/', requestController.get);
router.post('/', requestController.post);
router.delete('/', requestController.deleteRequest);
router.patch('/', requestController.patch);


module.exports = router;