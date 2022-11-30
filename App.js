import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login";
import Signup from "./screens/signup";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: () => null }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
