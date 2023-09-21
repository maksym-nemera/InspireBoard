import { FC, memo, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as photosAction } from '../../features/photos/photosSlice';
import { Photo } from '../../types/Photo';
// import { getPaginationPhotos } from '../../api/photos';
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

export const HomeScreen: FC<HomeScreenProps> = memo(({ navigation }) => {
  const dispatch = useAppDispatch();
  const { photos, isRefreshing } = useAppSelector((state) => state.photos);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  // const [loadedPhotosCount, setLoadedPhotosCount] = useState(0);

  const handlePhotoPress = (photo: Photo) => {
    navigation.navigate('Photo', { photo });
  };

  const fetchPaginationPhotos = async () => {
    try {
      dispatch(photosAction.setLoading(true));
      dispatch(photosAction.clear());

      // const result = await getPaginationPhotos(currentPage);
      // dispatch(photosAction.add(result));

      // setLoadedPhotosCount((prevCount) => prevCount + result.length);
      // setCurrentPage(currentPage + 1);

      // eslint-disable-next-line no-magic-numbers
      await wait(1000).then(() =>
        dispatch(photosAction.add(jsonData as Photo[])),
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(photosAction.setError('Error with download photos'));
      }

      dispatch(photosAction.setLoading(false));
    } finally {
      dispatch(photosAction.setLoading(false));
    }
  };

  const handleRefresh = async () => {
    dispatch(photosAction.setIsRefreshing(true));
    dispatch(photosAction.clear());
    setCurrentPage(1);
    await fetchPaginationPhotos();
    dispatch(photosAction.setIsRefreshing(false));
  };

  // const handleLoadMore = () => {
  //   fetchPaginationPhotos();
  // };

  useEffect(() => {
    fetchPaginationPhotos();
  }, []);

  return (
    <FlatList
      // data={photos.slice(0, loadedPhotosCount)}
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
      // onEndReached={handleLoadMore}
      onEndReachedThreshold={0.8}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
    />
  );
});
