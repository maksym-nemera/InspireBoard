import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screen/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PhotoScreen } from './screen/PhotoScreen';
import { RootStackParamList } from './types/RootStackParamList';
import { SearchScreen } from './screen/SearchScreen';
import { ProfileScreen } from './screen/ProfileScreen';
import { User } from './types/Photo';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name='Home' component={HomeScreen} />
    <Stack.Screen name='Photo' component={PhotoScreen} />
    <Stack.Screen name='Profile' component={ProfileScreen} />
  </Stack.Navigator>
);

const SearchStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name='Search' component={SearchScreen} />
  </Stack.Navigator>
);

const ProfileStackScreen = () => {
  const user: User = {
    id: '1',
    updated_at: '2023-09-18T12:00:00Z',
    username: 'john_doe',
    name: 'John Doe',
    first_name: 'John',
    last_name: 'Doe',
    twitter_username: 'john_doe_twitter',
    portfolio_url: 'https://portfolio.johndoe.com',
    bio: 'Web Developer',
    location: 'New York, USA',
    links: {
      self: 'https://johndoe.com',
      html: 'https://johndoe.com/profile',
      photos: 'https://johndoe.com/photos',
      likes: 'https://johndoe.com/likes',
      portfolio: 'https://portfolio.johndoe.com',
      following: 'https://johndoe.com/following',
      followers: 'https://johndoe.com/followers',
    },
    profile_image: {
      small: 'https://johndoe.com/profile_small.jpg',
      medium: 'https://johndoe.com/profile_medium.jpg',
      large: 'https://johndoe.com/profile_large.jpg',
    },
    instagram_username: 'john_doe_instagram',
    total_collections: 10,
    total_likes: 100,
    total_photos: 50,
    accepted_tos: true,
    for_hire: true,
    social: {
      instagram_username: 'john_doe_instagram',
      portfolio_url: 'https://portfolio.johndoe.com',
      twitter_username: 'john_doe_twitter',
      paypal_email: 'john.doe@example.com',
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        initialParams={{ user }}
      />
    </Stack.Navigator>
  );
};

export const AppRouting = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='GO Home' component={HomeStackScreen} />
        <Tab.Screen name='GO Search' component={SearchStackScreen} />
        <Tab.Screen name='GO Profile' component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
