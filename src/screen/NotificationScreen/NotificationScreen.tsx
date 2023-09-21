import { FC } from 'react';
import { Text, View } from 'react-native';
import { ModalIsNotReady } from '../../components/ModalIsNotReady';

export const NotificationScreen: FC = () => {
  return (
    <View>
      <Text>Notifications</Text>

      <ModalIsNotReady modalText={'Notification is not ready right now!'} />
    </View>
  );
};
