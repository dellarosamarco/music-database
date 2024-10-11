import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types/album';

interface AppStateListening {
  album: Album;
  trackId: string;
}

interface AppState {
  isListening: boolean;
  listening?: AppStateListening;
}

const initialState: AppState = {
  isListening: false,
  listening: undefined
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setListening: (state, action: PayloadAction<AppStateListening>) => {
      state.listening = action.payload;
      state.isListening = true;
    },
    setPause: (state) => {
      state.isListening = false;
    },
    setResume: (state) => {
      state.isListening = true;
    }
  },
  selectors: {
    getListening: (state) => state.listening,
    getIsListening: (state) => state.isListening,
  }
});

export const { setListening, setPause, setResume } = appSlice.actions;
export const appSliceReducer = appSlice.reducer;
export const { getListening, getIsListening } = appSlice.selectors;
