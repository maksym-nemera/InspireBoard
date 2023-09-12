import { FC } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as photosAction } from '../features/photos/photosSlice';

type PhotoScreenProps = {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
};

export const PhotoScreen: FC<PhotoScreenProps> = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  navigation,
}) => {
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

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size='large' color='pink' />
        </View>
      )}
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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
