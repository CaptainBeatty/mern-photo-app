const Photo = require('../models/Photo');

// Ajouter une photo
exports.createPhoto = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!req.file) throw new Error('Image file is required');
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const photo = await Photo.create({ title, imageUrl });
    res.status(201).json(photo);
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les photos avec pagination
exports.getPhotos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const photos = await Photo.find().skip(skip).limit(limit);
    const total = await Photo.countDocuments();

    res.status(200).json({
      photos,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};
