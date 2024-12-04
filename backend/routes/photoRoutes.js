const express = require('express');
const { createPhoto, getPhotos } = require('../controllers/photoController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Routes
router.post('/', upload.single('image'), createPhoto);
router.get('/', getPhotos);

module.exports = router;
