import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthenticatePage from '../pages/AuthenticatePage';
import SignupPage from '../pages/SignupPage';

const Stack = createStackNavigator();

const InitialStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="auth" component={AuthenticatePage} />
      <Stack.Screen name="signup" component={SignupPage} />
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
