import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import NavigationBottom from './NavigationBottom';
import EditProfile from '../screens/ProfileScreen/EditProfile';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import React from "react";

import { useEffect } from 'react';
import CreateTaskScreen from '../screens/TaskScreen/CreateTaskModal';
import { useAppSelector } from '../redux/store';
import EditTaskScreen from '../screens/TaskScreen/ItemTask/EditTaskScreen';
import { NotificationsListener, requestUserPermission } from '../utils/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUpdateDeviceMutation } from '../services/userService';
import { UserDevice } from '../models/UserDevice';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export default function Navigator() {
  const { isAuthenticated, user, accessToken } = useAppSelector(state => state.auth);
  const [updateDevice] = useUpdateDeviceMutation()
  useEffect(() => {
    if (isAuthenticated) {
      requestUserPermission().then(async fcmToken => {
        console.log(fcmToken);
        await updateDevice({ username: user?.username, deviceToken: fcmToken } as UserDevice);
      });
      NotificationsListener();
      // console.log(fcmToken);
      // updateDevice(fcmToken);
    }

  }, [isAuthenticated])
  return (
    <>
      {/* <NotificationsListener /> */}

      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator

          initialRouteName={isAuthenticated ? 'NavigationBottom' : 'LoginScreen'}>
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="NavigationBottom"
                component={NavigationBottom}
                options={{
                  animation: 'slide_from_bottom',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AppNavigator"
                component={AppNavigator}
                options={{
                  animation: 'slide_from_bottom',
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ animation: 'slide_from_bottom', headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
