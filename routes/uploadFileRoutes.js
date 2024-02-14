const multer = require('multer');
const express = require('express');
const { uploadFiles, listFiles, deleteFile, getPublicUrl } = require('../controllers/filesController');
const router = express.Router();

const upload = multer();

router.route('/uploadFiles').post(upload.any(), uploadFiles);
router.route('/listFiles').get(listFiles);
router.route('/deleteFile/:id').get(deleteFile);
router.route('/publicUrl/:id').get(getPublicUrl);

module.exports = router;