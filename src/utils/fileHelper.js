const xlsx = require('xlsx');
const path = require('path');

/**
 * Validates if the file is a valid Excel file
 * @param {object} file - File object from multer
 * @returns {boolean} - True if file is valid, false otherwise
 */
const isValidExcelFile = (file) => {
  const acceptedFileTypes = ['.xlsx', '.xls'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  return acceptedFileTypes.includes(fileExtension);
};

/**
 * Parses an Excel file and returns the data as JSON
 * @param {string} filePath - Path to the Excel file
 * @returns {object} - Object containing sheet names and data
 */
const parseExcelFile = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const result = {};
    
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      result[sheetName] = xlsx.utils.sheet_to_json(worksheet, { defval: null });
    });
    
    return {
      success: true,
      sheets: workbook.SheetNames,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = { isValidExcelFile, parseExcelFile };
