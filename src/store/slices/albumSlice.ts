import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types/album';
import { getNewAlbumReleases, getNewAlbumReleasesParams } from '../../api/services/album/new_releases';

interface AlbumState {
  albums: Album[];
  loading: boolean;
  currentPage: number;
  hasMoreAlbum: boolean;
}

const initialState: AlbumState = {
  albums: [],
  loading: false,
  currentPage: 0,
  hasMoreAlbum: true,
};

export const fetchNewReleases = createAsyncThunk(
  'album/newReleases',
  async (params: getNewAlbumReleasesParams) => {
    const response = await getNewAlbumReleases({page: params.page});
    return response;
  }
);

const albumSlice = createSlice({
  name: 'albumSlice',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    addAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = [...state.albums, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewReleases.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNewReleases.fulfilled, (state, action) => {
      state.loading = false;
      state.albums = [...state.albums, ...action.payload.albums.items];
      state.currentPage += 1;

      if(action.payload.albums.items.length === 0) {
        state.hasMoreAlbum = false;
      }
    });
  },
  selectors: {
    getAlbums: (state) => state.albums,
    getLoading: (state) => state.loading,
    getCurrentPage: (state) => state.currentPage,
    getHasMoreAlbum: (state) => state.hasMoreAlbum,
  }
});

export const { setAlbums, addAlbums } = albumSlice.actions;
export const albumSliceReducer = albumSlice.reducer;
export const { getAlbums, getLoading, getCurrentPage, getHasMoreAlbum } = albumSlice.selectors;
