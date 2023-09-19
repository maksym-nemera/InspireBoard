import { Provider } from 'react-redux';
import store from './app/store';
import { DrawerMenuNavigation } from './drawers/DrawerMenuNavigation';

export const MainApp = () => {
  return (
    <Provider store={store}>
      <DrawerMenuNavigation />
    </Provider>
  );
};
