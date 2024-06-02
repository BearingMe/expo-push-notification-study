import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";
import { styles } from "./App.styles";
import { onNotificationsBootstrap, displayNotification } from "./lib/push_notification";
import { onMessagingBootstrap, getToken, setBackgroundMessageHandler, onForegroundMessage } from "./lib/messaging";
import { useState, useEffect } from "react";

onNotificationsBootstrap();
onMessagingBootstrap();

setBackgroundMessageHandler(displayNotification);

export default function App() {
  const [token, setToken] = useState<string | undefined>(undefined);

  getToken().then((currentToken) => {
    setToken(currentToken);
    console.log(currentToken);
  });

  useEffect(() => onForegroundMessage(displayNotification), []);

  return (
    <View style={styles.container}>
      <Text>Olá, mundo!</Text>
      <TextInput value={token} />
      <StatusBar style="light" backgroundColor="#8576FF" />
    </View>
  );
}
