import React from 'react';
import { Provider } from 'react-redux';
import { AppRouting } from './AppRouting';
import store from './app/store';

export const MainApp = () => {
  return (
    <Provider store={store}>
      <AppRouting />
    </Provider>
  );
};
