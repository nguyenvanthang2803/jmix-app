import {
  Alert,
  AlertText,
  Button,
  ButtonText,
  CloseIcon,
  HStack,
  Input,
  InputField,
  SafeAreaView,
  Text,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useUpdateUserMutation } from '../../services/userService';
import { AlertIcon } from '@gluestack-ui/themed';
import { AlertTriangleIcon, InfoIcon } from 'lucide-react-native';
import { Icon } from '@gluestack-ui/themed';
import { ToastDescription } from '@gluestack-ui/themed';
import { Pressable } from '@gluestack-ui/themed';
import { useAppDispatch } from '../../redux/store';
import React from 'react';
const showToast = (toast: {
  show: any;
  close: any;
  closeAll?: () => void;
  isActive?: (id: any) => boolean;
}) => {
  toast.show({
    placement: 'top',
    duration: 5000,
    render: ({ id }: { id: any }) => {
      const toastId = 'toast-' + id;
      return (
        <Toast bg="$error700" nativeID={toastId} p="$3">
          <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
          <VStack space="xs">
            <ToastTitle color="$textLight50">Account Security Alert</ToastTitle>
            <ToastDescription color="$textLight50">Edit Fail</ToastDescription>
          </VStack>
          <Pressable mt="$1" onPress={() => toast.close(id)}>
            <Icon as={CloseIcon} color="$coolGray50" />
          </Pressable>
        </Toast>
      );
    },
  });
};
export default function EditProfile({
  route,
  navigation,
}: any): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = route.params;
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [editUser, setEditUser] = useState(user)
  const [updateUser, { data: resultEdit, isLoading, isError, isSuccess }] =
    useUpdateUserMutation();
  const toast = useToast();

  const handleSave = async () => {
    try {
      await updateUser(editUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: 'auth/updateUser', payload: { user: editUser } });
      navigation.goBack();
    }
    if (isError) {
      showToast(toast);
    }
  }, [isSuccess, isError])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingLeft: 70,
      }}>
      <VStack h="$1/2" style={styles.container}>
        <VStack mt="$16" style={styles.infoContainer}>
          <Text style={styles.inforLabel} size="sm">
            Email:
          </Text>
          <Input style={styles.infoValue}>
            <InputField
              value={editUser.email}
              onChangeText={text => setEditUser((prevUser: any) => ({ ...prevUser, email: text }))}></InputField>
          </Input>
        </VStack>
        <VStack style={styles.infoContainer}>
          <Text style={styles.inforLabel}> Name</Text>
          <Input style={styles.infoValue}>
            <InputField
              value={editUser.firstName}
              onChangeText={text => setEditUser((prevUser: any) => ({ ...prevUser, firstName: text }))}></InputField>
          </Input>
        </VStack>
        <VStack style={styles.infoContainer}>
          <TouchableOpacity>
            <Text color="#2774ed"> Change pass?</Text>
          </TouchableOpacity>
        </VStack>
        <HStack style={styles.actionContainer}>
          <Button onPress={() => handleSave()} isDisabled={isLoading}>
            <ButtonText>Save</ButtonText>
          </Button>
          <Button>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  container: {
    width: 250,
    justifyContent: 'center',
  },
  actionContainer: {
    justifyContent: 'space-between',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    marginTop: 20,
    justifyContent: 'center',
  },
  inforLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
});
