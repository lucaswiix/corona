import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AuthenticatePage from "../pages/AuthenticatePage";

const Stack = createStackNavigator();

const InitialStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Authenticate" component={AuthenticatePage} />
    </Stack.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <InitialStack />
    </NavigationContainer>
  );
}
