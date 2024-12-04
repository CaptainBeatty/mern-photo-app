const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file || !req.body.title) {
      return res.status(400).json({ error: 'Title and image are required' });
    }
    try {
      const { title } = req.body;
      const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
      const newPhoto = new Photo({ title, imageUrl });
      await newPhoto.save();
      res.status(201).json(newPhoto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching photos' });
  }
});

module.exports = router;
