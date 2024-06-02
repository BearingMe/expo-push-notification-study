import type { PushNotification } from "./push_notification";
import messaging from "@react-native-firebase/messaging";

type MessageCallback = (notification?: PushNotification) => void;

/**
 * Requests permission for push notifications when the app is being bootstrapped.
 * @returns A promise that resolves when the permission is requested.
 */
export async function onMessagingBootstrap() {
  await messaging().requestPermission();
}

/**
 * Retrieves the token for sending push notifications.
 * @returns A promise that resolves to the push notification token.
 */
export async function getToken() {
  return messaging().getToken();
}

/**
 * Registers a callback function to handle foreground messages.
 * This function should be used inside useEffect or componentDidMount.
 * Cleans up the subscription when the component is unmounted.
 *
 * @param cb - The callback function to be executed when a foreground message is received.
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *  const subscription = onForegroundMessage((n) => {
 *   console.log("TRIGGERED: Foreground message ", n)
 * });
 *
 *  return () => subscription;
 * }, []);
 * ```
 *
 * @returns A function that can be used to unsubscribe from the foreground message event.
 */
export function onForegroundMessage(cb: MessageCallback) {
  return messaging().onMessage(async (message) => {
    cb(message.data);
    console.log("TRIGGERED: Foreground message ", message);
  });
}

/**
 * Sets the background message handler for push notifications.
 * Works on a different thread than the main app. Should be used outside components.
 *
 * @param cb - The callback function to handle the background message.
 *
 * @example
 * ```tsx
 * setBackgroundMessageHandler((n) => {
 *  console.log("TRIGGERED: Background message ");
 * });
 *
 * const App = () => { ... }
 * ```
 */
export function setBackgroundMessageHandler(cb: MessageCallback) {
  messaging().setBackgroundMessageHandler(async ({ data }) => cb(data));
}
