import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photo } from '../../types/Photo';

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
    add: (state, action: PayloadAction<Photo[]>) => {
      state.photos = state.photos.concat(action.payload);
    },
  },
});

export const { actions } = photosSlice;
export default photosSlice.reducer;
