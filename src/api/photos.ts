import { Photo } from '../types/Photo';
import { SearchPhotos } from '../types/SearchItems';
import { client } from '../utils/fetchClient';

export const getPaginationPhotos = (page: number) => {
  return client.get<Photo[]>(`/photos?per_page=30&page=${page}`);
};

export const getRandomPhotos = (altDesc: string = '') => {
  return client.get<Photo[]>(`/photos/random?count=30&query=${altDesc}`);
};

export const likePhoto = (id: string) => {
  return client.post<Photo>(`/photos/${id}/like`);
};

export const unLikePhoto = (id: string) => {
  return client.remove<Photo>(`/photos/${id}/like`);
};

export const searchPhotos = (query: string, page: number) => {
  return client.get<SearchPhotos>(
    `/search/photos?per_page=30&page=${page}&query=${query}`,
  );
};

export const changeExample = (
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => {
  return client.put(`/example/${id}`, data);
};
