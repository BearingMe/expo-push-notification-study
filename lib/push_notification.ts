import notifee, { AndroidImportance } from "@notifee/react-native";

export interface PushNotification {
  title?: string;
  body?: string;
}

const androidChannelId = "default";

/**
 * Initializes the notifications system and sets up the necessary channels and permissions.
 *
 * @returns A promise that resolves when the notifications system is initialized.
 */
async function onNotificationsBootstrap() {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: androidChannelId,
    name: "Notificações",
    importance: AndroidImportance.HIGH,
  });

  notifee.onBackgroundEvent(async () => {});
}

/**
 * Displays a push notification using the provided `PushNotification` object.
 *
 * @param notification - The push notification to display.
 * @returns A promise that resolves when the notification is displayed.
 */
async function displayNotification(notification?: PushNotification) {
  if (!notification) return;

  return await notifee.displayNotification({
    ...notification,
    android: { channelId: androidChannelId },
  });
}

export { onNotificationsBootstrap, displayNotification };
