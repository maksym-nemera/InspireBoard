import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { photos, error, loading } = useAppSelector((state) => state.photos);

  const handlePhotoPress = (item: Photo) => {
    navigation.navigate('Photo', { item });
  };

  const fetchedPhotos = async () => {
    // const result = await getPhotos();
    // dispatch(photosAction.add(result.data));
    dispatch(photosAction.add(jsonData as Photo[]));
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
          <TouchableOpacity onPress={() => handlePhotoPress(item)}>
            <PhotoItem photo={item} />
          </TouchableOpacity>
        )}
        // onEndReached={handleEndReached}
        onEndReachedThreshold={0.8}
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
