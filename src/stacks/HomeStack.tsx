import { FC } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { HomeScreen } from '../screen/HomeScreen/HomeScreen';
import { PhotoScreen } from '../screen/PhotoScreen/PhotoScreen';
import { ProfileScreen } from '../screen/ProfileScreen/ProfileScreen';

import { NotificationScreen } from '../screen/NotificationScreen/NotificationScreen';
import { MenuIcon } from '../components/MenuIcon';
import { NotificationIcon } from '../components/NotificationIcon';

const Stack = createStackNavigator<RootStackParamList>();

interface HomeStackScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const HomeStackScreen: FC<HomeStackScreenProps> = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FAD0C9',
      },
      headerTintColor: '#6E6E6D',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => <NotificationIcon navigation={navigation} />,
    }}
  >
    <Stack.Screen
      name='Home'
      component={HomeScreen}
      options={{
        headerLeft: () => <MenuIcon navigation={navigation} />,
      }}
    />
    <Stack.Screen name='Photo' component={PhotoScreen} />
    <Stack.Screen name='Profile' component={ProfileScreen} />
    <Stack.Screen name='Notification' component={NotificationScreen} />
  </Stack.Navigator>
);
