import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingScreen } from '../screen/SettingScreen/SettingScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

export const SettingStackScreen: FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FAD0C9',
      },
      headerTintColor: '#6E6E6D',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name='Settings' component={SettingScreen} />
  </Stack.Navigator>
);
