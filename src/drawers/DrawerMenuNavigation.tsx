import { FC, memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from '../tabs/TabNavigation';
import { NavigationTheme } from '../NavigationTheme';

const Drawer = createDrawerNavigator();

export const DrawerMenuNavigation: FC = memo(() => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
        }}
      >
        <Drawer.Screen name='Home' component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
});
