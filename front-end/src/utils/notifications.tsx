import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
import { AlertText, VStack } from '@gluestack-ui/themed';
import { Alert } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { View } from '@gluestack-ui/themed';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    return getFCMToken();
  }
}
async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        AsyncStorage.setItem('fcmtoken', fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.log(error, 'error in fcmToekn');
    }
  }
  return fcmToken;
}
export const NotificationsListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notifcation caused app to open form backgound,',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().setBackgroundMessageHandler(onMessageReceivedBG);
  messaging().onMessage(onMessageReceivedFG);
};

async function onMessageReceivedBG(message: any) {
  const { body, title } = message.notification;
  try {
    notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: 'taskNoti',
      },
    });
  } catch (error) {
    console.log(error)
  }

}

async function onMessageReceivedFG(message: any) {

  console.log(message);
  const notifcation = message.notification;

}






// export const NotificationsListener = () => {
//   useEffect(() => {
//     messaging().setBackgroundMessageHandler(onMessageReceivedBG);
//     messaging().onMessage(onMessageReceivedFG);
//   }, []);

//   const [alertVisible, setAlertVisible] = useState(false);
//   const [notification, setNotification] = useState({ title: '', body: '' });

//   async function onMessageReceivedFG(message) {
//     const { title, body } = message.notification;
//     setNotification({ title, body });
//   }

//   return (

//     <Alert action="success">
//       <VStack space="xs">
//         <AlertText fontWeight="$bold">{notification.title}</AlertText>
//         <AlertText>{notification.body}</AlertText>
//       </VStack>
//     </Alert>

//   );
// };


