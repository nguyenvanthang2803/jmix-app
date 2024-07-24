import { StyleSheet, TouchableOpacity } from "react-native";
import { ItemTaskType, StatusEnum } from "../../../models/ItemTask";
import { Button, ButtonIcon, Card, Heading, CircleIcon, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import { EditIcon, TrashIcon } from "lucide-react-native";
import { EntityAttrPermissionValue } from "../../../utils/jmix/model";
import { Screen } from "react-native-screens";

export interface ItemTaskProps {
    item: ItemTaskType
    onSelected: (item: ItemTaskType, type: string) => void;
    permission: { [x: string]: EntityAttrPermissionValue; }[]
    itemLoop: any;
    navigation: any;
}

const renderStatusIcon = (status: String) => {
    switch (status) {
        case StatusEnum.PENDING:
            return <Icon as={CircleIcon} m="$2" w="$2" h="$2" color="yellow" />;
        case StatusEnum.STARTING:
            return <Icon as={CircleIcon} m="$2" w="$2" h="$2" color="green" />;
        case StatusEnum.COMPLETED:
            return <Icon as={CircleIcon} m="$2" w="$2" h="$2" color="blue" />;
        default:
            return <Icon as={CircleIcon} m="$2" w="$2" h="$2" color="red" />;
    }
};


const checkPermission = (key: string, permissions: any[]) => {
    const permissionObj = permissions.find((perm: { [x: string]: undefined; }) => perm[key] !== undefined);
    return permissionObj ? permissionObj[key] === 'MODIFY' || permissionObj[key] === 'VIEW' : false;
};
const renderFields = (item: ItemTaskType, permissions: { [x: string]: EntityAttrPermissionValue; }[], itemLoop: any) => {
    return Object.keys(itemLoop).map(key => {
        if (key === '_entityName' || key === '_instanceName' || key === 'version') {
            return null; // Skip these keys if they are not needed to be rendered
        }

        const hasPermission = checkPermission(key, permissions);
        const value = item[key];
        return (
            <HStack key={key}>
                <Text w="$16" >{key}: </Text>
                <Text >{hasPermission
                    ? (value ? value : "Khong co du lieu")
                    : "ban khong co quyen xem"
                }</Text>
            </HStack>
        );
    });
};

export const ItemTask = ({ item, onSelected, permission, itemLoop, navigation }: ItemTaskProps) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('AppNavigator', { screen: "EditTaskScreen", params: { item, permission, itemLoop } })}>
            <Card variant="elevated" mt="$3">
                <HStack style={styles.itemContainer} >
                    <VStack flex={1} >
                        <Heading flex={1} size="md">
                            {item.name}
                        </Heading>
                        <VStack>
                            {renderFields(item, permission, itemLoop)}
                        </VStack>
                        {/* <HStack style={styles.statusContainer}>
                            {renderStatusIcon(item.status)}
                            <Text >{item.status}</Text>
                        </HStack> */}
                    </VStack>
                    {/* <VStack justifyContent="center">
                        <Button variant="link" onPress={() => {
                            onSelected(item, 'update')
                        }}>
                            <ButtonIcon as={EditIcon} />
                        </Button>
                        <Button variant="link" onPress={() => onSelected(item, 'delete')}>
                            <ButtonIcon as={TrashIcon} />
                        </Button>
                    </VStack> */}
                </HStack>
            </Card>
        </TouchableOpacity >
    );
}
const styles = StyleSheet.create({
    statusContainer: {
        alignItems: "center"
    },
    itemContainer: {
        justifyContent: 'space-between'
    }
})