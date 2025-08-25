const { asyncHandler } = require('../middlewares/errorMiddleware');
const Data = require('../models/dataModel');
const File = require('../models/fileModel');

/**
 * @desc    Generate chart data
 * @route   POST /api/charts/generate
 * @access  Private
 */
const generateChart = asyncHandler(async (req, res) => {
  const { fileId, config, data } = req.body;

  // Validate required fields
  if (!config || !config.xAxis || !config.yAxis) {
    res.status(400);
    throw new Error('Chart configuration is required (xAxis, yAxis)');
  }

  // Process the data based on chart type
  const processedData = processChartData(data, config);

  // Create chart response
  const chartResponse = {
    id: Date.now().toString(),
    type: config.type,
    title: config.title || 'Chart',
    data: processedData,
    config: config,
    createdAt: new Date()
  };

  res.json({
    success: true,
    chart: chartResponse
  });
});

/**
 * @desc    Download chart as image
 * @route   POST /api/charts/download
 * @access  Private
 */
const downloadChart = asyncHandler(async (req, res) => {
  const { chartData, format = 'png' } = req.body;

  // In a real implementation, you would generate the image server-side
  // For now, we'll return a success response
  res.json({
    success: true,
    message: 'Chart download initiated',
    downloadUrl: `/api/charts/download/${Date.now()}.${format}`
  });
});

/**
 * @desc    Get AI insights for data
 * @route   POST /api/charts/ai-insights
 * @access  Private
 */
const getAIInsights = asyncHandler(async (req, res) => {
  const { data, config } = req.body;

  if (!data || !Array.isArray(data) || data.length === 0) {
    res.status(400);
    throw new Error('Data is required for AI insights');
  }

  try {
    // Simulate AI insights (in production, integrate with OpenAI or similar)
    const insights = await generateAIInsights(data, config);
    
    res.json({
      success: true,
      insights
    });
  } catch (error) {
    res.status(500);
    throw new Error('Failed to generate AI insights: ' + error.message);
  }
});

// Helper function to process chart data
const processChartData = (data, config) => {
  if (!data || !Array.isArray(data)) return [];

  const { xAxis, yAxis, type } = config;

  return data.map(item => ({
    x: item[xAxis],
    y: parseFloat(item[yAxis]) || 0,
    label: item[xAxis]
  })).filter(item => item.x !== undefined && item.x !== null);
};

// Helper function to generate AI insights
const generateAIInsights = async (data, config) => {
  // Simulate AI analysis
  const numericColumns = [];
  const categoricalColumns = [];
  
  if (data.length > 0) {
    const firstRow = data[0];
    Object.keys(firstRow).forEach(key => {
      const value = firstRow[key];
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        numericColumns.push(key);
      } else {
        categoricalColumns.push(key);
      }
    });
  }

  // Calculate basic statistics
  const yValues = data.map(item => parseFloat(item[config.yAxis])).filter(val => !isNaN(val));
  const average = yValues.reduce((sum, val) => sum + val, 0) / yValues.length;
  const max = Math.max(...yValues);
  const min = Math.min(...yValues);

  // Generate insights based on data
  const insights = {
    summary: `Analysis of ${data.length} data points shows an average ${config.yAxis} value of ${average.toFixed(2)}. The highest value is ${max} and the lowest is ${min}.`,
    
    statistics: {
      count: data.length,
      average: average.toFixed(2),
      maximum: max,
      minimum: min,
      range: (max - min).toFixed(2)
    },
    
    recommendations: [
      `Consider analyzing the relationship between ${config.xAxis} and ${config.yAxis}`,
      `Look for patterns in the data distribution`,
      `Check for outliers that might need investigation`
    ],
    
    dataQuality: {
      completeness: ((yValues.length / data.length) * 100).toFixed(1) + '%',
      numericColumns: numericColumns.length,
      categoricalColumns: categoricalColumns.length
    }
  };

  // Add chart-specific insights
  if (config.type === 'line') {
    insights.recommendations.push('Consider using time-series analysis if data is temporal');
  } else if (config.type === 'bar') {
    insights.recommendations.push('Compare categories to identify top performers');
  } else if (config.type === 'scatter') {
    insights.recommendations.push('Look for correlation patterns between variables');
  }

  return insights;
};

module.exports = {
  generateChart,
  downloadChart,
  getAIInsights
};
