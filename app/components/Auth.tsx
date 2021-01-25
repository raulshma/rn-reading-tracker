import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Registration } from '../screens/Auth';

const AuthStack = createStackNavigator();
function authFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signin"
        component={Login}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Registration}
      />
    </AuthStack.Navigator>
  );
}
export { authFlow };
