import { FC, memo } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { SearchScreen } from '../screen/SearchScreen/SearchScreen';
import { NotificationIcon } from '../components/NotificationIcon';
import { MenuIcon } from '../components/MenuIcon';
import { PhotoScreen } from '../screen/PhotoScreen/PhotoScreen';
import { CollectionScreen } from '../screen/CollectionScreen/CollectionScreen';

const Stack = createStackNavigator<RootStackParamList>();

interface SearchStackScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const SearchStackScreen: FC<SearchStackScreenProps> = memo(
  ({ navigation }) => (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <NotificationIcon navigation={navigation} />,
      }}
    >
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerLeft: () => <MenuIcon navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name='Photo'
        component={PhotoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Collection'
        component={CollectionScreen}
        options={({ route }) => ({
          headerTitle: route.params.collectionTitle || 'Collection',
        })}
      />
    </Stack.Navigator>
  ),
);
