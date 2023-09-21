import { FC, memo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';

interface MenuIconProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const MenuIcon: FC<MenuIconProps> = memo(({ navigation }) => (
  <MaterialCommunityIcons
    name='menu'
    size={24}
    color='black'
    style={{ marginLeft: 24 }}
    onPress={() => {
      navigation.dispatch(DrawerActions.openDrawer());
    }}
  />
));
