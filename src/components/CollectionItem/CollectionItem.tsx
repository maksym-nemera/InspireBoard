import { FC, memo } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native';
import { Collection } from '../../types/Collection';
import { IconRowCollectionUser } from '../IconRowCollectionUser';
import { hexToRgb } from '../../utils/utils';

interface CollectionItemProps {
  collection: Collection;
  onPress: () => void;
}

export const CollectionItem: FC<CollectionItemProps> = memo(
  ({ collection, onPress }) => {
    const coverColor = collection.cover_photo.color;
    const rgbColor = hexToRgb(coverColor);

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.collectionCard}>
          <Image
            source={{
              uri: collection.cover_photo.urls.regular,
            }}
            style={styles.collectionImage}
          />

          <View style={styles.iconRowContainer}>
            <IconRowCollectionUser collection={collection} />
          </View>

          <View
            style={[
              styles.collectionTitleContainer,
              {
                backgroundColor: `rgba(${rgbColor}, 0.3)`,
              },
            ]}
          >
            <Text style={[styles.collectionTitle]}>{collection.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  collectionCard: {
    position: 'relative',
  },
  iconRowContainer: {
    position: 'absolute',
    width: '100%',
  },
  collectionTitleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 3,
  },
  collectionTitle: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  collectionImage: {
    width: 200,
    height: 200,
  },
});
