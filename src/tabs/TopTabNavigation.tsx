import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen } from '../stacks/HomeStack';
import { SearchStackScreen } from '../stacks/SearchStack';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const TopTabNavigator: FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name='Menu'
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <MaterialCommunityIcons
            name={focused ? 'home' : 'home-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name='Notification'
      component={SearchStackScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name='search' size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
