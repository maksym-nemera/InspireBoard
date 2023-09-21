import { FC, memo } from 'react';
import { Text, View } from 'react-native';
import { ModalIsNotReady } from '../../components/ModalIsNotReady';

export const SearchScreen: FC = memo(() => {
  return (
    <View>
      <Text>Search</Text>
      <ModalIsNotReady modalText={'Search is not ready right now!'} />
    </View>
  );
});
