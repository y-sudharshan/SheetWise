const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, 'Filename is required'],
    trim: true,
  },
  originalName: {
    type: String,
    required: [true, 'Original filename is required'],
  },
  fileSize: {
    type: Number,
    required: [true, 'File size is required'],
  },
  fileType: {
    type: String,
    required: [true, 'File type is required'],
  },
  filePath: {
    type: String,
    required: [true, 'File path is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
