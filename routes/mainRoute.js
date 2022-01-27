const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router({ mergeParams: true });

router.get('/', mainController.getMainPage);

module.exports = router;