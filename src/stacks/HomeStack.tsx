import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { HomeScreen } from '../screen/HomeScreen/HomeScreen';
import { PhotoScreen } from '../screen/PhotoScreen/PhotoScreen';
import { ProfileScreen } from '../screen/ProfileScreen/ProfileScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { FC } from 'react';
import { NotificationScreen } from '../screen/NotificationScreen/NotificationScreen';
import { DrawerActions } from '@react-navigation/native';

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
    }}
  >
    <Stack.Screen
      name='Home'
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <MaterialIcons
            name='menu'
            size={24}
            color='black'
            style={{ marginLeft: 24 }}
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          />
        ),
        headerRight: () => (
          <MaterialIcons
            name='notifications'
            size={24}
            color='black'
            style={{ marginRight: 24 }}
            onPress={() => {
              navigation.navigate('Notification');
            }}
          />
        ),
      }}
    />
    <Stack.Screen name='Photo' component={PhotoScreen} />
    <Stack.Screen name='Profile' component={ProfileScreen} />
    <Stack.Screen name='Notification' component={NotificationScreen} />
  </Stack.Navigator>
);
