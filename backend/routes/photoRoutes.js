const express = require('express');
const { createPhoto, getPhotos, updatePhoto, deletePhoto } = require('../controllers/photoController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Routes
router.post('/', upload.single('image'), createPhoto);
router.get('/', getPhotos);
router.put('/:id', updatePhoto); // Mettre à jour une photo
router.delete('/:id', deletePhoto); // Supprimer une photo

module.exports = router;
