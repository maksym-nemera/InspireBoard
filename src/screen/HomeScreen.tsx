import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';

type HomeScreenProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const HomeScreen: FC<HomeScreenProps> = ({ route, navigation }) => {
  const goToCounterScreen = () => {
    navigation.navigate('Counter', { text: 'hello world!' });
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title='Go to Counter Screen' onPress={goToCounterScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
