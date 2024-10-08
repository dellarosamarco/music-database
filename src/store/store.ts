import { configureStore } from '@reduxjs/toolkit';
import { albumSliceReducer } from './slices/albumSlice';

export const store = configureStore({
  reducer: {
    albumSlice: albumSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
