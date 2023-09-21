import { FC, memo } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { SearchScreen } from '../screen/SearchScreen/SearchScreen';
import { NotificationIcon } from '../components/NotificationIcon';
import { MenuIcon } from '../components/MenuIcon';

const Stack = createStackNavigator<RootStackParamList>();

interface SearchStackScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const SearchStackScreen: FC<SearchStackScreenProps> = memo(
  ({ navigation }) => (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <MenuIcon navigation={navigation} />,
        headerRight: () => <NotificationIcon navigation={navigation} />,
      }}
    >
      <Stack.Screen name='Search' component={SearchScreen} />
    </Stack.Navigator>
  ),
);
