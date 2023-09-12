import React from 'react';
import { HomeScreen } from './screen/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CounterScreen } from './screen/CounterScreen';
import { RootStackParamList } from './types/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

export const AppRouting = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Counter' component={CounterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
