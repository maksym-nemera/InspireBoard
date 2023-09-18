import { Photo, User } from './Photo';

export type RootStackParamList = {
  Home: undefined;
  Photo: {
    photo: Photo;
  };
  Search: undefined;
  Profile: {
    user: User | null;
  };
};
