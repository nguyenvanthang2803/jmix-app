import { ButtonText } from "@gluestack-ui/themed";
import { Badge } from "@gluestack-ui/themed";
import { BadgeText } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { Bell } from "lucide-react-native";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useGetNumOfNoticeQuery } from "../../services/notifiService";
import { useEffect, useState } from "react";

export function Notifi({ navigation }: any) {
    const { data, isLoading } = useGetNumOfNoticeQuery();
    const [number, setNumber] = useState(data);
    return (
        <TouchableOpacity onPress={() => { navigation.navigate("AppNavigator", { screen: "NotifiScreen" }) }}>
            <Badge
                h={22}
                w={22}
                bg="$red600"
                borderRadius="$full"
                mb={-14}
                mr={-14}
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
            >
                <BadgeText color="$white">{number}</BadgeText>
            </Badge>
            <Icon as={Bell} color="white" size="xl" />
        </TouchableOpacity>
    )
}