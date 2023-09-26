import { FC, memo, useMemo } from 'react';
import { Photo } from '../../types/Photo';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

interface PhotoItemProps {
  photo: Photo;
  onPress: () => void;
  isTall: boolean;
}

export const PhotoItem: FC<PhotoItemProps> = memo(
  ({ photo, onPress, isTall }) => {
    const aspectRatio = useMemo(() => {
      return photo.width / photo.height;
    }, [photo.width, photo.height]);

    const itemStyle = useMemo(() => {
      return isTall ? styles.tallItem : styles.shortItem;
    }, []);

    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, itemStyle]}>
        <View>
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
    marginVertical: 2,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  tallItem: {
    flex: 1,
  },
  shortItem: {
    flex: 1 / 2,
  },
  photoImage: {
    borderRadius: 5,
  },
});
