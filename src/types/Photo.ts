/* eslint-disable @typescript-eslint/no-explicit-any */
interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3?: string | null;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface UserImage {
  small: string;
  medium: string;
  large: string;
}

interface UserLinks extends Omit<Links, 'download' | 'download_location'> {
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface UserSocial {
  instagram_username: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
}

export interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string | null;
  location: string | null;
  links: UserLinks;
  profile_image: UserImage;
  instagram_username: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: UserSocial;
}

export interface Photo {
  id: string;
  slug: string | null;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: any;
  user: User;
}
