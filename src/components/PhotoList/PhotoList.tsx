import React from 'react';
import { FlatList } from 'react-native';
import { PhotoItem } from '../PhotoItem';
import { Photo } from '../../types/Photo';
import { useAppSelector } from '../../app/hooks';

interface PhotoListProps {
  onRefresh: () => void;
  onItemPress: (photo: Photo) => void;
}

export const PhotoList: React.FC<PhotoListProps> = ({
  onRefresh,
  onItemPress,
}) => {
  const { photos, isRefreshing } = useAppSelector((state) => state.photos);

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
      onEndReachedThreshold={0.8}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
};
