'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import configureStore from './app/stores/configureStore';
import AppWithNavigationState from './app/screens';
const store = configureStore();

Text.defaultProps.allowFontScaling = false;

const App = () => {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
};
export default App;
