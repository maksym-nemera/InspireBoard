import { FC, memo, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as photosAction } from '../../features/photos/photosSlice';
import { Photo } from '../../types/Photo';
// import { getPaginationPhotos } from '../../api/photos';
import jsonData from '../../../data.json';
import { FlatList, View } from 'react-native';
import { PhotoItem } from '../../components/PhotoItem';
import { Skeleton } from '../../components/Skeleton';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadedPhotosCount, setLoadedPhotosCount] = useState(0);

  const handlePhotoPress = (photo: Photo) => {
    navigation.navigate('Photo', { photo });
  };

  const fetchPaginationPhotos = async () => {
    try {
      dispatch(photosAction.setLoading(true));
      dispatch(photosAction.clear());

      // const getPhotos = await getPaginationPhotos(currentPage);
      // dispatch(photosAction.add(getPhotos));

      // setLoadedPhotosCount((prevCount) => prevCount + getPhotos.length);
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
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => {
        return (
          <PhotoItem
            photo={item}
            onPress={() => handlePhotoPress(item)}
            isTall={item.height < item.width}
          />
        );
      }}
      // onEndReached={handleLoadMore}
      onEndReachedThreshold={0.8}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <FlatList
          // eslint-disable-next-line no-magic-numbers
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          numColumns={2}
          renderItem={() => (
            <View
              style={{
                marginVertical: 5,
              }}
            >
              <Skeleton height={250} />
            </View>
          )}
          keyExtractor={(_, index) => String(index)}
          showsHorizontalScrollIndicator={false}
        />
      )}
    />
  );
});
