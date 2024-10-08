import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types/album';

interface AlbumState {
  albums: Album[];
}

const initialState: AlbumState = {
    albums: [],
};

const albumSlice = createSlice({
  name: 'albumSlice',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => {
        state.albums = action.payload;
    },
    addAlbums: (state, action: PayloadAction<Album[]>) => {
        state.albums = [...state.albums, ...action.payload];
    }
  },
  selectors: {
    getAlbums: (state) => state.albums,
  }
});

export const { setAlbums, addAlbums } = albumSlice.actions;
export const albumSliceReducer = albumSlice.reducer;
export const { getAlbums } = albumSlice.selectors;
