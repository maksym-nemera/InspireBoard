import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { PhotoItem } from '../../components/PhotoItem';
import { Skeleton } from '../../components/Skeleton';
import { Photo } from '../../types/Photo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { wait } from '../HomeScreen/HomeScreen';
import { actions as photosAction } from '../../features/photos/photosSlice';
import jsonData from '../../../collectionsPhotos.json';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCollectionPhotos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRelatedCollections,
} from '../../api/collections';
import { CollectionItem } from '../../components/CollectionItem';
import { Collection } from '../../types/Collection';
import jsonDataCollections from '../../../collections.json';

interface CollectionScreenProps {
  route: RouteProp<RootStackParamList, 'Collection'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

export const CollectionScreen: FC<CollectionScreenProps> = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { collection } = route.params;
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.photos);

  const [collectionPhotos, setCollectionPhotos] = useState<Photo[]>([]);
  const [recommendedCollections, setRecommendedCollections] = useState<
    Collection[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCollectionPhotos = useCallback(async () => {
    try {
      dispatch(photosAction.setLoading(true));
      // const photos = await getCollectionPhotos(collection.id, currentPage);
      // const relatedCollections = await getRelatedCollections(collection.id);
      // setCollectionPhotos([]);
      // setRecommendedCollections([]);
      // setCollectionPhotos(photos);
      // setRecommendedCollections(relatedCollections);
      // eslint-disable-next-line no-magic-numbers
      await wait(1000).then(
        () => (
          setCollectionPhotos(jsonData as Photo[]),
          setRecommendedCollections(jsonDataCollections as Collection[])
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(photosAction.setError('Error with download photos'));
      }

      dispatch(photosAction.setLoading(false));
    } finally {
      dispatch(photosAction.setLoading(false));
    }
  }, []);

  useEffect(() => {
    fetchCollectionPhotos();
  }, []);

  const handlePhotoPress = (photo: Photo) => {
    navigation.push('Photo', { photo });
  };

  // const handleLoadMore = async () => {
  //   setCurrentPage(currentPage + 1);

  //   const result = await getCollectionPhotos(collection.id, currentPage);

  //   setCollectionPhotos((prevState) => {
  //     const uniquePhotos = result.filter(
  //       (newPhoto) =>
  //         !prevState.some((prevPhoto) => prevPhoto.id === newPhoto.id),
  //     );

  //     return [...prevState, ...uniquePhotos];
  //   });
  // };

  const handleCollectionPress = (collection: Collection) => {
    navigation.push('Collection', {
      collection,
      collectionTitle: collection.title,
    });
  };

  const memoizedCollectionsData = useMemo(
    () => recommendedCollections,
    [recommendedCollections],
  );

  const renderCollectioneItem = useCallback(
    ({ item }: { item: Collection }) => (
      <CollectionItem
        collection={item}
        onPress={() => handleCollectionPress(item)}
      />
    ),
    [],
  );

  return (
    <FlatList
      data={collectionPhotos}
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
      ListFooterComponent={() => (
        <View>
          <Text style={styles.sectionText}>Recommended Collections</Text>

          {loading ? (
            <FlatList
              // eslint-disable-next-line no-magic-numbers
              data={[1, 2, 3, 4, 5, 6]}
              horizontal
              renderItem={() => <Skeleton customWidth={200} height={200} />}
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
    />
  );
};

const styles = StyleSheet.create({
  sectionText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
});
