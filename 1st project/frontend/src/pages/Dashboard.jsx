import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFileData } from '../store/slices/fileSlice';
import FileUpload from '../components/FileUpload';
import FileHistory from '../components/FileHistory';
import ChartGenerator from '../components/ChartGenerator';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { fileData, currentFile } = useSelector((state) => state.files);
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    dispatch(getFileData(file._id));
  };

  useEffect(() => {
    // Auto-refresh files when component mounts
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Zidio Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.name}!
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </span>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - File Upload & History */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload />
            <FileHistory onSelectFile={handleSelectFile} />
          </div>

          {/* Right Column - Chart Generation */}
          <div className="lg:col-span-2">
            <ChartGenerator 
              fileData={fileData} 
              fileInfo={currentFile}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
