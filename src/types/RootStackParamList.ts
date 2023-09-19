import { Photo, User } from './Photo';

export type RootStackParamList = {
  Home: undefined;
  Photo: {
    photo: Photo;
  };
  Search: undefined;
  Notification: undefined;
  Profile: {
    user: User | null;
  };
  Settings: undefined;
};
