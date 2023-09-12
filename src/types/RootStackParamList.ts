import { Photo } from './Photo';

export type RootStackParamList = {
  Home: undefined;
  Photo: { photo: Photo };
  Footer: undefined;
  Search: undefined;
  Profile: undefined;
};
