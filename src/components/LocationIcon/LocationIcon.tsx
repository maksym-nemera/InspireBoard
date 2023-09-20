import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface LocationIconProps {
  userLocation: string | null;
}

export const LocationIcon: FC<LocationIconProps> = ({ userLocation }) => (
  <View style={styles.locationIcon}>
    <MaterialIcons
      name={userLocation ? 'location-on' : 'not-listed-location'}
      size={24}
      color='black'
    />
    <Text>{userLocation || 'Not Found'}</Text>
  </View>
);

const styles = StyleSheet.create({
  locationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
});
