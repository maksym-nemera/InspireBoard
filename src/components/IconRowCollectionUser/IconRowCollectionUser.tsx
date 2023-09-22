import { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Collection } from '../../types/Collection';
import { hexToRgb } from '../../utils/utils';

interface IconRowCollectionUserProps {
  collection: Collection;
}

export const IconRowCollectionUser: FC<IconRowCollectionUserProps> = memo(
  ({ collection }) => {
    const coverColor = collection.cover_photo.color;
    const rgbColor = hexToRgb(coverColor);

    return (
      <View
        style={[
          styles.iconCollectionRow,
          {
            backgroundColor: `rgba(${rgbColor}, 0.4)`,
          },
        ]}
      >
        <View style={styles.iconCollectionWithText}>
          <MaterialCommunityIcons
            name='account-heart'
            size={15}
            color='white'
          />

          <Text
            style={[
              styles.iconCollectionText,
              {
                color: 'white',
              },
            ]}
          >
            {collection.cover_photo.likes}
          </Text>
        </View>

        <View style={styles.iconCollectionWithText}>
          <MaterialIcons name='image' size={15} color='white' />

          <Text style={[styles.iconCollectionText, { color: 'white' }]}>
            {collection.total_photos}
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  iconCollectionRow: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'flex-end',
  },
  iconCollectionWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconCollectionText: {
    fontSize: 12,
  },
});
