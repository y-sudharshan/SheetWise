import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../store/slices/fileSlice';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.files);

  const handleFileSelect = (file) => {
    if (file && (file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid Excel file (.xls or .xlsx)');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadFile(selectedFile));
      setSelectedFile(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Excel File</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          
          <p className="text-xl text-gray-600 mb-2">
            Drag and drop your Excel file here
          </p>
          <p className="text-gray-500 mb-4">or</p>
          
          <label className="cursor-pointer bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Choose File
            <input
              type="file"
              className="hidden"
              accept=".xls,.xlsx"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </label>
          
          <p className="text-sm text-gray-500 mt-2">
            Supports .xls and .xlsx files
          </p>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{selectedFile.name}</p>
              <p className="text-sm text-gray-600">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Remove
              </button>
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{message}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
