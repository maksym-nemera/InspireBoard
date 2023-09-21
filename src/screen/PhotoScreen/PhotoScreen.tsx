import { FC, memo, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserInfo } from '../../components/UserInfo';
import { Ionicons } from '@expo/vector-icons';
import { getInvertedColor } from '../../utils/utils';
import { FullPicture } from '../../components/FullPicture';
import { PhotoItem } from '../../components/PhotoItem';
import { actions as photosAction } from '../../features/photos/photosSlice';
import { Photo } from '../../types/Photo';
import { useAppDispatch } from '../../app/hooks';
// import { getRandomPhotos } from '../../api/photos';
import { wait } from '../HomeScreen/HomeScreen';
import jsonData from '../../../data.json';

interface PhotoScreenProps {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

export const PhotoScreen: FC<PhotoScreenProps> = memo(
  ({ route, navigation }) => {
    const { photo } = route.params;
    const dispatch = useAppDispatch();

    const [currentPhotoRandomPhotos, setCurrentPhotoRandomPhotos] = useState<
      Photo[]
    >([]);

    const fetchRecomendedPhotos = async () => {
      try {
        dispatch(photosAction.setLoading(true));
        // const result = await getRandomPhotos(
        //   photo.description || photo.alt_description,
        // );

        // setCurrentPhotoRandomPhotos(result);
        // eslint-disable-next-line no-magic-numbers
        await wait(1000).then(() =>
          setCurrentPhotoRandomPhotos(jsonData as Photo[]),
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

    useEffect(() => {
      fetchRecomendedPhotos();
    }, []);

    const handlePhotoPress = (photo: Photo) => {
      navigation.push('Photo', { photo });
    };

    return (
      <SafeAreaView style={{ height: '100%' }}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name='ios-chevron-back-sharp'
              size={26}
              color={getInvertedColor(photo.color)}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          ListHeaderComponent={() => (
            <>
              <FullPicture photo={photo} />

              <UserInfo navigation={navigation} photo={photo} />
            </>
          )}
          data={currentPhotoRandomPhotos}
          numColumns={2}
          keyExtractor={(photo) => photo.id}
          renderItem={({ item }) => (
            <PhotoItem
              photo={item}
              onPress={() => handlePhotoPress(item)}
              isTall={item.width > item.height}
            />
          )}
        />
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    top: 55,
    left: 10,
    zIndex: 1,
  },
});
