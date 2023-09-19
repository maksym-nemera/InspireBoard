// NavigationTheme.tsx
import { DefaultTheme } from '@react-navigation/native';

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: 'black',
    card: 'yellow',
    text: 'green',
  },
};
