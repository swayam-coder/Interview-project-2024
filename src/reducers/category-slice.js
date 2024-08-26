import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCategories } from '../api/categories';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await fetchAllCategories();
    return response;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    isLoading: false,
    isError: null,
    selectedCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
