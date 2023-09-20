import { FC, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
// import { View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as photosAction } from '../../features/photos/photosSlice';
import { Photo } from '../../types/Photo';
// import { getPhotos } from '../api/photos';
import jsonData from '../../../data.json';
import { PhotoList } from '../../components/PhotoList';
// import { Loader } from '../../components/Loader';

export const wait = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { photos, loading } = useAppSelector((state) => state.photos);

  const handlePhotoPress = (photo: Photo) => {
    navigation.navigate('Photo', { photo });
  };

  const fetchedPhotos = async () => {
    try {
      dispatch(photosAction.setLoading(true));
      dispatch(photosAction.clear());

      // const result = await getPhotos();
      // dispatch(photosAction.add(result.data));

      // eslint-disable-next-line no-magic-numbers
      await wait(1000).then(() =>
        dispatch(photosAction.add(jsonData as Photo[])),
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(photosAction.setError(error.message));
      }

      dispatch(photosAction.setLoading(false));
    } finally {
      dispatch(photosAction.setLoading(false));
    }
  };

  const handleRefresh = async () => {
    dispatch(photosAction.setIsRefreshing(true));
    await fetchedPhotos();
    dispatch(photosAction.setIsRefreshing(false));
  };

  useEffect(() => {
    fetchedPhotos();
  }, []);

  return (
    // <View>
    //   {loading && !photos.length ? (
    //     <Loader />
    //   ) : (
    <PhotoList onRefresh={handleRefresh} onItemPress={handlePhotoPress} />
    //   )}
    // </View>
  );
};
