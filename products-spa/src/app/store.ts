import { configureStore } from '@reduxjs/toolkit';
import petsReducer  from '../features/pets/petsSlice';

export const store = configureStore({
  reducer: {
    pets: petsReducer ,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('petsState', JSON.stringify(state.pets));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
