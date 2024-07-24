import { Box, Center, FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, HStack, Heading, InputIcon, Link, LinkText, View } from '@gluestack-ui/themed';
import {
  Button,
  ButtonText,
  Image,
  Input,
  InputField,
  InputSlot,
  SafeAreaView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useGetTokenMutation } from '../../services/authService';
import { decodeToken, encodeFormData } from '../../utils/auth-utils';
import { useLazyGetPermissionQuery, useLazyGetUserQuery } from '../../services/userService';
import { User, filterUserFields } from '../../models/User';
import { useAppDispatch } from '../../redux/store';
import React from "react";
import { configApi } from '../../services/configApi';

const LoginScreen = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMutation, { isSuccess: loginSuccess }] = useGetTokenMutation();
  const [loadUser, { data: user, isSuccess: UserSuccess }] = useLazyGetUserQuery();
  const [loadPermission, { data: permission }] = useLazyGetPermissionQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const converuser: User = filterUserFields(user);
      dispatch({
        type: 'auth/login', payload: { user: converuser }
      });
    }

  }, [user])

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const handleLogin = async () => {
    const formData = {
      username: email,
      password: password,
      grant_type: 'password',
      client_id: 'portal-app',
      client_secret: 'Qs4EhtFx00jv4NFOKAbi9m7NytspjFyf',
    };
    try {
      const result = await loginMutation(encodeFormData(formData));
      const resultWithData = result as { data: any };
      if (resultWithData.data) {
        if (
          resultWithData.data.access_token &&
          resultWithData.data.refresh_token
        ) {
          await loadUser(decodeToken(resultWithData.data.access_token),);
          await loadPermission();
          dispatch(configApi.util.resetApiState());
        }
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng nhập:', error);
    }
  };
  useEffect(() => { console.log(permission) }, [permission])
  return (
    <SafeAreaView flex={1} bg="#fff" alignItems='center' justifyContent='center'>
      <VStack>
        <Image
          size="xl"
          alt="Logo image"
          rounded="$full"
          marginBottom={40}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png',
          }}></Image>
      </VStack  >
      <VStack>
        <Input bg='#FFC0CB' w="70%" h={45} marginBottom={20} alignItems='center' rounded={30}>
          <InputField
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.TextInput}
            placeholder="Username."
            placeholderTextColor="#003f5c"
          />
        </Input>
        <Input bg='#FFC0CB' w="70%" h={45} marginBottom={20} alignItems='center' rounded={30}>
          <InputField
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            type={showPassword ? 'text' : 'password'}
          />
          <InputSlot pr="$3" onPress={handleState}>
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color="$darkBlue500"
            />
          </InputSlot>
        </Input>
        <TouchableOpacity style={styles.forgot_button}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </VStack>

      <Button w="70%" rounded={25} h={50} alignItems='center' justifyContent='center' marginTop={40} bg='#FF1493' onPress={() => handleLogin()}>
        <ButtonText>LOGIN</ButtonText>
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    alignItems: 'center',
  },
});

export default LoginScreen;
