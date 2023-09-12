import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as photosAction } from '../features/photos/photosSlice';
import { Photo } from '../types/Photo';
// import { getPhotos } from '../api/photos';
import jsonData from '../../data.json';
import { PhotoItem } from '../components/PhotoItem/PhotoItem';

type HomeScreenProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const HomeScreen: FC<HomeScreenProps> = ({ route, navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const { photos } = useAppSelector((state) => state.photos);

  const handlePhotoPress = (photo: Photo) => {
    navigation.navigate('Photo', { photo });
  };

  const fetchedPhotos = async () => {
    try {
      dispatch(photosAction.setLoading(true));
      dispatch(photosAction.clear());

      // const result = await getPhotos();
      // dispatch(photosAction.add(result.data));

      dispatch(photosAction.add(jsonData as Photo[]));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(photosAction.setError(error.message));
      }

      dispatch(photosAction.setLoading(false));
    } finally {
      dispatch(photosAction.setLoading(false));
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    fetchedPhotos();

    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchedPhotos();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.borderShadow}></View>

      <FlatList
        keyExtractor={(photo) => photo.id}
        data={photos}
        renderItem={({ item }) => (
          <PhotoItem photo={item} onPress={() => handlePhotoPress(item)} />
        )}
        // onEndReached={handleEndReached}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#D8BFD8',
    position: 'relative',
    overflow: 'hidden',
  },
  borderShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'rgba(216, 191, 216, 0.7)',
    backdropFilter: 'blur(10px)',
  },
});
