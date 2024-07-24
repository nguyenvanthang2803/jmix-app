import { Icon } from "@gluestack-ui/themed"
import { Text } from "@gluestack-ui/themed"
import { View } from "@gluestack-ui/themed"
import { HStack } from "@gluestack-ui/themed"

export const OptionItem = ({ icon, title, color }: any) => {
    return (
        <HStack alignItems='center'>
            <View backgroundColor={color} justifyContent='center' alignItems='center'
                w={34} h={34}
                rounded={20}
                marginRight={18}
            >
                <Icon as={icon} /></View>

            <Text >{title}</Text>
        </HStack>
    )
}