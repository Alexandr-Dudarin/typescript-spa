import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pet } from './types';

export type Filter = 'all' | 'favorites';

interface PetsState {
  items: Pet[];
  filter: Filter;
  search: string;
  page: number;
  pageSize: number;
}


const initialState: PetsState = {
  items: [],
  filter: 'all',
  search: '',
  page: 1,
  pageSize: 8,
};



const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setPets(state, action: PayloadAction<Pet[]>) {
      state.items = action.payload;
    },
    addPet(state, action: PayloadAction<Pet>) {
      state.items.unshift(action.payload);
    },
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    deletePet(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
},

  },
});

export const {
  setPets,
  addPet,
  toggleLike,
  deletePet,
  setFilter,
  setSearch,
  setPage
} = petsSlice.actions;

export default petsSlice.reducer;
