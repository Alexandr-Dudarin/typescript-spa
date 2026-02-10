import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './types';

interface ProductsState {
  items: Product[];
  filter: 'all' | 'favorites';
}

const initialState: ProductsState = {
  items: [],
  filter: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<'all' | 'favorites'>) {
      state.filter = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  toggleLike,
  deleteProduct,
  setFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
