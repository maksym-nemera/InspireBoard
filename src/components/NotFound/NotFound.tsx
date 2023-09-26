import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const NotFound: FC = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name='search-off'
        size={250}
        color='black'
        style={styles.icon}
      />
      <Text style={styles.text}>Result Not Found!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
    position: 'relative',
    bottom: 50,
  },
  icon: {
    position: 'relative',
    bottom: 50,
  },
});
