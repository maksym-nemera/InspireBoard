import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screen/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PhotoScreen } from './screen/PhotoScreen';
import { RootStackParamList } from './types/RootStackParamList';
import { SearchScreen } from './screen/SearchScreen';
import { ProfileScreen } from './screen/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const FooterTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppRouting = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Footer'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen
          name='Photo'
          component={PhotoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Footer' component={FooterTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
