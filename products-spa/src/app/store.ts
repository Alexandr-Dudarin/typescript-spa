import { configureStore } from '@reduxjs/toolkit';
import petsReducer  from '../features/pets/petsSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    pets: petsReducer,
        ui: uiReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('petsState', JSON.stringify(state.pets));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
