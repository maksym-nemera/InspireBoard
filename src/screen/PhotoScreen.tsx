import { FC } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as photosAction } from '../features/photos/photosSlice';
import { Loader } from '../components/Loader';

interface PhotoScreenProps {
  route: RouteProp<RootStackParamList, 'Photo'>;
}

export const PhotoScreen: FC<PhotoScreenProps> = ({ route }) => {
  const { photo } = route.params;
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.photos);

  const handleLoadStart = () => {
    dispatch(photosAction.setLoading(true));
  };

  const handleLoadEnd = () => {
    dispatch(photosAction.setLoading(false));
  };

  return (
    <View style={[styles.container]}>
      <Image
        source={{ uri: photo.urls.full }}
        style={[styles.image]}
        resizeMode='contain'
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />

      <Text>{photo.user.name}</Text>

      {loading && <Loader />}
    </View>
  );
};

const imageWidth = Dimensions.get('window').width;
// eslint-disable-next-line no-magic-numbers
const imageHeight = Dimensions.get('window').height - 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    marginBottom: 10,
    borderRadius: 10,
  },
});
