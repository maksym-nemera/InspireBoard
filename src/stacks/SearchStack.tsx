import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { SearchScreen } from '../screen/SearchScreen/SearchScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const SearchStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FAD0C9',
      },
      headerTintColor: '#6E6E6D',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name='Search' component={SearchScreen} />
  </Stack.Navigator>
);
