import { Photo } from './Photo';

export interface SearchPhotos {
  total: number;
  total_pages: number;
  results: Photo[];
}
