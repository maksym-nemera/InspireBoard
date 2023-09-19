import { FC } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';

interface NotificationIconProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const NotificationIcon: FC<NotificationIconProps> = ({ navigation }) => {
  return (
    <MaterialIcons
      name='notifications-none'
      size={24}
      color='black'
      style={{ marginRight: 24 }}
      onPress={() => {
        navigation.navigate('Notification');
      }}
    />
  );
};
