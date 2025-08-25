import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/files';

// Upload file
export const uploadFile = createAsyncThunk(
  'files/upload',
  async (fileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', fileData);

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'File upload failed'
      );
    }
  }
);

// Get user files
export const getUserFiles = createAsyncThunk(
  'files/getUserFiles',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch files'
      );
    }
  }
);

// Get file data
export const getFileData = createAsyncThunk(
  'files/getFileData',
  async (fileId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/${fileId}/data`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch file data'
      );
    }
  }
);

// Delete file
export const deleteFile = createAsyncThunk(
  'files/delete',
  async (fileId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return fileId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete file'
      );
    }
  }
);

const initialState = {
  files: [],
  currentFile: null,
  fileData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearFileData: (state) => {
      state.fileData = null;
      state.currentFile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files.unshift(action.payload.file);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = action.payload;
      })
      .addCase(getUserFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fileData = action.payload.data;
        state.currentFile = action.payload.file;
      })
      .addCase(getFileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = state.files.filter(file => file._id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearFileData } = fileSlice.actions;
export default fileSlice.reducer;
