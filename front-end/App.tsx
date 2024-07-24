
import { GluestackUIProvider } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { requestUserPermission } from './src/utils/notifications';
import Navigator from './src/navigators/Navigator';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </GluestackUIProvider>
  );
}
export default App;