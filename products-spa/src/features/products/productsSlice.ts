import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './types';

export type Filter = 'all' | 'favorites';

interface ProductsState {
  items: Product[];
  filter: Filter;
  search: string;
}

const initialState: ProductsState = {
  items: [],
  filter: 'all',
  search: '',
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
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  toggleLike,
  deleteProduct,
  setFilter,
  setSearch,
} = productsSlice.actions;

export default productsSlice.reducer;
