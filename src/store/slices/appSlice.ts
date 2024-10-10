import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types/album';

interface AppStateListening {
    album: Album;
    trackId: string;
}

interface AppState {
  listening?: AppStateListening;
}

const initialState: AppState = {
  listening: undefined
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setListening: (state, action: PayloadAction<AppStateListening>) => {
      state.listening = action.payload;
    },
  },
  selectors: {
    getListening: (state) => state.listening,
  }
});

export const { setListening } = appSlice.actions;
export const appSliceReducer = appSlice.reducer;
export const { getListening } = appSlice.selectors;
