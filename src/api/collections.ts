import { Collection } from '../types/Collection';
import { Photo } from '../types/Photo';
import { client } from '../utils/fetchClient';

export const getCollections = (username: string) => {
  return client.get<Collection[]>(`/users/${username}/collections`);
};

export const getCollectionPhotos = (id: string, page: number) => {
  return client.get<Photo[]>(
    `/collections/${id}/photos?per_page=30&page=${page}`,
  );
};

export const getRelatedCollections = (id: string) => {
  return client.get<Collection[]>(`/collections/${id}/related`);
};
