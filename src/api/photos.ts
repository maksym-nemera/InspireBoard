import { Photo } from '../types/Photo';
import { client } from '../utils/fetchClient';

export const getPaginationPhotos = (page: number) => {
  return client.get<Photo[]>(`/photos?page=${page}`);
};

export const getRandomPhotos = (altDesc: string = '') => {
  return client.get<Photo[]>(`/photos/random?count=30&query=${altDesc}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addExample = (path: string, data: any) => {
  return client.post<Photo>(path, data);
};

export const removeExample = (id: number) => {
  return client.remove<Photo>(`/example/${id}`);
};

export const changeExample = (
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => {
  return client.put(`/example/${id}`, data);
};
