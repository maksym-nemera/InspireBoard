import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photo } from '../../types/Photo';
import { RootState } from '../../app/store';

interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: string;
}

const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    add: (state, action: PayloadAction<Photo[]>) => {
      state.photos = state.photos.concat(action.payload);
    },
    clear: (state) => {
      state.photos = [];
    },
  },
});

export const { actions } = photosSlice;
export default photosSlice.reducer;

export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectLoading = (state: RootState) => state.photos.loading;
export const selectError = (state: RootState) => state.photos.error;
