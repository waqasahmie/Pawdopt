// notifications.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  //console.log("📱 Checking device type...");
  let token;

  if (Device.isDevice) {
    //console.log("✅ Physical device detected");

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //console.log("📋 Existing permission status:", existingStatus);

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      //console.log("🙋‍♂️ Requested permission status:", finalStatus);
    }

    if (finalStatus !== 'granted') {
      alert('❌ Failed to get push token for push notification!');
      return;
    }

    try {
      const tokenData = (await Notifications.getExpoPushTokenAsync());

      token = tokenData.data;
      //console.log("✅ Expo Push Token:", token);
    } catch (error) {
      console.error("❌ Error getting push token:", error);
    }

  } else {
    alert('❌ Must use physical device for Push Notifications');
    //console.log("❌ Not a physical device");
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
    //console.log("📡 Android notification channel set");
  }

  return token;
}
