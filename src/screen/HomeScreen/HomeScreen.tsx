import { FC, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as photosAction } from '../../features/photos/photosSlice';
import { Photo } from '../../types/Photo';
// import { getPhotos } from '../api/photos';
import jsonData from '../../../data.json';
import { FlatList } from 'react-native';
import { PhotoItem } from '../../components/PhotoItem';

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
  const { photos, isRefreshing } = useAppSelector((state) => state.photos);

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
    <FlatList
      data={photos}
      numColumns={2}
      keyExtractor={(photo) => photo.id}
      renderItem={({ item }) => (
        <PhotoItem
          photo={item}
          onPress={() => handlePhotoPress(item)}
          isTall={item.width > item.height}
        />
      )}
      onEndReachedThreshold={0.8}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
    />
  );
};
