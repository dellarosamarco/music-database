import { configureStore } from '@reduxjs/toolkit';
import { albumSliceReducer } from './slices/albumSlice';
import { appSliceReducer } from './slices/appSlice';

export const store = configureStore({
  reducer: {
    albumSlice: albumSliceReducer,
    appSlice: appSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
