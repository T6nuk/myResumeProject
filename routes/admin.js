const express = require('express');
const userController = require('../controllers/mainController');
const multer = require('multer');
const path = require('path');
const router = express.Router({ mergeParams: true });

let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './images');
        },
        filename: function(req, file, cb){
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })
});

router.get('/admin', userController.getAdminPage);

router.post('/admin', upload.single('userFile'), userController.postNewData);

router.post('/delete', userController.deleteData);

router.post('/update', userController.updateData);

router.get('/logout', userController.userLogout);

module.exports = router;