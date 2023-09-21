import { FC, memo } from 'react';
import { Photo } from '../../types/Photo';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

interface PhotoItemProps {
  photo: Photo;
  onPress: () => void;
  isTall: boolean;
}

export const PhotoItem: FC<PhotoItemProps> = memo(
  ({ photo, onPress, isTall }) => {
    const aspectRatio = photo.width / photo.height;

    const itemStyle = isTall ? styles.tallItem : styles.shortItem;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, itemStyle]}>
        <View style={styles.photoCard}>
          <Image
            source={{
              uri: photo.urls.small,
            }}
            style={[
              styles.photoImage,
              {
                aspectRatio,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tallItem: {
    flex: 2.2,
  },
  shortItem: {
    flex: 1,
  },
  photoCard: {
    // eslint-disable-next-line no-magic-numbers
    flex: 1 / 20,
  },
  photoImage: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});
