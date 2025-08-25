import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFiles, deleteFile } from '../store/slices/fileSlice';

const FileHistory = ({ onSelectFile }) => {
  const dispatch = useDispatch();
  const { files, isLoading } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(getUserFiles());
  }, [dispatch]);

  const handleDelete = (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      dispatch(deleteFile(fileId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload History</h2>
      
      {files.length === 0 ? (
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600">No files uploaded yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Upload your first Excel file to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{file.originalName}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>{formatFileSize(file.fileSize)}</span>
                    <span>•</span>
                    <span>{formatDate(file.uploadDate)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onSelectFile(file)}
                    className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Analyze
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileHistory;
