import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../features/photos/photosSlice';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
