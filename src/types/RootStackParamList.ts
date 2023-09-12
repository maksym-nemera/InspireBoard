import { Photo } from './Photo';

export type RootStackParamList = {
  Home: undefined;
  Photo: { item: Photo };
  Footer: undefined;
  Search: undefined;
  Profile: undefined;
};
