import React, { FC } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as counterAction } from '../features/counter/counterSlice';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type CounterScreenProps = {
  route: RouteProp<RootStackParamList, 'Counter'>;
  navigation: StackNavigationProp<RootStackParamList, 'Counter'>;
};

export const CounterScreen: FC<CounterScreenProps> = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  navigation,
}) => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { text } = route.params;

  const increment = () => dispatch(counterAction.increment());
  const decrement = () => dispatch(counterAction.decrement());

  return (
    <View style={styles.container}>
      <Text>Received Text: {text}</Text>
      <Text>Counter: {count}</Text>
      <Button title='Increment' onPress={increment} />
      <Button title='Decrement' onPress={decrement} />
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
