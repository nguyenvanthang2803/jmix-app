import {
  AddIcon,
  Button,
  FormControl,
  FormControlHelperText,
  HStack,
  Input,
  InputField,
  Modal,
  useToast,
} from '@gluestack-ui/themed';
import { Fab } from '@gluestack-ui/themed';
import { ModalContent } from '@gluestack-ui/themed';
import { VStack } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { FormControlLabelText } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';
import { FormControlLabel } from '@gluestack-ui/themed';
import { Heading } from '@gluestack-ui/themed';
import { ModalBody } from '@gluestack-ui/themed';
import { ModalBackdrop } from '@gluestack-ui/themed';
import { FabLabel } from '@gluestack-ui/themed';
import { FabIcon } from '@gluestack-ui/themed';
import { SafeAreaView } from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { getFormattedDatetoServer } from '../../utils/date-utils';
import { TaskRequest } from '../../models/Task';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useLazyCreateTaskQuery } from '../../services/taskService';
import { Toast } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { AlertTriangleIcon } from 'lucide-react-native';
import { ToastDescription } from '@gluestack-ui/themed';
import { Pressable } from '@gluestack-ui/themed';
import { CloseIcon } from '@gluestack-ui/themed';
import { getFormattedDate } from '../../utils/auth-utils';
import { ItemTaskType } from '../../models/ItemTask';
interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  addListTask: (itemTask: ItemTaskType | undefined) => void;
}
const showToast = (toast, status) => {
  (toast: {
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
          <>
            {
              status == 0 ?
                <Toast bg="$success700" nativeID={toastId} p="$3" >
                  <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                  <VStack space="xs">
                    <ToastDescription color="$textLight50">Create Successfully</ToastDescription>
                  </VStack>
                  <Pressable mt="$1" onPress={() => toast.close(id)}>
                    <Icon as={CloseIcon} color="$coolGray50" />
                  </Pressable>
                </Toast >
                :
                <Toast bg="$red700" nativeID={toastId} p="$3" >
                  <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                  <VStack space="xs">
                    <ToastDescription color="$textLight50">Create Fail</ToastDescription>
                  </VStack>
                  <Pressable mt="$1" onPress={() => toast.close(id)}>
                    <Icon as={CloseIcon} color="$coolGray50" />
                  </Pressable>
                </Toast >
            }
          </>
        );
      },
    });
  }
};
export default function CreateTaskModal({ isOpen, onClose, addListTask }: CreateTaskModalProps) {
  const { user } = useAppSelector(state => state.auth);
  const [createTask, { isLoading, isSuccess }] = useLazyCreateTaskQuery();
  const toast = useToast();
  const [itemTask, setItemTask] = useState<ItemTaskType>();
  const handleSave = async () => {
    try {
      const newTask: ItemTaskType = {
        name: "",
        id: '',
        status: '',
        note: '',
        review: '',
        type: '',
        completedAt: '',
        createdAt: ''
      }
      setItemTask(newTask);
      const result = await createTask();
      newTask.id = result?.id;
      addListTask(newTask);
      showToast(toast, 0);

      onClose()
    } catch (error) {
      console.log(error)
      showToast(toast, 1);
    }
  }

  // useEffect(() => {
  //   if (isSuccess) {
  //     showToast(toast);
  //     addListTask(itemTask);
  //   }
  // }, [isSuccess, data, date])
  return (
    <Modal focusable={true} isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent maxWidth="$96">
        <ModalBody style={styles.containerBody}  >
          <Heading>Create Task</Heading>
          {/* <VStack py="$2" space="xl">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Enter Task's Name"
                  value={taskName}
                  onChangeText={(text) => setTaskName(text)} />
              </Input>
              <FormControlHelperText color="#ff0000">
                Must enter task name
              </FormControlHelperText>
            </FormControl>
            <FormControl>

              <HStack style={styles.bottom} >
                <FormControlLabel>
                  <FormControlLabelText>CompletedAt</FormControlLabelText>
                </FormControlLabel>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Text color='#274be5' >{getFormattedDate(date)}</Text>
                </TouchableOpacity>

                <DatePicker mode="datetime" modal open={open} date={date}
                  onConfirm={(date) => { setOpen(false); setDate(date) }}
                  onCancel={() => { setOpen(false) }}
                  minimumDate={new Date()}

                />
              </HStack>

            </FormControl>
          </VStack> */}
          <Text>Do you want create new task?</Text>
          <HStack style={styles.bottom} >
            <Button mt="$4" onPress={handleSave} isDisabled={isLoading}>
              <ButtonText>Save</ButtonText>
            </Button>
            <Button mt="$4" onPress={onClose}>
              <ButtonText>Close</ButtonText>
            </Button>
          </HStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
const styles = StyleSheet.create({
  containerBody: { paddingBottom: 30, paddingTop: 30 },
  bottom: { justifyContent: 'space-between' },
}) 
