import { Collection } from '../types/Collection';
import { client } from '../utils/fetchClient';

export const getCollections = (username: string) => {
  return client.get<Collection[]>(`/users/${username}/collections`);
};
