const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router({ mergeParams: true });

router.get('/', mainController.getMainPage);
router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.postLogin);
router.get('/authorize', mainController.getAutorizationPage);
router.get('/register', mainController.getRegisterPage);
router.post('/register', mainController.postRegister);

module.exports = router;