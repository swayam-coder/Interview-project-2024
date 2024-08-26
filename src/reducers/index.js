import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from './category-slice';
import { productsReducer } from './product-slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
  },
});
