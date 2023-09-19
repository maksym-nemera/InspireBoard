import { FC, memo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PhotoItem } from '../PhotoItem';
import { Photo } from '../../types/Photo';

interface PhotoListProps {
  photos: Photo[];
  onRefresh: () => void;
  onItemPress: (photo: Photo) => void;
  isRefreshing: boolean;
}

export const PhotoList: FC<PhotoListProps> = memo(
  ({ photos, onRefresh, onItemPress, isRefreshing }) => {
    return (
      <FlatList
        data={photos}
        numColumns={2}
        keyExtractor={(photo) => photo.id}
        renderItem={({ item }) => (
          <PhotoItem
            photo={item}
            onPress={() => onItemPress(item)}
            isTall={item.width > item.height}
          />
        )}
        // onEndReached={handleEndReached}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    );
  },
);
