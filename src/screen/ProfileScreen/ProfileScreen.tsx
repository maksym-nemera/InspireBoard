import { RouteProp } from '@react-navigation/native';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamList';

interface ProfileScreenProps {
  route: RouteProp<RootStackParamList, 'Profile'>;
}

export const ProfileScreen: FC<ProfileScreenProps> = ({ route }) => {
  const { user } = route.params;

  return (
    <View>
      {!user ? (
        <Text>MY Profile</Text>
      ) : (
        <>
          <Text>{user.id}</Text>
          <Text>{user.first_name}</Text>
          <Text>{user.last_name}</Text>
          <Text>{user.username}</Text>
        </>
      )}
    </View>
  );
};
