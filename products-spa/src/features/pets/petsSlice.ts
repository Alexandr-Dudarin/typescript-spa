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
  loading: boolean;
  error: string | null;
}

const loadState = (): PetsState => {
  try {
    const savedState = localStorage.getItem('petsState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Failed to parse localStorage');
  }

  return {
    items: [],
    filter: 'all',
    search: '',
    page: 1,
    pageSize: 8,
    loading: false,
    error: null,
  };
};

const initialState: PetsState = loadState();

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
      const pet = state.items.find(p => p.id === action.payload);
      if (pet) pet.liked = !pet.liked;
    },
    deletePet(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
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
  setPage,
  setLoading,
  setError,
} = petsSlice.actions;

export default petsSlice.reducer;
