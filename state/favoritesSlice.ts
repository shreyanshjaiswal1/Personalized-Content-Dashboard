import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FavoritesState, FeedItem } from '@/types';

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FeedItem>) => {
      const exists = state.items.find(
        (item) => {
          if (item.type === 'news' && action.payload.type === 'news') {
            return item.id === action.payload.id;
          }
          if (item.type === 'movie' && action.payload.type === 'movie') {
            return item.id === action.payload.id;
          }
          if (item.type === 'social' && action.payload.type === 'social') {
            return item.id === action.payload.id;
          }
          return false;
        }
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(
        (item) => {
          if (item.type === 'news' || item.type === 'social') {
            return item.id !== action.payload;
          }
          if (item.type === 'movie') {
            return item.id !== action.payload;
          }
          return true;
        }
      );
    },
    reorderFavorites: (state, action: PayloadAction<FeedItem[]>) => {
      state.items = action.payload;
    },
    loadFavorites: (state, action: PayloadAction<FeedItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  reorderFavorites,
  loadFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
