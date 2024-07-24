import { Card, HStack, Input, InputField, SafeAreaView, ScrollView, Select, SelectDragIndicator, SelectIcon, SelectInput, SelectItem, SelectPortal, Text, Textarea, TextareaInput, VStack } from "@gluestack-ui/themed";
import { ChevronDownIcon, Icon } from "lucide-react-native";
import { ItemTaskType } from "../../../models/ItemTask";
import { useState } from "react";
import { StyleSheet, } from "react-native";
import { getFormattedDate } from "../../../utils/auth-utils";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { useLoadManagerQuery, useUpdateTaskMutation } from "../../../services/taskService";
import { getFormattedDatetoServer } from "../../../utils/date-utils";
import { EntityAttrPermissionValue, PermissionUser } from "../../../utils/jmix/model";
import { useAppSelector } from "../../../redux/store";
import { hasAnyAuthority } from "../../../utils/jmix/security";
import { AUTHORITIES, STATUS } from "../../../config/constants";
import { SelectTrigger } from "@gluestack-ui/themed";
import { SelectBackdrop } from "@gluestack-ui/themed";
import { SelectContent } from "@gluestack-ui/themed";
import { SelectDragIndicatorWrapper } from "@gluestack-ui/themed";
export interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemSelected: ItemTaskType;
    updateTaskItem: (itemUpdate: ItemTaskType) => void
    permission: { [x: string]: EntityAttrPermissionValue; }[]
    itemLoop: any;
}
export default function EditTaskScreen({ route, navigation, }: any) {
    const { item, permission, itemLoop } = route.params;
    const { permission: permissionUser }: { permission: PermissionUser | null } = useAppSelector(state => state.auth);
    const { manager } = useLoadManagerQuery();
    const [assignee, setAssignee] = useState();

    const [itemSelected, setItem] = useState(item)
    const [date, setDate] = useState(new Date())
    const [dateFormate, setDateFormat] = useState(item.completedAt)
    const [updateTask, { data: UpdateSucces, isLoading, isSuccess }] = useUpdateTaskMutation()
    const handleFormatDate = (date: any) => {
        setDate(date);
        setDateFormat(getFormattedDate(date))
        setItem((prevItem: any) => ({ ...prevItem, completedAt: getFormattedDatetoServer(date) }))

    }
    // useEffect(() => {

    //     if (UpdateSucces != undefined) {
    //         updateTaskItem(item);
    //         onClose();
    //     }
    // }, [UpdateSucces])
    // function handleSave() {
    //     updateTask(cleanEntity(item))
    // }
    // if (isLoading) return <ActivityIndicator size="large" />;
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
                    <Text fontSize="$lg" fontWeight="$bold">{key} </Text>
                    {
                        hasPermissionEdit ?
                            <Input isInvalid={true} variant="underlined" style={styles.inputfield}>
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

    function handleSubmit() {

    }

    //RenderMain
    return (
        <SafeAreaView padding={30}>
            <Card>
                <ScrollView>
                    {renderFields(itemSelected, permission, itemLoop)}
                    {hasAnyAuthority(permissionUser?.authorities, [AUTHORITIES.COMPANY_EMPLOYEE]) ?
                        <>
                            <Select onValueChange={assig => setAssignee(assig)}>
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Select option" />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        {manager.array.forEach((element: string) => <SelectItem label={element} value={element} />)}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                            <HStack mt="$5" justifyContent="space-between">
                                <Button isDisabled={itemSelected.status == STATUS.PENDING || itemSelected == STATUS.APPROVAL} bg="#f25d5d" onPress={handleSubmit}>
                                    <ButtonText>Submit</ButtonText>
                                </Button>
                            </HStack>
                        </>
                        : null
                    }

                    {hasAnyAuthority(permissionUser?.authorities, [AUTHORITIES.COMPANY_MANAGER]) ?
                        <>
                            <Button bg="$green400">
                                <ButtonText>Approval</ButtonText>
                            </Button>
                            <Button bg="$red400">
                                <ButtonText >Reject</ButtonText>
                            </Button>
                            <Button bg="$amber400">
                                <ButtonText>Make Again</ButtonText>
                            </Button>
                        </>
                        : null
                    }
                    <HStack mt="$5" justifyContent="space-between">
                        <Button>
                            <ButtonText>Save</ButtonText>
                        </Button>
                        <Button>
                            <ButtonText>Close</ButtonText>
                        </Button>
                    </HStack>
                </ScrollView>
            </Card>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    containerBody: { paddingBottom: 30, paddingTop: 30 },
    datePick: { justifyContent: 'space-between', marginTop: 5 },
    inputfield: {
        marginVertical: 5,
    }
}) 