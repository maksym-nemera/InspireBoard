import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Photo } from '../../types/Photo';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

interface IconRowProps {
  photo: Photo;
}

export const IconRow: FC<IconRowProps> = ({ photo }) => (
  <View style={styles.iconRow}>
    <View style={styles.iconWithText}>
      <MaterialCommunityIcons name='account-heart' size={24} color='black' />

      <Text>{photo.user.total_likes}</Text>
    </View>

    <View style={styles.iconWithText}>
      <MaterialIcons name='image' size={24} color='black' />

      <Text>{photo.user.total_photos}</Text>
    </View>

    <View style={styles.iconWithText}>
      <MaterialIcons name='collections' size={24} color='black' />

      <Text>{photo.user.total_collections}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 5,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
});
