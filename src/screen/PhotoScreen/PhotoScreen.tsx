/* eslint-disable no-magic-numbers */
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Text,
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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { wait } from '../HomeScreen/HomeScreen';
import jsonData from '../../../data.json';
import jsonDataCollections from '../../../collections.json';
import { Collection } from '../../types/Collection';
import { CollectionItem } from '../../components/CollectionItem';
import { Skeleton } from '../../components/Skeleton';
// import { getCollections } from '../../api/collections';
// import { getRandomPhotos } from '../../api/photos';

interface PhotoScreenProps {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

export const PhotoScreen: FC<PhotoScreenProps> = memo(
  ({ route, navigation }) => {
    const { photo } = route.params;

    const { loading } = useAppSelector((state) => state.photos);

    const dispatch = useAppDispatch();

    const [recommendedPhotos, setRecommendedPhotos] = useState<Photo[]>([]);
    const [userCollections, setUserCollections] = useState<Collection[]>([]);

    const fetchRecommendedPhotos = useCallback(async () => {
      try {
        dispatch(photosAction.setLoading(true));
        // const getRecommendedPhotos = await getRandomPhotos(
        //   photo.description || photo.alt_description,
        // );
        // const getUserCollections = await getCollections(photo.user.username);

        // setRecommendedPhotos(getRecommendedPhotos);
        // setUserCollections(getUserCollections);

        // eslint-disable-next-line no-magic-numbers
        await wait(1000).then(
          () => (
            setRecommendedPhotos(jsonData as Photo[]),
            setUserCollections(jsonDataCollections as Collection[])
          ),
        );
      } catch (error) {
        if (error instanceof Error) {
          dispatch(photosAction.setError('Error with download photos'));
        }
      } finally {
        dispatch(photosAction.setLoading(false));
      }
    }, []);

    useEffect(() => {
      fetchRecommendedPhotos();
    }, [fetchRecommendedPhotos]);

    const handlePhotoPress = (photo: Photo) => {
      navigation.push('Photo', { photo });
    };

    const memoizedRecoData = useMemo(
      () => recommendedPhotos,
      [recommendedPhotos],
    );

    const memoizedCollectionsData = useMemo(
      () => userCollections,
      [userCollections],
    );

    const renderRecoItem = useCallback(
      ({ item }: { item: Photo }) => (
        <PhotoItem
          photo={item}
          onPress={() => handlePhotoPress(item)}
          isTall={item.width > item.height}
        />
      ),
      [],
    );

    const renderCollectioneItem = useCallback(
      ({ item }: { item: Collection }) => <CollectionItem collection={item} />,
      [],
    );

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

              {photo.user.total_collections !== 0 && (
                <View>
                  <Text style={styles.sectionText}>Collections</Text>

                  {loading ? (
                    <FlatList
                      data={[1, 2, 3, 4, 5, 6]}
                      horizontal
                      renderItem={() => (
                        <Skeleton customWidth={200} height={200} />
                      )}
                      keyExtractor={(_, index) => String(index)}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : (
                    <FlatList
                      data={memoizedCollectionsData}
                      horizontal
                      renderItem={renderCollectioneItem}
                      keyExtractor={(_, index) => String(index)}
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                </View>
              )}

              <Text style={styles.sectionText}>Recommended</Text>
            </>
          )}
          data={memoizedRecoData}
          numColumns={2}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderRecoItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <FlatList
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
  sectionText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
});
