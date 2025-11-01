import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PreferencesState, Category } from '@/types';

const initialState: PreferencesState = {
  categories: ['technology', 'sports'],
  darkMode: false,
  searchQuery: '',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      if (index > -1) {
        state.categories.splice(index, 1);
      } else {
        state.categories.push(category);
      }
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    loadPreferences: (state, action: PayloadAction<PreferencesState>) => {
      return action.payload;
    },
  },
});

export const {
  toggleCategory,
  setCategories,
  toggleDarkMode,
  setDarkMode,
  setSearchQuery,
  loadPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
