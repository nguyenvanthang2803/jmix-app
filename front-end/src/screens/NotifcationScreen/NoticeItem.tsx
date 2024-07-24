import { Heading, Text } from "@gluestack-ui/themed";
import { Card } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

export const NoticeItem = ({ item, navigation }: any) => {
    return (
        <TouchableOpacity>
            <Card variant="elevated" mt="$3">
                <Heading flex={1} size="md">
                    {item.title}
                </Heading>
                <Text>{item.body}</Text>
            </Card>
        </TouchableOpacity >
    );
}