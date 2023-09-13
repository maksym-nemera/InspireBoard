import { Photo } from '../types/Photo';
import { client } from '../utils/fetchClient';

export const getPhotos = () => {
  return client.get<Photo[]>('/photos');
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
