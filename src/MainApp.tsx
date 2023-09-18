import { Provider } from 'react-redux';
import store from './app/store';
import { DrawerNavigation } from './drawers/DrawerNavigation';

export const MainApp = () => {
  return (
    <Provider store={store}>
      <DrawerNavigation />
    </Provider>
  );
};
