import { FC } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Loader: FC = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size='large' color='white' />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
