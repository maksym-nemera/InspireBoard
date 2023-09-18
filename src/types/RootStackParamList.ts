import { Photo, User } from './Photo';

export type RootStackParamList = {
  Home: undefined;
  Photo: {
    photo: Photo;
  };
  Search: undefined;
  Notification: undefined;
  Menu: undefined;
  Profile: {
    user: User | null;
  };
};
