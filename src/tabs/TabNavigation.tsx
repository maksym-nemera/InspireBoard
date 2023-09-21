import { FC, memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen } from '../stacks/HomeStack';
import { SearchStackScreen } from '../stacks/SearchStack';
import { ProfileStackScreen } from '../stacks/ProfileStack';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const TabNavigator: FC = memo(() => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name='GO Home'
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
      name='GO Search'
      component={SearchStackScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name='search' size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='GO Profile'
      component={ProfileStackScreen}
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <MaterialIcons
            name={focused ? 'person' : 'person-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
));
