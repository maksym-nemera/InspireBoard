import { FC, memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { ModalIsNotReady } from '../../components/ModalIsNotReady';

interface ProfileScreenProps {
  route: RouteProp<RootStackParamList, 'Profile'>;
}

export const ProfileScreen: FC<ProfileScreenProps> = memo(({ route }) => {
  const { user } = route.params;

  return (
    <View>
      {user && (
        <View>
          <Text>{user.id}</Text>
          <Text>{user.first_name}</Text>
          <Text>{user.last_name}</Text>
          <Text>{user.username}</Text>
        </View>
      )}

      <ModalIsNotReady modalText={'Profile is not ready right now!'} />
    </View>
  );
});
