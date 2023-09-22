import { User } from './Photo';

export interface Collection {
  id: string;
  title: string;
  description: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  total_photos: number;
  private: boolean;
  share_key: string;
  cover_photo: {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string;
    user: User;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    links: {
      self: string;
      html: string;
      download: string;
    };
  };
  user: User;
  links: {
    self: string;
    html: string;
    photos: string;
    related: string;
  };
}
