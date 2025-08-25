const express = require('express');
const router = express.Router();
const { generateChart, downloadChart, getAIInsights } = require('../controllers/chartController');
const { protect } = require('../middlewares/authMiddleware');

// All routes are protected
router.use(protect);

// @route   POST /api/charts/generate
// @desc    Generate chart data
// @access  Private
router.post('/generate', generateChart);

// @route   POST /api/charts/download
// @desc    Download chart as image
// @access  Private
router.post('/download', downloadChart);

// @route   POST /api/charts/ai-insights
// @desc    Get AI insights for data
// @access  Private
router.post('/ai-insights', getAIInsights);

module.exports = router;
