import { Collection } from './Collection';
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
  Collection: {
    collection: Collection;
    collectionTitle: string;
  };
  Settings: undefined;
};
