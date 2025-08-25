const express = require('express');
const multer = require('multer');
const path = require('path');
const { 
  uploadFile, 
  getUserFiles, 
  getFileById, 
  getDataById,
  getFileData,
  deleteFile 
} = require('../controllers/fileController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  const filetypes = /xlsx|xls/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only Excel files (.xlsx, .xls) are allowed!'), false);
  }
};

// Configure upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// File routes
router.post('/upload', protect, upload.single('file'), uploadFile);
router.get('/', protect, getUserFiles);
router.get('/:id', protect, getFileById);
router.get('/:id/data', protect, getFileData);
router.get('/data/:id', protect, getDataById);
router.delete('/:id', protect, deleteFile);

module.exports = router;
