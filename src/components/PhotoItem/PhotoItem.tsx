import { FC, memo } from 'react';
import { Photo } from '../../types/Photo';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

interface PhotoItemProps {
  photo: Photo;
  onPress: () => void;
}

export const PhotoItem: FC<PhotoItemProps> = memo(({ photo, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.photoCard}>
        <Image source={{ uri: photo.urls.small }} style={styles.photoImage} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  photoCard: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#E6CCE6',
    padding: 10,
  },
  photoImage: {
    alignSelf: 'center',
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
});
