import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { FavoritesState, Movie} from '../../utils/Interfaces';
import { AppDispatch, RootState } from '../../app/store';

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Movie>) => {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload.imdbID);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, setFavorites } = favoritesSlice.actions;

export const saveFavoritesToLocalForage = (username: string, favorites: Movie[]) => async (dispatch:AppDispatch) => {
  await localForage.setItem(`favorites_${username}`, favorites);
  dispatch(setFavorites(favorites));
};

export const loadFavoritesFromLocalForage = (username:String) => async (dispatch:AppDispatch) => {
  const favorites = await localForage.getItem<Movie[]>(`favorites_${username}`);
  if (favorites) {
    dispatch(setFavorites(favorites));
  } else {
    dispatch(setFavorites([]));
  }
};

export const selectFavorites = (state:RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
