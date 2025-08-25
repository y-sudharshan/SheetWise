import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChartConfig, generateChart, getAIInsights } from '../store/slices/chartSlice';
import Chart2D from './Chart2D';
import Chart3D from './Chart3D';

const ChartGenerator = ({ fileData, fileInfo }) => {
  const dispatch = useDispatch();
  const { chartConfig, currentChart, aiInsights, isLoading } = useSelector((state) => state.charts);
  
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (fileData && fileData.length > 0) {
      const firstRow = fileData[0];
      const columnNames = Object.keys(firstRow);
      setColumns(columnNames);
    }
  }, [fileData]);

  const handleConfigChange = (field, value) => {
    dispatch(setChartConfig({ [field]: value }));
  };

  const handleGenerateChart = () => {
    if (!chartConfig.xAxis || !chartConfig.yAxis) {
      alert('Please select both X and Y axes');
      return;
    }

    const chartData = {
      fileId: fileInfo._id,
      config: chartConfig,
      data: fileData
    };

    dispatch(generateChart(chartData));
  };

  const handleGetInsights = () => {
    if (fileData) {
      dispatch(getAIInsights({
        data: fileData,
        config: chartConfig
      }));
    }
  };

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'scatter', label: 'Scatter Plot' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'doughnut', label: 'Doughnut Chart' },
    { value: 'area', label: 'Area Chart' }
  ];

  if (!fileData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-gray-600">Select a file to start generating charts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Configuration */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Chart Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Chart Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chart Type
            </label>
            <select
              value={chartConfig.type}
              onChange={(e) => handleConfigChange('type', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {chartTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* X Axis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              X Axis
            </label>
            <select
              value={chartConfig.xAxis}
              onChange={(e) => handleConfigChange('xAxis', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select X Axis</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>

          {/* Y Axis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Y Axis
            </label>
            <select
              value={chartConfig.yAxis}
              onChange={(e) => handleConfigChange('yAxis', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Y Axis</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>

          {/* Chart Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chart Title
            </label>
            <input
              type="text"
              value={chartConfig.title}
              onChange={(e) => handleConfigChange('title', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter chart title"
            />
          </div>

          {/* 3D Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is3D"
              checked={chartConfig.is3D}
              onChange={(e) => handleConfigChange('is3D', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="is3D" className="ml-2 text-sm font-medium text-gray-700">
              3D Chart
            </label>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleGenerateChart}
            disabled={isLoading || !chartConfig.xAxis || !chartConfig.yAxis}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Chart'}
          </button>

          <button
            onClick={handleGetInsights}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get AI Insights
          </button>
        </div>
      </div>

      {/* Chart Display */}
      {currentChart && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{chartConfig.title}</h3>
          
          {chartConfig.is3D ? (
            <Chart3D
              data={fileData}
              config={chartConfig}
            />
          ) : (
            <Chart2D
              data={fileData}
              config={chartConfig}
            />
          )}
        </div>
      )}

      {/* AI Insights */}
      {aiInsights && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">AI Insights</h3>
          <div className="prose max-w-none">
            <p className="text-gray-700">{aiInsights.summary}</p>
            {aiInsights.recommendations && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
                <ul className="list-disc pl-5 text-gray-700">
                  {aiInsights.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartGenerator;
