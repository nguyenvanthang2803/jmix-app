import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/ProfileScreen/EditProfile";
import EditTaskScreen from "../screens/TaskScreen/ItemTask/EditTaskScreen";
import { Badge, BadgeText, VStack } from "@gluestack-ui/themed";
import { Bell } from "lucide-react-native";
import { Icon } from "@gluestack-ui/themed";
import { Notifi } from "../screens/NotifcationScreen/Notifi";
import NotificationScreen from "../screens/NotifcationScreen/NotificationScreen";


const AppStack = createNativeStackNavigator();
export default function AppNavigator() {
    return (
        <AppStack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#2b82ea',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => <Notifi navigation={navigation} />
            })}>
            <AppStack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    animation: 'slide_from_bottom',

                }}
            />
            <AppStack.Screen
                name="EditTaskScreen"
                component={EditTaskScreen}
                options={{
                    title: "Edit Task",
                }}
            />
            <AppStack.Screen
                name="NotifiScreen"
                component={NotificationScreen}
                options={{
                    title: "Notifications",
                    headerRight: () => <></>
                }}
            />
        </AppStack.Navigator>
    )
}