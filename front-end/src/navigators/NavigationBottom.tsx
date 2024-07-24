import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import TaskScreen from '../screens/TaskScreen/TaskScreen';
import { AddIcon, Button, Icon } from '@gluestack-ui/themed';
import { HomeIcon, LogOut, NotebookPen, User } from 'lucide-react-native';
import React from "react";
import { ButtonIcon } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useLogoutMutation } from '../services/authService';
import { encodeFormData } from '../utils/auth-utils';
import { configApi } from '../services/configApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDeleteDeviceMutation } from '../services/userService';
import { UserDevice } from '../models/UserDevice';
import { Notifi } from '../screens/NotifcationScreen/Notifi';

const Tab = createBottomTabNavigator();
export default function NavigationBottom() {
  const [logout] = useLogoutMutation();
  const { refreshToken } = useAppSelector(state => state.auth)
  const { user } = useAppSelector(state => state.auth)
  const [deleteDevice] = useDeleteDeviceMutation();
  const formData = {
    refresh_token: refreshToken,
    client_id: 'portal-app',
    client_secret: '2GrwBZHfQHF6qk6v0h1fKGHpS3SXcBeC',
  };


  const handleLogout = async () => {
    AsyncStorage.getItem("fcmtoken").then(fcmtoken => {
      deleteDevice({ username: user?.username, deviceToken: fcmtoken } as UserDevice)
    })
    await logout(encodeFormData(formData));
    dispatch({ type: 'auth/logout' })
  }
  const dispatch = useAppDispatch();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#2b82ea',
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#F14506',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'rgba(225,225,225,0.2)',
        },


      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon as={HomeIcon} color={color} />,
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => <Icon as={NotebookPen} color={color} />,
          headerRight: () => <Notifi navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon as={User} color={color} />,
          headerRight: () => (
            <Button
              size="md"
              variant="link"
              isDisabled={false}
              isFocusVisible={false}
              onPress={handleLogout}
            >
              <ButtonIcon style={styles.profileContainer} as={LogOut} />
            </Button>
          )
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  profileContainer: {
    marginRight: 10,
    padding: 15
  }
})
