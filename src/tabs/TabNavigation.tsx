import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen } from '../stacks/HomeStack';
import { SearchStackScreen } from '../stacks/SearchStack';
import { ProfileStackScreen } from '../stacks/ProfileStack';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name='GO Home' component={HomeStackScreen} />
    <Tab.Screen name='GO Search' component={SearchStackScreen} />
    <Tab.Screen name='GO Profile' component={ProfileStackScreen} />
  </Tab.Navigator>
);
