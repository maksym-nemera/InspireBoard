import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { TabNavigator } from '../tabs/TabNavigation';

const Drawer = createDrawerNavigator();

export const DrawerNavigation: FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name='Tabs' component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
