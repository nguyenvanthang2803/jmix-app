import { ChevronRightIcon } from "@gluestack-ui/themed"
import { Icon, Text } from "@gluestack-ui/themed"
import { HStack } from "@gluestack-ui/themed"
import { TouchableOpacity } from "react-native"

export const RightIcon = ({ title, text }: any) => {

    function handlePress() {
        switch (title) {
            case 'Currency':
                console.log('Currency');

                break;
            case 'Location':
                console.log('Location');
                break;
            case 'Language':
                console.log('Language');
                break;
            case 'InFormation':
                console.log('InFormation');
                break;
            case 'Policies':
                console.log('Policies');
                break;
            case 'Share':
                console.log('Share');
                break;

        }
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <HStack justifyContent='center' alignItems='center'>
                <Text color='$trueGray400'>{text}</Text>
                <Icon as={ChevronRightIcon} m="$2" w="$4" h="$4" color='$trueGray500' />
            </HStack>
        </TouchableOpacity>
    )
}