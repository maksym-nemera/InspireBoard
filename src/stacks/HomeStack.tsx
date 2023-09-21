import { FC, memo } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { HomeScreen } from '../screen/HomeScreen/HomeScreen';
import { PhotoScreen } from '../screen/PhotoScreen/PhotoScreen';
import { ProfileScreen } from '../screen/ProfileScreen/ProfileScreen';
import { NotificationScreen } from '../screen/NotificationScreen/NotificationScreen';
import { NotificationIcon } from '../components/NotificationIcon';
import { MenuIcon } from '../components/MenuIcon';

const Stack = createStackNavigator<RootStackParamList>();

interface HomeStackScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const HomeStackScreen: FC<HomeStackScreenProps> = memo(
  ({ navigation }) => (
    <Stack.Navigator
      screenOptions={{
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
      <Stack.Screen
        name='Photo'
        component={PhotoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Notification' component={NotificationScreen} />
    </Stack.Navigator>
  ),
);
