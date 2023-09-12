import { FC, memo } from 'react';
import { Photo } from '../../types/Photo';
import { StyleSheet, View, Image, Text } from 'react-native';

interface PhotoItemProps {
  photo: Photo;
}

export const PhotoItem: FC<PhotoItemProps> = memo(({ photo }) => {
  return (
    <View style={styles.photoCard}>
      <Image source={{ uri: photo.urls.small }} style={styles.photoImage} />

      <View style={styles.photoTextContainer}>
        <Text style={styles.photoCreatedBy}>By: {photo.user.name}</Text>

        {photo.description ? (
          <Text>{photo.description}</Text>
        ) : (
          <Text>{photo.alt_description}</Text>
        )}
      </View>
    </View>
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
  photoCreatedBy: {
    marginBottom: 5,
  },
  photoTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(204, 204, 204, 0.5)',
    borderRadius: 10,
    minHeight: 50,
    padding: 5,
  },
});
