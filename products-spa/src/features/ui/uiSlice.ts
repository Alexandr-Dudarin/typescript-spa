import { createSlice } from '@reduxjs/toolkit';

interface UiState {
    theme: 'light' | 'dark';
}

const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return 'light';
};

const initialState: UiState = {
  theme: getInitialTheme(),
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;