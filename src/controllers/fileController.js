const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const File = require('../models/fileModel');
const Data = require('../models/dataModel');
const { asyncHandler } = require('../middlewares/errorMiddleware');

/**
 * @desc    Upload an Excel file
 * @route   POST /api/files/upload
 * @access  Private
 */
const uploadFile = asyncHandler(async (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Check if file is excel
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== '.xls' && fileExtension !== '.xlsx') {
    // Delete the uploaded file
    fs.unlinkSync(req.file.path);
    
    res.status(400);
    throw new Error('Only .xls or .xlsx files are allowed');
  }

  // Create a new file record
  const file = await File.create({
    fileName: req.file.filename,
    originalName: req.file.originalname,
    fileSize: req.file.size,
    fileType: req.file.mimetype,
    filePath: req.file.path,
    user: req.user._id,
  });

  // Parse Excel file
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetNames = workbook.SheetNames;
    
    // Process each sheet in the Excel file
    for (const sheetName of sheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });
      
      // Save the structured data to MongoDB
      await Data.create({
        fileId: file._id,
        userId: req.user._id,
        sheetName,
        data: jsonData,
      });
    }
    
    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        name: file.originalName,
        size: file.fileSize,
        uploadDate: file.uploadDate,
      },
      sheets: sheetNames,
    });
  } catch (error) {
    // Delete the file if there was an error parsing
    await File.findByIdAndDelete(file._id);
    fs.unlinkSync(req.file.path);
    
    res.status(500);
    throw new Error(`Error parsing Excel file: ${error.message}`);
  }
});

/**
 * @desc    Get all files uploaded by user
 * @route   GET /api/files
 * @access  Private
 */
const getUserFiles = asyncHandler(async (req, res) => {
  const files = await File.find({ user: req.user._id }).sort({ createdAt: -1 });
  
  res.json(files);
});

/**
 * @desc    Get a specific file details
 * @route   GET /api/files/:id
 * @access  Private
 */
const getFileById = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  
  if (!file) {
    res.status(404);
    throw new Error('File not found');
  }
  
  // Check if user owns this file
  if (file.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to access this file');
  }
  
  // Get all data records associated with this file
  const data = await Data.find({ fileId: file._id });
  
  res.json({
    file,
    data: data.map(d => ({
      sheetName: d.sheetName,
      recordCount: Array.isArray(d.data) ? d.data.length : 0,
      dataId: d._id,
    })),
  });
});

/**
 * @desc    Get extracted data from a specific sheet
 * @route   GET /api/files/data/:id
 * @access  Private
 */
const getDataById = asyncHandler(async (req, res) => {
  const data = await Data.findById(req.params.id).populate('fileId');
  
  if (!data) {
    res.status(404);
    throw new Error('Data not found');
  }
  
  // Check if user owns this data
  if (data.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to access this data');
  }
  
  res.json({
    fileName: data.fileId.originalName,
    sheetName: data.sheetName,
    data: data.data,
  });
});

/**
 * @desc    Delete a file
 * @route   DELETE /api/files/:id
 * @access  Private
 */
const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  
  if (!file) {
    res.status(404);
    throw new Error('File not found');
  }
  
  // Check if user owns this file
  if (file.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete this file');
  }
  
  try {
    // Delete file from filesystem
    fs.unlinkSync(file.filePath);
    
    // Delete all associated data
    await Data.deleteMany({ fileId: file._id });
    
    // Delete file record
    await File.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error(`Error deleting file: ${error.message}`);
  }
});

module.exports = {
  uploadFile,
  getUserFiles,
  getFileById,
  getDataById,
  deleteFile,
};
