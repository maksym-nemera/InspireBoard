import { FC } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { User } from '../types/Photo';
import { ProfileScreen } from '../screen/ProfileScreen/ProfileScreen';
import { MenuIcon } from '../components/MenuIcon';
import { NotificationIcon } from '../components/NotificationIcon';

const Stack = createStackNavigator<RootStackParamList>();

interface ProfileStackScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const ProfileStackScreen: FC<ProfileStackScreenProps> = ({
  navigation,
}) => {
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
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <MenuIcon navigation={navigation} />,
        headerRight: () => <NotificationIcon navigation={navigation} />,
      }}
    >
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        initialParams={{ user }}
      />
    </Stack.Navigator>
  );
};
