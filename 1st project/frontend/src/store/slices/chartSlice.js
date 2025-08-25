import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/charts';

// Generate chart
export const generateChart = createAsyncThunk(
  'charts/generate',
  async (chartData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/generate`, chartData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Chart generation failed'
      );
    }
  }
);

// Download chart
export const downloadChart = createAsyncThunk(
  'charts/download',
  async (chartData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/download`, chartData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Chart download failed'
      );
    }
  }
);

// Get AI insights
export const getAIInsights = createAsyncThunk(
  'charts/aiInsights',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/ai-insights`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'AI insights failed'
      );
    }
  }
);

const initialState = {
  currentChart: null,
  chartConfig: {
    type: 'bar',
    xAxis: '',
    yAxis: '',
    title: 'Chart',
    is3D: false
  },
  aiInsights: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setChartConfig: (state, action) => {
      state.chartConfig = { ...state.chartConfig, ...action.payload };
    },
    clearChart: (state) => {
      state.currentChart = null;
      state.aiInsights = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateChart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentChart = action.payload;
      })
      .addCase(generateChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(downloadChart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadChart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(downloadChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAIInsights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAIInsights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.aiInsights = action.payload;
      })
      .addCase(getAIInsights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setChartConfig, clearChart } = chartSlice.actions;
export default chartSlice.reducer;
