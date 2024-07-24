import { ModalCloseButton } from "@gluestack-ui/config/build/theme";
import { CloseIcon, HStack, Heading, Input, InputField, Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader, Text, VStack } from "@gluestack-ui/themed";
import { Icon } from "lucide-react-native";
import { ItemTaskType } from "../../../models/ItemTask";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { getFormattedDate } from "../../../utils/auth-utils";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { useUpdateTaskMutation } from "../../../services/taskService";
import { cleanEntity } from "../../../utils/app-utils";
import { getFormattedDateFromServer, getFormattedDatetoServer } from "../../../utils/date-utils";
import { EntityAttrPermissionValue } from "../../../utils/jmix/model";
export interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemSelected: ItemTaskType;
    updateTaskItem: (itemUpdate: ItemTaskType) => void
    permission: { [x: string]: EntityAttrPermissionValue; }[]
    itemLoop: any;
}
export default function EditTaskModal({ isOpen, onClose, itemSelected, updateTaskItem, permission, itemLoop }: EditTaskModalProps) {
    const [item, setItem] = useState(itemSelected)
    const [date, setDate] = useState(new Date())
    const [dateFormate, setDateFormat] = useState(item.completedAt)
    const [open, setOpen] = useState(false)
    const [updateTask, { data: UpdateSucces, isLoading, isSuccess }] = useUpdateTaskMutation()
    const handleFormatDate = (date: any) => {
        setDate(date);
        setDateFormat(getFormattedDate(date))
        setItem(prevItem => ({ ...prevItem, completedAt: getFormattedDatetoServer(date) }))

    }
    useEffect(() => {

        if (UpdateSucces != undefined) {
            updateTaskItem(item);
            onClose();
        }
    }, [UpdateSucces])
    function handleSave() {
        updateTask(cleanEntity(item))
    }
    if (isLoading) return <ActivityIndicator size="large" />;
    //RenderItemPermisssion
    const checkPermissionEdit = (key: string, permissions: any[]) => {
        const permissionObj = permissions.find((perm: { [x: string]: undefined; }) => perm[key] !== undefined);
        return permissionObj ? permissionObj[key] === 'MODIFY' : false;
    };
    const checkPermissionView = (key: string, permissions: any[]) => {
        const permissionObj = permissions.find((perm: { [x: string]: undefined; }) => perm[key] !== undefined);
        return permissionObj ? permissionObj[key] === 'VIEW' : false;
    };
    const renderFields = (item: ItemTaskType, permissions: { [x: string]: EntityAttrPermissionValue; }[], itemLoop: any) => {
        return Object.keys(itemLoop).map(key => {
            if (key === '_entityName' || key === '_instanceName' || key === 'version') {
                return null; // Skip these keys if they are not needed to be rendered
            }

            const hasPermissionEdit = checkPermissionEdit(key, permissions);
            const hasPermissionView = checkPermissionView(key, permissions);
            const value = item[key];
            return (
                <VStack key={key}>
                    <Text>{key}: </Text>
                    {
                        hasPermissionEdit ?
                            <Input style={styles.inputfield}>
                                <InputField value={value} onChangeText={text => setItem(prevItem => ({ ...prevItem, [key]: text }))} />
                            </Input>
                            :
                            hasPermissionView ?
                                <Input isDisabled={true} style={styles.inputfield}>
                                    <InputField value={value} />
                                </Input>
                                :
                                <Input isDisabled={true} style={styles.inputfield}>
                                    <InputField value="khong co quyen xem" />
                                </Input>
                    }
                </VStack>
            );
        });
    };



    //RenderMain
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading>Edit Task</Heading>
                </ModalHeader>
                <ModalBody>
                    {renderFields(item, permission, itemLoop)}
                    <HStack style={styles.datePick}>
                        <Text>CompletedAt: </Text>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <Text color='#274be5' >{getFormattedDateFromServer(dateFormate)}</Text>
                        </TouchableOpacity>

                        <DatePicker mode="date" modal open={open} date={date}
                            onConfirm={(date) => {
                                handleFormatDate(date)
                                setOpen(false);
                            }}
                            onCancel={() => { setOpen(false) }}
                            minimumDate={new Date()}
                        />
                    </HStack>
                    <HStack style={styles.datePick}>
                        <Button mt="$4" onPress={handleSave}>
                            <ButtonText>Save</ButtonText>
                        </Button>
                        <Button mt="$4" onPress={onClose} >
                            <ButtonText>Close</ButtonText>
                        </Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal >
    )

}
const styles = StyleSheet.create({
    containerBody: { paddingBottom: 30, paddingTop: 30 },
    datePick: { justifyContent: 'space-between', marginTop: 5 },
    inputfield: {
        marginVertical: 5,
    }
}) 